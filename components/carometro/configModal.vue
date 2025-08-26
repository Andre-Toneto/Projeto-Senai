<template>
  <v-dialog
    v-model="dialogModel"
    max-width="700"
    persistent
    scrollable
  >
    <v-card rounded="lg">
      <v-card-title class="pa-6 pb-0">
        <div class="d-flex justify-space-between align-center">
          <div>
            <h2 class="text-h5 text-senai-red font-weight-medium">
              Configuração da Planilha
            </h2>
            <p class="text-body-2 text-medium-emphasis mb-0">
              Configure o link da planilha do Google Sheets
            </p>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="fecharModal"
          />
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <!-- Alerta sobre URL de exemplo -->
        <v-alert
          v-if="isUsingExample"
          color="warning"
          icon="mdi-alert"
          variant="tonal"
          class="mb-4"
          prominent
        >
          <strong>URL de Exemplo Detectada!</strong><br>
          Você está usando uma URL de exemplo que não contém dados reais.
          Configure sua própria planilha do Google Sheets para ver suas turmas.
        </v-alert>

        <!-- Status da Conexão -->
        <v-alert
          v-else-if="cacheInfo"
          :color="cacheInfo.isStale ? 'warning' : 'success'"
          :icon="cacheInfo.isStale ? 'mdi-clock-alert' : 'mdi-check-circle'"
          variant="tonal"
          class="mb-4"
        >
          <div class="text-body-2">
            <strong>Última atualização:</strong>
            {{ cacheInfo.minutesAgo }} {{ cacheInfo.minutesAgo === 1 ? 'minuto' : 'minutos' }} atrás
            <br>
            <strong>Status:</strong>
            {{ cacheInfo.isStale ? 'Dados podem estar desatualizados' : 'Dados atualizados' }}
          </div>
        </v-alert>

        <v-alert
          v-else-if="!hasCachedData"
          color="info"
          icon="mdi-information"
          variant="tonal"
          class="mb-4"
        >
          Nenhum dado carregado ainda. Configure a URL e atualize os dados.
        </v-alert>

        <!-- Configuração da URL -->
        <v-form ref="form" v-model="valid">
          <!-- Seletor de Aba -->
          <v-card variant="outlined" class="mb-4">
            <v-card-title class="text-h6 pa-4 pb-2">
              <v-icon class="mr-2">mdi-tab</v-icon>
              Selecionar Aba da Planilha
            </v-card-title>
            <v-card-text class="pt-0">
              <v-radio-group
                v-model="selectedSheetGid"
                @update:model-value="onSheetChange"
                class="mt-0"
              >
                <v-radio
                  v-for="sheet in availableSheets"
                  :key="sheet.gid"
                  :label="sheet.name"
                  :value="sheet.gid"
                  color="senai-red"
                >
                  <template v-slot:label>
                    <div>
                      <strong>{{ sheet.name }}</strong>
                      <div class="text-caption text-medium-emphasis">
                        GID: {{ sheet.gid }}
                      </div>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-card-text>
          </v-card>

          <v-text-field
            v-model="sheetUrl"
            label="URL da Planilha (Gerada Automaticamente)"
            variant="outlined"
            density="comfortable"
            :rules="urlRules"
            prepend-inner-icon="mdi-google-spreadsheet"
            hint="URL gerada automaticamente baseada na aba selecionada"
            persistent-hint
            readonly
            class="mb-4"
          />

          <v-expansion-panels variant="accordion" class="mb-4">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon class="mr-2">mdi-help-circle</v-icon>
                Como obter o link da planilha?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="text-body-2">
                  <h4 class="text-senai-red mb-2">📋 Passo a passo para sua planilha:</h4>
                  <ol>
                    <li class="mb-1">Abra sua planilha: <code class="text-caption">1BKSSU6khpPjJ7x8vsbRkwc7TJcAWk3yO</code></li>
                    <li class="mb-1">Vá em <strong>Arquivo → Compartilhar → Publicar na web</strong></li>
                    <li class="mb-1">Em <strong>"Publicar"</strong>, escolha uma das suas abas:
                      <ul class="ml-4 mt-1">
                        <li><strong>CAI</strong> (GID: 274325224)</li>
                        <li><strong>SESI TÉC ADM</strong> (GID: 174349623)</li>
                        <li><strong>SEDUC TÉC ELETROMECÂNICA</strong> (GID: 792022953)</li>
                      </ul>
                    </li>
                    <li class="mb-1">Em <strong>"Formato"</strong>, escolha <strong>CSV (valores separados por vírgula)</strong></li>
                    <li class="mb-1">Clique em <strong>Publicar</strong></li>
                    <li>Confirme clicando <strong>"OK"</strong></li>
                  </ol>
                  <v-alert color="error" variant="tonal" class="mt-3">
                    <strong>⚠️ Problema Atual:</strong> Sua planilha ainda não está publicada.
                    O sistema está recebendo redirecionamento em vez dos dados CSV.
                  </v-alert>
                  <v-alert color="info" variant="tonal" class="mt-2">
                    <strong>💡 Dica:</strong> Apenas "compartilhar com link" não é suficiente.
                    É necessário "publicar na web" especificamente em formato CSV.
                  </v-alert>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon class="mr-2">mdi-table</v-icon>
                Estrutura esperada da planilha
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="text-body-2">
                  <p>A primeira linha deve conter os cabeçalhos. Colunas reconhecidas:</p>
                  <v-chip-group>
                    <v-chip size="small" color="primary" variant="outlined">Turma</v-chip>
                    <v-chip size="small" color="primary" variant="outlined">Nome</v-chip>
                    <v-chip size="small" color="primary" variant="outlined">Matricula</v-chip>
                    <v-chip size="small" color="secondary" variant="outlined">Cargo</v-chip>
                    <v-chip size="small" color="secondary" variant="outlined">Curso</v-chip>
                    <v-chip size="small" color="secondary" variant="outlined">Telefone</v-chip>
                    <v-chip size="small" color="secondary" variant="outlined">Email</v-chip>
                  </v-chip-group>
                  <p class="mt-2">
                    <strong>Obrigatórias:</strong> Turma, Nome<br>
                    <strong>Opcionais:</strong> Todas as outras
                  </p>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Testes das Abas -->
          <v-card variant="outlined" class="mb-4">
            <v-card-title class="text-h6 pa-4 pb-2">
              <v-icon class="mr-2">mdi-test-tube</v-icon>
              Testar Conexão das Abas
            </v-card-title>
            <v-card-text class="pt-0">
              <p class="text-body-2 text-medium-emphasis mb-3">
                Teste cada aba individualmente para verificar se está funcionando:
              </p>
              <div class="d-flex flex-column gap-2">
                <v-btn
                  v-for="sheet in availableSheets"
                  :key="sheet.gid"
                  variant="outlined"
                  :color="testResults[sheet.gid]?.success ? 'success' : testResults[sheet.gid]?.error ? 'error' : 'primary'"
                  :prepend-icon="testResults[sheet.gid]?.success ? 'mdi-check-circle' : testResults[sheet.gid]?.error ? 'mdi-alert-circle' : 'mdi-test-tube'"
                  :loading="testingSheets[sheet.gid]"
                  @click="testarAba(sheet)"
                  block
                  class="text-left justify-start"
                >
                  <div>
                    <div class="font-weight-medium">{{ sheet.name }}</div>
                    <div class="text-caption">
                      {{ testResults[sheet.gid]?.message || `GID: ${sheet.gid}` }}
                    </div>
                  </div>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

          <!-- Botão para dados de exemplo -->
          <div class="text-center mb-4">
            <v-btn
              variant="outlined"
              color="info"
              prepend-icon="mdi-file-document-outline"
              @click="usarDadosExemplo"
              :loading="usandoExemplo"
            >
              Usar Dados de Exemplo para Teste
            </v-btn>
          </div>

          <!-- Ações -->
          <div class="d-flex gap-2 flex-wrap">
            <v-btn
              color="senai-red"
              :disabled="!valid"
              :loading="salvando"
              @click="salvarConfiguracao"
            >
              Salvar URL
            </v-btn>

            <v-btn
              variant="outlined"
              color="senai-red"
              :loading="carregando"
              @click="testarConexao"
            >
              Testar Conexão
            </v-btn>

            <v-btn
              variant="outlined"
              :loading="atualizando"
              @click="atualizarDados"
            >
              Atualizar Dados
            </v-btn>

            <v-btn
              variant="outlined"
              color="warning"
              @click="limparCache"
            >
              Limpar Cache
            </v-btn>
          </div>

          <!-- Resultado do teste -->
          <v-alert
            v-if="testeResultado"
            :color="testeResultado.sucesso ? 'success' : 'error'"
            :icon="testeResultado.sucesso ? 'mdi-check-circle' : 'mdi-alert-circle'"
            variant="tonal"
            class="mt-4"
          >
            <div class="text-body-2">
              <strong>{{ testeResultado.sucesso ? 'Sucesso!' : 'Erro!' }}</strong><br>
              {{ testeResultado.mensagem }}
              <div v-if="testeResultado.detalhes" class="mt-2">
                {{ testeResultado.detalhes }}
              </div>
            </div>
          </v-alert>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn
          variant="outlined"
          @click="fecharModal"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'dadosAtualizados'])

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const {
  getSheetUrl,
  setSheetUrl,
  fetchSheetData,
  hasCachedData,
  clearCache,
  getCacheInfo,
  isUsingExampleUrl,
  loadExampleData,
  getAvailableSheets,
  getSelectedSheet,
  setSelectedSheet
} = useGoogleSheets()

const form = ref(null)
const valid = ref(true) // Sempre válido agora pois a URL é gerada automaticamente
const salvando = ref(false)
const carregando = ref(false)
const atualizando = ref(false)
const usandoExemplo = ref(false)
const sheetUrl = ref('')
const planilhaUrl = ref('')
const testeResultado = ref(null)
const cacheInfo = ref(null)
const isUsingExample = ref(false)
const availableSheets = ref([])
const selectedSheetGid = ref('')
const testResults = ref({})
const testingSheets = ref({})

const urlRules = [
  v => !!v || 'URL é obrigatória',
  v => v.includes('docs.google.com') || 'Deve ser um link do Google Sheets',
  v => v.includes('export?format=csv') || 'Deve ser um link de export CSV'
]

const atualizarCacheInfo = () => {
  cacheInfo.value = getCacheInfo()
}

const onSheetChange = (gid) => {
  if (gid) {
    setSelectedSheet(gid)
    const selectedSheet = availableSheets.value.find(sheet => sheet.gid === gid)
    if (selectedSheet) {
      sheetUrl.value = selectedSheet.url
    }
    // Limpar resultados anteriores
    testeResultado.value = null
  }
}

const testarAba = async (sheet) => {
  testingSheets.value[sheet.gid] = true

  try {
    // Temporariamente definir esta aba para teste
    const originalUrl = getSheetUrl()
    setSheetUrl(sheet.url)

    const dados = await fetchSheetData(true)

    if (dados.error) {
      testResults.value[sheet.gid] = {
        success: false,
        error: true,
        message: `Erro: ${dados.error.substring(0, 50)}...`
      }
    } else if (dados.turmas && dados.turmas.length > 0) {
      testResults.value[sheet.gid] = {
        success: true,
        error: false,
        message: `✅ ${dados.turmas.length} turmas, ${dados.alunos.length} alunos`
      }

      // Se deu certo, usar esta aba
      selectedSheetGid.value = sheet.gid
      sheetUrl.value = sheet.url

      testeResultado.value = {
        sucesso: true,
        mensagem: `Aba "${sheet.name}" funcionando!`,
        detalhes: `Encontradas ${dados.turmas.length} turmas: ${dados.turmas.join(', ')}`
      }

      emit('dadosAtualizados', dados)

    } else {
      testResults.value[sheet.gid] = {
        success: false,
        error: true,
        message: 'Aba vazia ou sem dados válidos'
      }
    }

  } catch (error) {
    testResults.value[sheet.gid] = {
      success: false,
      error: true,
      message: `Erro: ${error.message.substring(0, 30)}...`
    }
  } finally {
    testingSheets.value[sheet.gid] = false
  }
}

const usarDadosExemplo = async () => {
  usandoExemplo.value = true
  testeResultado.value = null

  try {
    const dados = await loadExampleData()

    if (dados.turmas && dados.turmas.length > 0) {
      testeResultado.value = {
        sucesso: true,
        mensagem: 'Dados de exemplo carregados!',
        detalhes: `Encontradas ${dados.turmas.length} turmas: ${dados.turmas.join(', ')}`
      }

      emit('dadosAtualizados', dados)

      setTimeout(() => {
        fecharModal()
      }, 2000)
    } else {
      testeResultado.value = {
        sucesso: false,
        mensagem: 'Erro ao carregar dados de exemplo'
      }
    }
  } catch (error) {
    testeResultado.value = {
      sucesso: false,
      mensagem: 'Erro ao carregar dados de exemplo',
      detalhes: error.message
    }
  } finally {
    usandoExemplo.value = false
  }
}

const salvarConfiguracao = () => {
  if (!valid.value) return

  salvando.value = true
  
  try {
    setSheetUrl(sheetUrl.value)
    testeResultado.value = {
      sucesso: true,
      mensagem: 'URL salva com sucesso!'
    }
  } catch (error) {
    testeResultado.value = {
      sucesso: false,
      mensagem: 'Erro ao salvar URL',
      detalhes: error.message
    }
  } finally {
    salvando.value = false
  }
}

const testarConexao = async () => {
  if (!valid.value) return

  carregando.value = true
  testeResultado.value = null

  try {
    // Salvar URL temporariamente para teste
    const urlOriginal = getSheetUrl()
    setSheetUrl(sheetUrl.value)
    
    const dados = await fetchSheetData(true)
    
    testeResultado.value = {
      sucesso: true,
      mensagem: `Conexão bem-sucedida!`,
      detalhes: `Encontradas ${dados.turmas.length} turmas e ${dados.alunos.length} alunos`
    }
    
    atualizarCacheInfo()
    
  } catch (error) {
    testeResultado.value = {
      sucesso: false,
      mensagem: 'Erro ao conectar com a planilha',
      detalhes: error.message
    }
  } finally {
    carregando.value = false
  }
}

const atualizarDados = async () => {
  atualizando.value = true
  testeResultado.value = null

  try {
    const dados = await fetchSheetData(true)
    
    testeResultado.value = {
      sucesso: true,
      mensagem: 'Dados atualizados com sucesso!',
      detalhes: `${dados.turmas.length} turmas e ${dados.alunos.length} alunos carregados`
    }
    
    atualizarCacheInfo()
    emit('dadosAtualizados', dados)
    
  } catch (error) {
    testeResultado.value = {
      sucesso: false,
      mensagem: 'Erro ao atualizar dados',
      detalhes: error.message
    }
  } finally {
    atualizando.value = false
  }
}

const limparCache = () => {
  clearCache()
  cacheInfo.value = null
  testeResultado.value = {
    sucesso: true,
    mensagem: 'Cache limpo com sucesso!'
  }
}

const fecharModal = () => {
  emit('update:modelValue', false)
  testeResultado.value = null
}

// Carregar dados quando modal abrir
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    availableSheets.value = getAvailableSheets()
    const selectedSheet = getSelectedSheet()
    selectedSheetGid.value = selectedSheet.gid
    planilhaUrl.value = selectedSheet.url
    sheetUrl.value = selectedSheet.url
    isUsingExample.value = isUsingExampleUrl()
    atualizarCacheInfo()
  }
})

onMounted(() => {
  if (props.modelValue) {
    availableSheets.value = getAvailableSheets()
    const selectedSheet = getSelectedSheet()
    selectedSheetGid.value = selectedSheet.gid
    planilhaUrl.value = selectedSheet.url
    sheetUrl.value = selectedSheet.url
    isUsingExample.value = isUsingExampleUrl()
    atualizarCacheInfo()
  }
})
</script>
