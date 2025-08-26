import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { turma, matricula } = body

    if (!turma || !matricula) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Turma e matrícula são obrigatórias'
      })
    }

    const dataDir = join(process.cwd(), 'data')
    const filePath = join(dataDir, `turma-${turma}.txt`)

    if (!existsSync(filePath)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Arquivo da turma não encontrado'
      })
    }

    let alunos = []
    
    try {
      const fileContent = readFileSync(filePath, 'utf-8')
      if (fileContent.trim()) {
        alunos = JSON.parse(fileContent)
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Erro ao ler arquivo'
      })
    }

    // Remover aluno
    const alunoIndex = alunos.findIndex(a => a.matricula === matricula)
    
    if (alunoIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Aluno não encontrado'
      })
    }

    alunos.splice(alunoIndex, 1)

    // Salvar arquivo atualizado
    writeFileSync(filePath, JSON.stringify(alunos, null, 2), 'utf-8')

    return {
      success: true,
      message: 'Aluno removido com sucesso',
      alunos
    }

  } catch (error) {
    console.error('Erro ao deletar aluno:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
