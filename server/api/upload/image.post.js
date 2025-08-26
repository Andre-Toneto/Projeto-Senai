import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  // Verificar se é método POST
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    const formData = await readMultipartFormData(event)

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nenhum arquivo enviado'
      })
    }

    const file = formData[0]

    if (!file.filename || !file.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Arquivo inválido'
      })
    }

    // Verificar se é uma imagem
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WebP'
      })
    }

    // Verificar tamanho do arquivo (máximo 5MB)
    if (file.data.length > 5 * 1024 * 1024) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Arquivo muito grande. Máximo 5MB permitido'
      })
    }

    // Criar diretório de uploads se não existir
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'fotos')
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true })
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const extension = file.filename.split('.').pop()
    const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`
    const filePath = join(uploadsDir, fileName)

    // Salvar arquivo
    writeFileSync(filePath, file.data)

    // Retornar URL da imagem
    const imageUrl = `/uploads/fotos/${fileName}`

    return {
      success: true,
      message: 'Imagem enviada com sucesso',
      imageUrl
    }

  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Erro ao fazer upload da imagem'
    })
  }
})
