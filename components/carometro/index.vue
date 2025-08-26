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
              <v-icon size="small" class="mr-1">mdi-google-spreadsheet</v-icon>
              Dados sincronizados da planilha
              <ClientOnly>
                <span v-if="cacheInfo">
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
      <v-icon size="80" color="grey-lighten-2" class="mb-4">mdi-google-spreadsheet</v-icon>
      <h3 class="text-h6 text-medium-emphasis mb-2">Nenhuma pessoa encontrada</h3>
      <p class="text-body-2 text-medium-emphasis mb-6">
        Verifique se a turma <strong>{{ turma }}</strong> existe na planilha
      </p>
      <div class="d-flex gap-2 justify-center flex-wrap">
        <v-btn
          color="senai-red"
          prepend-icon="mdi-cog"
          @click="abrirConfigModal"
        >
          Configurar Planilha
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
          <!-- Badge da planilha -->
          <v-chip
            size="x-small"
            color="success"
            variant="flat"
            class="position-absolute"
            style="top: 8px; right: 8px; z-index: 1"
          >
            <v-icon start size="x-small">mdi-google-spreadsheet</v-icon>
            Planilha
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
  turma: String
})

const emit = defineEmits(['selectPessoa', 'updateTotal'])

const pessoas = ref([])
const loading = ref(false)

const { getAlunosByTurma, getCacheInfo, fetchSheetData } = useGoogleSheets()

const cacheInfo = ref(null)
const loadingRefresh = ref(false)
const configModalAberto = ref(false)

const atualizarCacheInfo = () => {
  if (process.client) {
    cacheInfo.value = getCacheInfo()
  }
}

const carregarAlunos = async () => {
  if (!props.turma || !process.client) return

  loading.value = true
  try {
    // Buscar dados da planilha Google Sheets
    pessoas.value = await getAlunosByTurma(props.turma)
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
    await fetchSheetData(true) // Force refresh
    await carregarAlunos()
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
  if (process.client && props.turma) {
    carregarAlunos()
  }
})

// Watch para mudanças na turma, mas apenas no cliente
watch(() => props.turma, (newTurma) => {
  if (process.client && newTurma) {
    carregarAlunos()
  }
})

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
