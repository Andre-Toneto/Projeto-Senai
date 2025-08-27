<template>
  <v-container fluid>
    <!-- Cabeçalho com botões de ação -->
    <v-row class="mb-4">
      <v-col>
        <div class="d-flex justify-space-between align-center flex-wrap ga-2">
          <div>
            <h3 class="text-h6 text-senai-red font-weight-medium">
              {{ pessoas.length }} {{ pessoas.length === 1 ? 'pessoa cadastrada' : 'pessoas cadastradas' }}
            </h3>
            <p class="text-caption text-medium-emphasis mb-0">
              <v-icon size="small" class="mr-1">
                {{ temDadosPlanilha() && props.curso ? 'mdi-file-excel' : 'mdi-google-spreadsheet' }}
              </v-icon>
              <ClientOnly fallback="<span>Carregando...</span>">
                <span v-if="dadosExemplo">Dados de exemplo para teste</span>
                <span v-else-if="temDadosExcel && props.curso">Dados da planilha Excel</span>
                <span v-else>Dados locais ou sincronizados</span>
              </ClientOnly>
              <ClientOnly>
                <span v-if="cacheInfo && !dadosExemplo && !temDadosExcel && props.curso">
                • Última atualização: {{ cacheInfo.minutesAgo }}min atrás
              </span>
              </ClientOnly>
            </p>
          </div>
          <div class="d-flex ga-2 flex-wrap">
            <!-- Status de sincronização -->
            <ClientOnly>
              <v-chip
                v-if="cacheInfo"
                :color="cacheInfo.isStale ? 'warning' : 'success'"
                :prepend-icon="cacheInfo.isStale ? 'mdi-clock-alert' : 'mdi-check-circle'"
                size="small"
                variant="outlined"
              >
                {{ cacheInfo.isStale ? 'Desatualizado' : 'Atualizado' }}
              </v-chip>
            </ClientOnly>

            <!-- Botões de ação -->
            <v-btn
              variant="outlined"
              color="senai-red"
              prepend-icon="mdi-cog"
              size="small"
              @click="abrirConfigModal"
            >
              Config
            </v-btn>

            <v-btn
              variant="outlined"
              color="primary"
              prepend-icon="mdi-refresh"
              size="small"
              :loading="loadingRefresh"
              @click="atualizarDados"
            >
              Atualizar
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <v-progress-circular indeterminate color="senai-red" size="64" />
      <p class="text-body-1 text-medium-emphasis mt-4">Carregando dados...</p>
    </div>

    <!-- Lista vazia -->
    <div v-else-if="pessoas.length === 0" class="text-center py-12">
      <v-icon
        size="80"
        color="grey-lighten-2"
        class="mb-4"
      >
        {{ dadosExemplo ? 'mdi-file-document-outline' : 'mdi-google-spreadsheet' }}
      </v-icon>

      <h3 class="text-h6 text-medium-emphasis mb-2">Nenhuma pessoa encontrada</h3>

      <p v-if="dadosExemplo" class="text-body-2 text-medium-emphasis mb-6">
        Você está usando dados de exemplo. A turma <strong>{{ turma }}</strong> não existe nos dados de exemplo.
        <br>
        <strong>Turmas disponíveis nos dados de exemplo:</strong> M2A, M2B, T2024-001, ADM-2025, TEC-INFO-01
      </p>

      <p v-else class="text-body-2 text-medium-emphasis mb-6">
        Verifique se a turma <strong>{{ turma }}</strong> existe na sua planilha do Google Sheets
      </p>

      <div class="d-flex gap-2 justify-center flex-wrap">
        <v-btn
          color="senai-red"
          prepend-icon="mdi-cog"
          @click="abrirConfigModal"
        >
          {{ dadosExemplo ? 'Configurar Planilha Real' : 'Configurar Planilha' }}
        </v-btn>
        <v-btn
          variant="outlined"
          color="primary"
          prepend-icon="mdi-refresh"
          @click="atualizarDados"
        >
          Atualizar Dados
        </v-btn>
      </div>
    </div>

    <!-- Grid Responsivo Moderno -->
    <v-row v-else class="d-flex">
      <v-col
        v-for="pessoa in pessoas"
        :key="pessoa.matricula"
        cols="12"
        sm="6"
        md="4"
        lg="2"
        xl="2"
        class="d-flex pa-1"
      >
        <v-card
          hover
          rounded="xl"
          elevation="4"
          class="person-card flex-grow-1"
          @click="abrirModal(pessoa)"
          style="cursor: pointer"
        >
          <!-- Badge da fonte dos dados -->
          <v-chip
            size="x-small"
            :color="getCorBadge()"
            variant="flat"
            class="position-absolute"
            style="top: 8px; right: 8px; z-index: 1"
          >
            <v-icon start size="x-small">
              {{ getIconeBadge() }}
            </v-icon>
            {{ getTextoBadge() }}
          </v-chip>

          <!-- Avatar/Foto -->
          <div class="text-center pt-6 pb-2">
            <v-avatar size="80" class="elevation-4">
              <v-img
                v-if="pessoa.foto"
                :src="pessoa.foto"
                cover
              />
              <v-icon
                v-else
                size="40"
                color="grey-lighten-1"
              >
                mdi-account
              </v-icon>
            </v-avatar>
          </div>

          <!-- Informações -->
          <v-card-title class="text-center text-h6 font-weight-bold text-senai-red px-4 pb-1">
            {{ pessoa.nome }}
          </v-card-title>

          <v-card-subtitle class="text-center text-body-2 text-medium-emphasis px-4 pb-2">
            {{ pessoa.cargo }}
          </v-card-subtitle>

          <!-- Badge de Status e Matrícula -->
          <div class="d-flex justify-center align-center text-center pb-4 gap-2">
            <v-chip
              size="small"
              color="success"
              variant="outlined"
            >
              <v-icon start size="small">mdi-check-circle</v-icon>
              Ativo
            </v-chip>
            <div class="text-center">
              <div class="text-caption text-medium-emphasis">Matrícula</div>
              <div class="text-body-2 font-weight-medium">{{ pessoa.matricula }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal de configuração da planilha -->
    <CarometroConfigModal
      v-model="configModalAberto"
      @dados-atualizados="onDadosAtualizados"
    />
  </v-container>
</template>

<script setup>
const props = defineProps({
  turma: String,
  curso: String
})

const emit = defineEmits(['selectPessoa', 'updateTotal'])

const pessoas = ref([])
const loading = ref(false)
const dadosExemplo = ref(false)
const temDadosExcel = ref(false)

const { getAlunosTurma } = useCarometro()
const { getAlunosPorCursoTurma, temDadosPlanilha } = useExcelData()

// Google Sheets apenas quando necessário
let googleSheetsComposable = null
const getGoogleSheetsComposable = () => {
  if (!googleSheetsComposable) {
    try {
      googleSheetsComposable = useGoogleSheets()
    } catch (error) {
      console.warn('Google Sheets não disponível:', error)
      googleSheetsComposable = {
        getAlunosByTurma: () => [],
        getCacheInfo: () => null,
        isUsingExampleUrl: () => false,
        fetchSheetData: () => Promise.resolve()
      }
    }
  }
  return googleSheetsComposable
}

const cacheInfo = ref(null)
const loadingRefresh = ref(false)
const configModalAberto = ref(false)

const atualizarCacheInfo = () => {
  if (process.client) {
    try {
      const googleSheets = getGoogleSheetsComposable()
      cacheInfo.value = googleSheets.getCacheInfo()
    } catch (error) {
      cacheInfo.value = null
    }
  }
}

const carregarAlunos = async () => {
  if (!props.turma || !process.client) return

  loading.value = true
  try {
    let alunosCarregados = []

    // Atualizar estado do Excel
    atualizarEstadoExcel()

    // Primeiro tentar carregar da planilha Excel se curso for especificado
    if (props.curso && temDadosExcel.value) {
      alunosCarregados = getAlunosPorCursoTurma(props.curso, props.turma)
      dadosExemplo.value = false

      if (alunosCarregados.length > 0) {
        pessoas.value = alunosCarregados
        console.log("o que vem em pessoas", pessoas.value)
        emit('updateTotal', pessoas.value)
        atualizarCacheInfo()
        return
      }
    }

    // Fallback para dados locais (localStorage) ou Google Sheets
    alunosCarregados = getAlunosTurma(props.turma, props.curso)

    if (alunosCarregados.length === 0) {
      // Tentar dados de exemplo se não encontrar nada
      try {
        const googleSheets = getGoogleSheetsComposable()
        dadosExemplo.value = googleSheets.isUsingExampleUrl()
        alunosCarregados = await googleSheets.getAlunosByTurma(props.turma)
      } catch (error) {
        console.warn('Erro ao carregar dados de exemplo:', error)
      }
    }

    pessoas.value = alunosCarregados
    emit('updateTotal', pessoas.value)
    atualizarCacheInfo()
  } catch (error) {
    console.error('Erro ao carregar alunos:', error)
    pessoas.value = []
    emit('updateTotal', [])
  } finally {
    loading.value = false
  }
}

const abrirModal = (pessoa) => {
  emit('selectPessoa', pessoa)
}

const abrirConfigModal = () => {
  configModalAberto.value = true
}

const atualizarDados = async () => {
  if (!process.client) return

  loadingRefresh.value = true
  try {
    // Se tiver dados Excel, apenas recarregar
    if (props.curso && temDadosPlanilha()) {
      await carregarAlunos()
    } else {
      // Tentar atualizar Google Sheets se disponível
      try {
        const googleSheets = getGoogleSheetsComposable()
        await googleSheets.fetchSheetData(true) // Force refresh
        await carregarAlunos()
      } catch (error) {
        console.warn('Erro ao atualizar Google Sheets:', error)
        await carregarAlunos()
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar dados:', error)
    if (process.client) {
      alert('Erro ao atualizar dados: ' + (error.message || 'Erro desconhecido'))
    }
  } finally {
    loadingRefresh.value = false
  }
}

const onDadosAtualizados = () => {
  carregarAlunos()
}

// Carregar alunos apenas no cliente
onMounted(() => {
  if (process.client) {
    atualizarEstadoExcel()
    if (props.turma) {
      carregarAlunos()
    }
  }
})

// Watch para mudanças na turma ou curso, mas apenas no cliente
watch(() => [props.turma, props.curso], ([newTurma, newCurso]) => {
  if (process.client && newTurma) {
    carregarAlunos()
  }
})

// Funções auxiliares para badge
const getCorBadge = () => {
  if (dadosExemplo.value) return 'info'
  if (temDadosExcel.value && props.curso) return 'success'
  return 'warning'
}

const getIconeBadge = () => {
  if (dadosExemplo.value) return 'mdi-file-document-outline'
  if (temDadosExcel.value && props.curso) return 'mdi-file-excel'
  return 'mdi-database'
}

const getTextoBadge = () => {
  if (dadosExemplo.value) return 'Exemplo'
  if (temDadosExcel.value && props.curso) return 'Excel'
  return 'Local'
}

// Atualizar estado do Excel apenas no cliente
const atualizarEstadoExcel = () => {
  if (process.client) {
    temDadosExcel.value = temDadosPlanilha()
  }
}

</script>

<style scoped>
.person-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.person-card:hover {
  transform: translateY(-8px);
  border-color: rgb(var(--v-theme-senai-red));
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}
</style>
