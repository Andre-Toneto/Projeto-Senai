import { mkdirSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const dataDir = join(process.cwd(), 'data')
    
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true })
    }

    return {
      success: true,
      message: 'Diretório criado com sucesso'
    }

  } catch (error) {
    console.error('Erro ao criar diretório:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao criar diretório'
    })
  }
})
