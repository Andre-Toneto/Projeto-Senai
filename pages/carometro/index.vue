<template>
  <div>
    <!-- Seleção de Turma (se não selecionada) -->
    <div v-if="!turmaSelecionada">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card elevation="8" rounded="lg" class="pa-6 mb-4">
              <v-card-title class="text-center pb-4">
                <div class="text-center">
                  <v-icon size="56" color="senai-red" class="mb-3">mdi-school</v-icon>
                  <h2 class="text-h4 text-senai-red font-weight-medium mb-2">Selecionar Turma</h2>
                  <p class="text-body-1 text-medium-emphasis">Digite o código da turma para visualizar os alunos</p>
                </div>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" @submit.prevent="loadTurma">
                  <v-text-field
                    v-model="turmaCode"
                    label="Código da Turma"
                    placeholder="Ex: T2025-001, ADM-2024, etc."
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-identifier"
                    :rules="turmaRules"
                    class="mb-4"
                    autofocus
                  />

                  <v-btn
                    :disabled="!valid"
                    :loading="loading"
                    color="senai-red"
                    size="large"
                    block
                    type="submit"
                    elevation="2"
                  >
                    Carregar Turma
                  </v-btn>
                </v-form>

                <!-- Turmas Recentes -->
                <div v-if="recentTurmas.length > 0" class="mt-6 text-center">
                  <v-divider class="mb-4" />
                  <h3 class="text-h6 text-senai-red font-weight-medium mb-3">Turmas Recentes</h3>
                  <v-chip-group>
                    <v-chip
                      v-for="turma in recentTurmas"
                      :key="turma"
                      color="senai-light-blue"
                      variant="outlined"
                      @click="selectRecentTurma(turma)"
                      style="cursor: pointer"
                    >
                      {{ turma }}
                    </v-chip>
                  </v-chip-group>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Carômetro (se turma selecionada) -->
    <div v-else>
      <!-- Header da Turma -->
      <v-container fluid>
        <v-card color="senai-red" dark elevation="4" rounded="lg" class="mb-4">
          <v-card-text class="pa-4">
            <v-row align="center">
              <v-col>
                <div class="d-flex align-center">
                  <v-icon size="large" class="mr-3">mdi-school</v-icon>
                  <div>
                    <h2 class="text-h5 font-weight-medium mb-1">Turma: {{ turmaSelecionada }}</h2>
                    <ClientOnly fallback-tag="p" fallback="Carregando dados...">
                      <p class="text-body-2 opacity-80 mb-0">{{ totalAlunos }} pessoas cadastradas</p>
                    </ClientOnly>
                  </div>
                </div>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  variant="outlined"
                  color="white"
                  @click="changeTurma"
                  prepend-icon="mdi-swap-horizontal"
                >
                  Trocar Turma
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>

      <!-- Componente Carômetro -->
      <ClientOnly fallback-tag="div" fallback="<v-container class='text-center py-8'><v-progress-circular indeterminate color='senai-red' size='64' /><p class='text-body-1 text-medium-emphasis mt-4'>Carregando carômetro...</p></v-container>">
        <Carometro
          :turma="turmaSelecionada"
          @selectPessoa="selecionarPessoa"
          @updateTotal="atualizarTotal"
        />
      </ClientOnly>
    </div>

    <!-- Modal de Pessoa -->
    <CarometroPessoaModal
      v-model="modalAberto"
      :pessoa="pessoaSelecionada"
    />
  </div>
</template>

<script setup>
const router = useRouter()
const modalAberto = ref(false)
const pessoaSelecionada = ref({})
const turmaSelecionada = ref('')
const totalAlunos = ref(0)
const valid = ref(false)
const loading = ref(false)
const turmaCode = ref('')
const recentTurmas = ref(['T2025-001', 'ADM-2024', 'TEC-2025'])

const turmaRules = [
  v => !!v || 'Código da turma é obrigatório'
]

onMounted(() => {
  if (process.client) {
    const isAuthenticated = sessionStorage.getItem('carometro_authenticated')
    if (!isAuthenticated) {
      router.push('/carometro/login')
      return
    }

    const turma = sessionStorage.getItem('turma_selecionada')
    if (turma) {
      turmaSelecionada.value = turma
      totalAlunos.value = 2
    }
  }
})

const loadTurma = () => {
  if (!process.client) return

  loading.value = true

  setTimeout(() => {
    if (turmaCode.value.trim()) {
      sessionStorage.setItem('turma_selecionada', turmaCode.value)

      if (!recentTurmas.value.includes(turmaCode.value)) {
        recentTurmas.value.unshift(turmaCode.value)
        recentTurmas.value = recentTurmas.value.slice(0, 5)
      }

      turmaSelecionada.value = turmaCode.value
      totalAlunos.value = 0 // Será atualizado pelo componente carômetro
    }
    loading.value = false
  }, 800)
}

const selectRecentTurma = (turma) => {
  if (!process.client) return
  turmaCode.value = turma
  loadTurma()
}

const selecionarPessoa = (pessoa) => {
  pessoaSelecionada.value = pessoa
  modalAberto.value = true
}

const changeTurma = () => {
  turmaSelecionada.value = ''
  turmaCode.value = ''
  totalAlunos.value = 0
  if (process.client) {
    sessionStorage.removeItem('turma_selecionada')
  }
}

// Função para atualizar total de alunos
const atualizarTotal = (alunos) => {
  totalAlunos.value = Array.isArray(alunos) ? alunos.length : 0
}
</script>
