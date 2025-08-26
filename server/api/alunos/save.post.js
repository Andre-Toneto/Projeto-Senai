import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { turma, aluno } = body

    if (!turma || !aluno) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Turma e dados do aluno são obrigatórios'
      })
    }

    // Caminho do arquivo baseado na turma
    const dataDir = join(process.cwd(), 'data')
    const filePath = join(dataDir, `turma-${turma}.txt`)

    // Criar diretório se não existir
    if (!existsSync(dataDir)) {
      await $fetch('/api/alunos/create-dir', { method: 'POST' })
    }

    let alunos = []
    
    // Ler arquivo existente se existir
    if (existsSync(filePath)) {
      try {
        const fileContent = readFileSync(filePath, 'utf-8')
        if (fileContent.trim()) {
          alunos = JSON.parse(fileContent)
        }
      } catch (error) {
        console.error('Erro ao ler arquivo:', error)
        alunos = []
      }
    }

    // Verificar se é edição ou novo aluno
    const alunoIndex = alunos.findIndex(a => a.matricula === aluno.matricula)
    
    if (alunoIndex >= 0) {
      // Atualizar aluno existente
      alunos[alunoIndex] = { ...alunos[alunoIndex], ...aluno }
    } else {
      // Adicionar novo aluno
      alunos.push(aluno)
    }

    // Salvar no arquivo
    writeFileSync(filePath, JSON.stringify(alunos, null, 2), 'utf-8')

    return {
      success: true,
      message: alunoIndex >= 0 ? 'Aluno atualizado com sucesso' : 'Aluno adicionado com sucesso',
      alunos
    }

  } catch (error) {
    console.error('Erro ao salvar aluno:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
