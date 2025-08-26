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
        <!-- Status da Conexão -->
        <v-alert
          v-if="cacheInfo"
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
          <v-text-field
            v-model="sheetUrl"
            label="URL da Planilha (formato CSV)"
            variant="outlined"
            density="comfortable"
            :rules="urlRules"
            prepend-inner-icon="mdi-google-spreadsheet"
            hint="Use o link de export CSV do Google Sheets"
            persistent-hint
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
                  <ol>
                    <li>Abra sua planilha no Google Sheets</li>
                    <li>Vá em <strong>Arquivo → Compartilhar → Publicar na web</strong></li>
                    <li>Selecione a aba que contém os dados dos alunos</li>
                    <li>Escolha <strong>CSV (valores separados por vírgula)</strong></li>
                    <li>Clique em <strong>Publicar</strong></li>
                    <li>Copie o link gerado e cole acima</li>
                  </ol>
                  <v-alert color="warning" variant="tonal" class="mt-3">
                    <strong>Importante:</strong> A planilha precisa estar publicada publicamente
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
  getCacheInfo 
} = useGoogleSheets()

const form = ref(null)
const valid = ref(false)
const salvando = ref(false)
const carregando = ref(false)
const atualizando = ref(false)
const sheetUrl = ref('')
const testeResultado = ref(null)
const cacheInfo = ref(null)

const urlRules = [
  v => !!v || 'URL é obrigatória',
  v => v.includes('docs.google.com') || 'Deve ser um link do Google Sheets',
  v => v.includes('export?format=csv') || 'Deve ser um link de export CSV'
]

const atualizarCacheInfo = () => {
  cacheInfo.value = getCacheInfo()
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

// Carregar URL atual quando modal abrir
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    sheetUrl.value = getSheetUrl()
    atualizarCacheInfo()
  }
})

onMounted(() => {
  if (props.modelValue) {
    sheetUrl.value = getSheetUrl()
    atualizarCacheInfo()
  }
})
</script>
