export const useGoogleSheets = () => {
  // URL padrão da planilha (pode ser alterada)
  const getSheetUrl = () => {
    if (process.client) {
      return localStorage.getItem('googleSheets_url') || 'https://docs.google.com/spreadsheets/d/1BKSSU6khpPjJ7x8vsbRkwc7TJcAWk3yO/export?format=csv&gid=0'
    }
    return 'https://docs.google.com/spreadsheets/d/1BKSSU6khpPjJ7x8vsbRkwc7TJcAWk3yO/export?format=csv&gid=0'
  }

  // Salvar nova URL da planilha
  const setSheetUrl = (url) => {
    if (process.client) {
      localStorage.setItem('googleSheets_url', url)
      // Limpar cache ao mudar URL
      localStorage.removeItem('googleSheets_cache')
      localStorage.removeItem('googleSheets_lastUpdate')
    }
  }

  // Parser CSV básico
  const parseCSV = (csvText) => {
    const lines = csvText.split('\n')
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const data = []

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
        const row = {}
        
        headers.forEach((header, index) => {
          row[header] = values[index] || ''
        })
        
        data.push(row)
      }
    }

    return { headers, data }
  }

  // Buscar dados da planilha
  const fetchSheetData = async (forceRefresh = false) => {
    if (!process.client) return { turmas: [], alunos: [] }

    const cacheKey = 'googleSheets_cache'
    const lastUpdateKey = 'googleSheets_lastUpdate'
    const cacheTimeout = 5 * 60 * 1000 // 5 minutos

    // Verificar cache se não for refresh forçado
    if (!forceRefresh) {
      const cached = localStorage.getItem(cacheKey)
      const lastUpdate = localStorage.getItem(lastUpdateKey)
      
      if (cached && lastUpdate) {
        const timeSinceUpdate = Date.now() - parseInt(lastUpdate)
        if (timeSinceUpdate < cacheTimeout) {
          return JSON.parse(cached)
        }
      }
    }

    try {
      const url = getSheetUrl()
      
      // Buscar dados da planilha
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Accept': 'text/csv'
        }
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const csvText = await response.text()
      const { headers, data } = parseCSV(csvText)

      // Processar dados para extrair turmas e alunos
      const result = processSheetData(data, headers)

      // Salvar no cache
      localStorage.setItem(cacheKey, JSON.stringify(result))
      localStorage.setItem(lastUpdateKey, Date.now().toString())

      return result

    } catch (error) {
      console.error('Erro ao buscar dados da planilha:', error)
      
      // Tentar retornar dados do cache em caso de erro
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        return JSON.parse(cached)
      }
      
      throw error
    }
  }

  // Processar dados da planilha para extrair turmas e alunos
  const processSheetData = (data, headers) => {
    const turmas = new Set()
    const alunos = []

    data.forEach((row, index) => {
      // Identificar campos comuns (adaptar conforme estrutura da planilha)
      const turma = row['Turma'] || row['turma'] || row['TURMA'] || row['Codigo'] || row['codigo'] || ''
      const nome = row['Nome'] || row['nome'] || row['NOME'] || row['Aluno'] || row['aluno'] || ''
      const matricula = row['Matricula'] || row['matricula'] || row['MATRICULA'] || row['RA'] || row['ra'] || (index + 1).toString()

      if (turma && nome) {
        turmas.add(turma)
        
        const aluno = {
          id: `${turma}_${matricula}`,
          nome: nome,
          matricula: matricula,
          turma: turma,
          cargo: row['Cargo'] || row['cargo'] || 'Aluno',
          curso: row['Curso'] || row['curso'] || turma,
          telefone: row['Telefone'] || row['telefone'] || '',
          celular: row['Celular'] || row['celular'] || '',
          email: row['Email'] || row['email'] || '',
          rg: row['RG'] || row['rg'] || '',
          cpf: row['CPF'] || row['cpf'] || '',
          endereco: row['Endereco'] || row['endereco'] || '',
          bairro: row['Bairro'] || row['bairro'] || '',
          cidade: row['Cidade'] || row['cidade'] || '',
          estado: row['Estado'] || row['estado'] || '',
          cep: row['CEP'] || row['cep'] || '',
          mae: row['Mae'] || row['mae'] || row['Mãe'] || '',
          pai: row['Pai'] || row['pai'] || '',
          empresa: 'SENAI',
          foto: '', // Fotos virão de upload manual se necessário
          ocorrencias: [],
          fromSheet: true, // Marcar como vindo da planilha
          lastSync: new Date().toISOString()
        }

        alunos.push(aluno)
      }
    })

    return {
      turmas: Array.from(turmas).sort(),
      alunos: alunos,
      lastUpdate: new Date().toISOString(),
      totalRecords: data.length
    }
  }

  // Buscar alunos de uma turma específica
  const getAlunosByTurma = async (turma, forceRefresh = false) => {
    if (!turma) return []

    try {
      const data = await fetchSheetData(forceRefresh)
      return data.alunos.filter(aluno => aluno.turma === turma)
    } catch (error) {
      console.error('Erro ao buscar alunos da turma:', error)
      return []
    }
  }

  // Buscar lista de turmas
  const getTurmas = async (forceRefresh = false) => {
    try {
      const data = await fetchSheetData(forceRefresh)
      return data.turmas
    } catch (error) {
      console.error('Erro ao buscar turmas:', error)
      return []
    }
  }

  // Verificar se dados estão em cache
  const hasCachedData = () => {
    if (!process.client) return false
    return !!localStorage.getItem('googleSheets_cache')
  }

  // Limpar cache
  const clearCache = () => {
    if (process.client) {
      localStorage.removeItem('googleSheets_cache')
      localStorage.removeItem('googleSheets_lastUpdate')
    }
  }

  // Obter informações do cache
  const getCacheInfo = () => {
    if (!process.client) return null

    const lastUpdate = localStorage.getItem('googleSheets_lastUpdate')
    if (!lastUpdate) return null

    const lastUpdateDate = new Date(parseInt(lastUpdate))
    const now = new Date()
    const minutesAgo = Math.floor((now - lastUpdateDate) / (1000 * 60))

    return {
      lastUpdate: lastUpdateDate,
      minutesAgo,
      isStale: minutesAgo > 5
    }
  }

  return {
    getSheetUrl,
    setSheetUrl,
    fetchSheetData,
    getAlunosByTurma,
    getTurmas,
    hasCachedData,
    clearCache,
    getCacheInfo
  }
}
