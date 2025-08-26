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
              <span v-if="cacheInfo">
                • Última atualização: {{ cacheInfo.minutesAgo }}min atrás
              </span>
            </p>
          </div>
          <div class="d-flex ga-2 flex-wrap">
            <!-- Status de sincronização -->
            <v-chip
              v-if="cacheInfo"
              :color="cacheInfo.isStale ? 'warning' : 'success'"
              :prepend-icon="cacheInfo.isStale ? 'mdi-clock-alert' : 'mdi-check-circle'"
              size="small"
              variant="outlined"
            >
              {{ cacheInfo.isStale ? 'Desatualizado' : 'Atualizado' }}
            </v-chip>

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
      <v-icon size="80" color="grey-lighten-2" class="mb-4">mdi-account-plus</v-icon>
      <h3 class="text-h6 text-medium-emphasis mb-2">Nenhuma pessoa cadastrada</h3>
      <p class="text-body-2 text-medium-emphasis mb-6">
        Adicione a primeira pessoa da turma {{ turma }}
      </p>
      <v-btn
        color="senai-red"
        size="large"
        prepend-icon="mdi-plus"
        @click="abrirModalAdicionar"
      >
        Adicionar Primeira Pessoa
      </v-btn>
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
          class="person-card flex-grow-1 position-relative"
        >
          <!-- Menu de ações -->
          <v-menu location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                variant="text"
                size="small"
                class="position-absolute"
                style="top: 8px; right: 8px; z-index: 1"
              />
            </template>
            <v-list density="compact">
              <v-list-item @click="editarPessoa(pessoa)">
                <template v-slot:prepend>
                  <v-icon color="senai-red">mdi-pencil</v-icon>
                </template>
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="confirmarExclusao(pessoa)">
                <template v-slot:prepend>
                  <v-icon color="error">mdi-delete</v-icon>
                </template>
                <v-list-item-title>Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- Avatar/Foto -->
          <div class="text-center pt-6 pb-2" @click="abrirModal(pessoa)">
            <v-avatar size="80" class="elevation-4" style="cursor: pointer">
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
          <v-card-title
            class="text-center text-h6 font-weight-bold text-senai-red px-4 pb-1"
            @click="abrirModal(pessoa)"
            style="cursor: pointer"
          >
            {{ pessoa.nome }}
          </v-card-title>

          <v-card-subtitle
            class="text-center text-body-2 text-medium-emphasis px-4 pb-2"
            @click="abrirModal(pessoa)"
            style="cursor: pointer"
          >
            {{ pessoa.cargo }}
          </v-card-subtitle>

          <!-- Badge de Status -->
          <div class="d-flex justify-center text-center pb-4">
            <v-chip
              size="small"
              color="success"
              variant="outlined"
            >
              <v-icon start size="small">mdi-check-circle</v-icon>
              Ativo
            </v-chip>
            <div class="ml-3 text-center">
              <div class="text-caption text-medium-emphasis">Matrícula</div>
              <div class="text-body-2 font-weight-medium">{{ pessoa.matricula }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal de adicionar/editar aluno -->
    <CarometroAlunoModal
      v-model="modalAlunoAberto"
      :aluno-editar="alunoEditando"
      :turma="turma"
      @aluno-salvo="carregarAlunos"
    />

    <!-- Dialog de confirmação de exclusão -->
    <v-dialog v-model="dialogExclusao" max-width="400">
      <v-card rounded="lg">
        <v-card-title class="pa-6 pb-2">
          <div class="text-center">
            <v-icon size="48" color="error" class="mb-2">mdi-alert-circle</v-icon>
            <h2 class="text-h6 text-error">Confirmar Exclusão</h2>
          </div>
        </v-card-title>

        <v-card-text class="text-center px-6 pb-2">
          <p class="text-body-1">
            Tem certeza que deseja excluir <strong>{{ pessoaParaExcluir?.nome }}</strong>?
          </p>
          <p class="text-body-2 text-medium-emphasis">
            Esta ação não pode ser desfeita.
          </p>
        </v-card-text>

        <v-card-actions class="pa-6 pt-2">
          <v-spacer />
          <v-btn variant="outlined" @click="dialogExclusao = false">
            Cancelar
          </v-btn>
          <v-btn color="error" :loading="excluindo" @click="excluirPessoa">
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
const props = defineProps({
  turma: String
})

const emit = defineEmits(['selectPessoa', 'updateTotal'])

const pessoas = ref([])
const loading = ref(false)
const modalAlunoAberto = ref(false)
const alunoEditando = ref(null)
const dialogExclusao = ref(false)
const pessoaParaExcluir = ref(null)
const excluindo = ref(false)

const { getAlunosTurma, deleteAluno, exportarTurma, importarTurma } = useCarometro()

const carregarAlunos = async () => {
  if (!props.turma || !process.client) return

  loading.value = true
  try {
    // Usar localStorage em vez de API
    pessoas.value = getAlunosTurma(props.turma)
    emit('updateTotal', pessoas.value)
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

const abrirModalAdicionar = () => {
  alunoEditando.value = null
  modalAlunoAberto.value = true
}

const editarPessoa = (pessoa) => {
  alunoEditando.value = pessoa
  modalAlunoAberto.value = true
}

const confirmarExclusao = (pessoa) => {
  pessoaParaExcluir.value = pessoa
  dialogExclusao.value = true
}

const excluirPessoa = async () => {
  if (!pessoaParaExcluir.value || !process.client) return

  excluindo.value = true

  try {
    // Usar composable em vez de API
    const response = deleteAluno(props.turma, pessoaParaExcluir.value.matricula)

    if (response.success) {
      // Recarregar lista
      await carregarAlunos()

      dialogExclusao.value = false
      pessoaParaExcluir.value = null
    }

  } catch (error) {
    console.error('Erro ao excluir pessoa:', error)
    if (process.client) {
      alert('Erro ao excluir pessoa: ' + (error.message || 'Erro desconhecido'))
    }
  } finally {
    excluindo.value = false
  }
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

// Funções de backup
const exportarDados = () => {
  if (!process.client || !props.turma) return

  try {
    const sucesso = exportarTurma(props.turma)
    if (sucesso) {
      // Mostrar feedback de sucesso
      console.log('Dados exportados com sucesso!')
    } else {
      alert('Erro ao exportar dados')
    }
  } catch (error) {
    console.error('Erro ao exportar:', error)
    alert('Erro ao exportar dados: ' + error.message)
  }
}

const importarDados = async (event) => {
  if (!process.client || !props.turma) return

  const file = event.target.files[0]
  if (!file) return

  try {
    const response = await importarTurma(props.turma, file)
    if (response.success) {
      // Recarregar dados
      await carregarAlunos()
      alert(response.message)
    }
  } catch (error) {
    console.error('Erro ao importar:', error)
    alert('Erro ao importar dados: ' + error.message)
  }

  // Limpar input
  event.target.value = ''
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
