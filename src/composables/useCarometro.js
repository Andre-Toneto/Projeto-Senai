import { useExcelData } from './useExcelData.js'

export const useCarometro = () => {
  const { getAlunosPorCursoTurma, getCursosDisponiveis, getTurmasPorCurso, temDadosPlanilha } = useExcelData()
  
  // Função para obter dados de uma turma (integrada com Excel)
  const getAlunosTurma = (turma, curso = null) => {
    if (!turma) return []

    // Primeiro tentar buscar da planilha Excel se curso for especificado
    if (curso && temDadosPlanilha()) {
      const alunosExcel = getAlunosPorCursoTurma(curso, turma)
      if (alunosExcel.length > 0) {
        return alunosExcel
      }
    }

    // Fallback para dados locais (localStorage)
    try {
      const key = `carometro_turma_${turma}`
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Erro ao carregar alunos do localStorage:', error)
      return []
    }
  }

  // Função para salvar dados de uma turma
  const saveAlunosTurma = (turma, alunos) => {
    if (!turma) return false
    
    try {
      const key = `carometro_turma_${turma}`
      localStorage.setItem(key, JSON.stringify(alunos))
      return true
    } catch (error) {
      console.error('Erro ao salvar alunos no localStorage:', error)
      return false
    }
  }

  // Função para adicionar ou atualizar um aluno
  const saveAluno = (turma, aluno) => {
    if (!turma || !aluno || !aluno.matricula) {
      throw new Error('Turma, aluno e matrícula são obrigatórios')
    }

    const alunos = getAlunosTurma(turma)
    const alunoIndex = alunos.findIndex(a => a.matricula === aluno.matricula)
    
    if (alunoIndex >= 0) {
      // Atualizar aluno existente
      alunos[alunoIndex] = { ...alunos[alunoIndex], ...aluno }
    } else {
      // Adicionar novo aluno
      alunos.push({
        ...aluno,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      })
    }

    const success = saveAlunosTurma(turma, alunos)
    if (!success) {
      throw new Error('Erro ao salvar dados no localStorage')
    }

    return {
      success: true,
      message: alunoIndex >= 0 ? 'Aluno atualizado com sucesso' : 'Aluno adicionado com sucesso',
      alunos
    }
  }

  // Função para remover um aluno
  const deleteAluno = (turma, matricula) => {
    if (!turma || !matricula) {
      throw new Error('Turma e matrícula são obrigatórias')
    }

    const alunos = getAlunosTurma(turma)
    const alunoIndex = alunos.findIndex(a => a.matricula === matricula)
    
    if (alunoIndex === -1) {
      return {
        success: true,
        message: 'Aluno não encontrado',
        alunos
      }
    }

    alunos.splice(alunoIndex, 1)
    
    const success = saveAlunosTurma(turma, alunos)
    if (!success) {
      throw new Error('Erro ao salvar dados no localStorage')
    }

    return {
      success: true,
      message: 'Aluno removido com sucesso',
      alunos
    }
  }

  // Função para upload de imagem como base64
  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Nenhum arquivo fornecido'))
        return
      }

      // Verificar tipo de arquivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        reject(new Error('Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WebP'))
        return
      }

      // Verificar tamanho (máximo 2MB para localStorage)
      if (file.size > 2 * 1024 * 1024) {
        reject(new Error('Arquivo muito grande. Máximo 2MB permitido'))
        return
      }

      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const base64 = e.target.result
          resolve({
            success: true,
            message: 'Imagem processada com sucesso',
            imageUrl: base64
          })
        } catch (error) {
          reject(new Error('Erro ao processar imagem'))
        }
      }

      reader.onerror = () => {
        reject(new Error('Erro ao ler arquivo'))
      }

      reader.readAsDataURL(file)
    })
  }

  // Função para listar todas as turmas existentes
  const getTurmasExistentes = () => {
    try {
      const keys = Object.keys(localStorage)
      const turmas = keys
        .filter(key => key.startsWith('carometro_turma_'))
        .map(key => key.replace('carometro_turma_', ''))
        .sort()
      
      return turmas
    } catch (error) {
      console.error('Erro ao listar turmas:', error)
      return []
    }
  }

  // Função para exportar dados de uma turma
  const exportarTurma = (turma) => {
    if (!turma) return null
    
    try {
      const alunos = getAlunosTurma(turma)
      const dataStr = JSON.stringify(alunos, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `turma-${turma}-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      return true
    } catch (error) {
      console.error('Erro ao exportar turma:', error)
      return false
    }
  }

  // Função para importar dados de uma turma
  const importarTurma = (turma, file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Nenhum arquivo fornecido'))
        return
      }

      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          if (!Array.isArray(data)) {
            throw new Error('Formato de arquivo inválido')
          }
          
          const success = saveAlunosTurma(turma, data)
          if (success) {
            resolve({
              success: true,
              message: `${data.length} alunos importados com sucesso`,
              alunos: data
            })
          } else {
            throw new Error('Erro ao salvar dados importados')
          }
        } catch (error) {
          reject(new Error('Erro ao processar arquivo: ' + error.message))
        }
      }

      reader.onerror = () => {
        reject(new Error('Erro ao ler arquivo'))
      }

      reader.readAsText(file)
    })
  }

  return {
    getAlunosTurma,
    saveAluno,
    deleteAluno,
    uploadImage,
    getTurmasExistentes,
    exportarTurma,
    importarTurma,
    // Novos métodos para Excel
    getCursosDisponiveis,
    getTurmasPorCurso,
    temDadosPlanilha
  }
}
