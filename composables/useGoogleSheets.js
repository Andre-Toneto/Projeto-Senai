export const useGoogleSheets = () => {
  // URL padrão da planilha (pode ser alterada)
  const getSheetUrl = () => {
    if (process.client) {
      return localStorage.getItem('googleSheets_url') || 'https://docs.google.com/spreadsheets/d/1BKSSU6khpPjJ7x8vsbRkwc7TJcAWk3yO/export?format=csv&gid=0'
    }
    return 'https://docs.google.com/spreadsheets/d/1BKSSU6khpPjJ7x8vsbRkwc7TJcAWk3yO/export?format=csv&gid=0'
  }

  // Carregar dados de exemplo para desenvolvimento
  const loadExampleData = async () => {
    if (!process.client) return { turmas: [], alunos: [], error: null }

    try {
      const response = await fetch('/data/dados-exemplo.json')
      if (!response.ok) {
        throw new Error('Dados de exemplo não encontrados')
      }
      return await response.json()
    } catch (error) {
      console.warn('Erro ao carregar dados de exemplo:', error.message)
      return {
        turmas: [],
        alunos: [],
        error: error.message,
        isExample: true,
        message: 'Erro ao carregar dados de exemplo'
      }
    }
  }

  // Verificar se está usando URL de exemplo
  const isUsingExampleUrl = () => {
    const url = getSheetUrl()
    // A planilha 1BKSSU6khpPjJ7x8vsbRkwc7TJcAWk3yO agora é real, não mais exemplo
    return url.includes('example') ||
           !url ||
           url === '' ||
           url.includes('EXEMPLO')
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
    // Não executar durante SSR
    if (!process.client) return { turmas: [], alunos: [], error: null }

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

      // Verificar se está usando URL de exemplo
      if (isUsingExampleUrl()) {
        console.info('Usando dados de exemplo - Configure sua planilha do Google Sheets')
        return await loadExampleData()
      }

      // Buscar dados da planilha com timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos timeout

      const response = await fetch(url, {
        signal: controller.signal,
        mode: 'cors',
        headers: {
          'Accept': 'text/csv',
          'Cache-Control': 'no-cache'
        }
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`)
      }

      const csvText = await response.text()

      if (!csvText || csvText.trim().length === 0) {
        throw new Error('Planilha vazia ou inacessível')
      }

      const { headers, data } = parseCSV(csvText)

      // Processar dados para extrair turmas e alunos
      const result = processSheetData(data, headers)

      // Salvar no cache apenas se tiver dados válidos
      if (result.turmas.length > 0 || result.alunos.length > 0) {
        localStorage.setItem(cacheKey, JSON.stringify(result))
        localStorage.setItem(lastUpdateKey, Date.now().toString())
      }

      return result

    } catch (error) {
      console.warn('Erro ao buscar dados da planilha:', error.message)

      // Tentar retornar dados do cache em caso de erro
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        try {
          const cachedData = JSON.parse(cached)
          return { ...cachedData, error: error.message }
        } catch {
          // Cache corrompido, limpar
          localStorage.removeItem(cacheKey)
          localStorage.removeItem(lastUpdateKey)
        }
      }

      // Retornar estrutura vazia com erro em vez de lançar exceção
      return {
        turmas: [],
        alunos: [],
        error: error.message,
        lastUpdate: null,
        totalRecords: 0
      }
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
    if (!process.client || !turma) return []

    try {
      const data = await fetchSheetData(forceRefresh)
      return (data.alunos || []).filter(aluno => aluno.turma === turma)
    } catch (error) {
      console.warn('Erro ao buscar alunos da turma:', error.message)
      return []
    }
  }

  // Buscar lista de turmas
  const getTurmas = async (forceRefresh = false) => {
    if (!process.client) return []

    try {
      const data = await fetchSheetData(forceRefresh)
      return data.turmas || []
    } catch (error) {
      console.warn('Erro ao buscar turmas:', error.message)
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
    getCacheInfo,
    isUsingExampleUrl,
    loadExampleData
  }
}
