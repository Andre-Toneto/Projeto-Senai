<template>
  <v-container fluid class="pa-0">
    <v-row class="mb-4">
      <!-- Seleção de Curso -->
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="2" class="h-100">
          <v-card-title class="bg-senai-red text-white pa-4">
            <v-icon class="mr-2">mdi-school</v-icon>
            Selecionar Curso
          </v-card-title>
          <v-card-text class="pa-4">
            <v-alert
              v-if="!temDadosPlanilha()"
              type="warning"
              variant="tonal"
              class="mb-4"
            >
              <template v-slot:prepend>
                <v-icon>mdi-alert</v-icon>
              </template>
              Nenhuma planilha configurada. Configure primeiro sua planilha Excel.
            </v-alert>

            <div v-if="cursosDisponiveis.length === 0 && temDadosPlanilha()" class="text-center py-4">
              <v-icon size="48" color="grey-lighten-2" class="mb-2">mdi-folder-open</v-icon>
              <p class="text-body-2 text-medium-emphasis">Nenhum curso encontrado na planilha</p>
            </div>

            <v-list v-else class="pa-0">
              <v-list-item
                v-for="curso in cursosDisponiveis"
                :key="curso.id"
                :class="{ 'bg-primary': cursoSelecionado?.id === curso.id }"
                :variant="cursoSelecionado?.id === curso.id ? 'flat' : 'text'"
                rounded="lg"
                class="mb-2"
                @click="selecionarCurso(curso)"
              >
                <template v-slot:prepend>
                  <v-avatar :color="curso.cor" size="40">
                    <v-icon color="white">mdi-book-open-variant</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-bold">
                  {{ curso.nome }}
                </v-list-item-title>

                <v-list-item-subtitle>
                  {{ curso.totalAlunos }} alunos • {{ curso.totalTurmas }} turmas
                </v-list-item-subtitle>

                <template v-slot:append>
                  <v-chip
                    v-if="cursoSelecionado?.id === curso.id"
                    color="success"
                    size="small"
                    variant="flat"
                  >
                    <v-icon start size="small">mdi-check</v-icon>
                    Selecionado
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Seleção de Turma -->
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="2" class="h-100">
          <v-card-title class="bg-primary text-white pa-4">
            <v-icon class="mr-2">mdi-account-group</v-icon>
            Selecionar Turma
          </v-card-title>
          <v-card-text class="pa-4">
            <v-alert
              v-if="!cursoSelecionado"
              type="info"
              variant="tonal"
              class="mb-4"
            >
              <template v-slot:prepend>
                <v-icon>mdi-information</v-icon>
              </template>
              Selecione um curso primeiro para ver as turmas disponíveis.
            </v-alert>

            <div v-else-if="turmasDisponiveis.length === 0" class="text-center py-4">
              <v-icon size="48" color="grey-lighten-2" class="mb-2">mdi-account-group-outline</v-icon>
              <p class="text-body-2 text-medium-emphasis">
                Nenhuma turma encontrada para o curso "{{ cursoSelecionado.nome }}"
              </p>
            </div>

            <v-list v-else class="pa-0">
              <v-list-item
                v-for="turma in turmasDisponiveis"
                :key="turma.id"
                :class="{ 'bg-success': turmaSelecionada?.id === turma.id }"
                :variant="turmaSelecionada?.id === turma.id ? 'flat' : 'text'"
                rounded="lg"
                class="mb-2"
                @click="selecionarTurma(turma)"
              >
                <template v-slot:prepend>
                  <v-avatar :color="cursoSelecionado.cor" size="40" variant="outlined">
                    <strong class="text-h6">{{ turma.nome }}</strong>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-bold">
                  Turma {{ turma.nome }}
                </v-list-item-title>

                <v-list-item-subtitle>
                  {{ turma.totalAlunos }} alunos
                </v-list-item-subtitle>

                <template v-slot:append>
                  <v-chip
                    v-if="turmaSelecionada?.id === turma.id"
                    color="success"
                    size="small"
                    variant="flat"
                  >
                    <v-icon start size="small">mdi-check</v-icon>
                    Selecionada
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Resumo da Seleção -->
    <v-row v-if="cursoSelecionado && turmaSelecionada">
      <v-col cols="12">
        <v-card rounded="xl" elevation="3" class="bg-gradient-primary">
          <v-card-text class="pa-6">
            <div class="d-flex align-center">
              <v-avatar :color="cursoSelecionado.cor" size="60" class="mr-4">
                <v-icon color="white" size="30">mdi-check-circle</v-icon>
              </v-avatar>
              
              <div class="flex-grow-1">
                <h3 class="text-h5 font-weight-bold text-white mb-1">
                  Seleção Confirmada
                </h3>
                <p class="text-h6 text-grey-lighten-3 mb-1">
                  {{ cursoSelecionado.nome }} • Turma {{ turmaSelecionada.nome }}
                </p>
                <p class="text-body-2 text-grey-lighten-4 mb-0">
                  {{ turmaSelecionada.totalAlunos }} alunos cadastrados
                </p>
              </div>
              
              <v-btn
                color="white"
                variant="flat"
                size="large"
                prepend-icon="mdi-arrow-right"
                @click="confirmarSelecao"
                rounded="xl"
              >
                Visualizar Carômetro
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botão para configurar planilha -->
    <v-row v-if="!temDadosPlanilha()">
      <v-col cols="12" class="text-center">
        <v-btn
          color="senai-red"
          size="large"
          prepend-icon="mdi-file-excel"
          rounded="xl"
          @click="abrirConfigExcel"
        >
          Configurar Planilha Excel
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const emit = defineEmits(['curso-turma-selecionados', 'configurar-excel'])

const { getCursosDisponiveis, getTurmasPorCurso, temDadosPlanilha } = useExcelData()

const cursosDisponiveis = ref([])
const turmasDisponiveis = ref([])
const cursoSelecionado = ref(null)
const turmaSelecionada = ref(null)

const carregarCursos = () => {
  if (temDadosPlanilha()) {
    cursosDisponiveis.value = getCursosDisponiveis()
  } else {
    cursosDisponiveis.value = []
  }
}

const selecionarCurso = (curso) => {
  cursoSelecionado.value = curso
  turmaSelecionada.value = null
  
  // Carregar turmas do curso
  turmasDisponiveis.value = getTurmasPorCurso(curso.id)
}

const selecionarTurma = (turma) => {
  turmaSelecionada.value = turma
}

const confirmarSelecao = () => {
  if (cursoSelecionado.value && turmaSelecionada.value) {
    emit('curso-turma-selecionados', {
      curso: cursoSelecionado.value,
      turma: turmaSelecionada.value
    })
  }
}

const abrirConfigExcel = () => {
  emit('configurar-excel')
}

onMounted(() => {
  carregarCursos()
})

// Expor método para recarregar cursos
defineExpose({
  recarregarCursos: carregarCursos
})
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-senai-red)) 100%);
}

.v-list-item {
  transition: all 0.3s ease;
}

.v-list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
