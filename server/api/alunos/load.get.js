import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { turma } = query

    if (!turma) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Turma é obrigatória'
      })
    }

    const dataDir = join(process.cwd(), 'data')
    const filePath = join(dataDir, `turma-${turma}.txt`)

    let alunos = []

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

    return {
      success: true,
      alunos
    }

  } catch (error) {
    console.error('Erro ao carregar alunos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
