<template>
  <v-container class="turma-selection-page">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6" elevation="8" rounded="lg">
          <v-card-title class="text-center pb-4">
            <div class="selection-header">
              <v-icon size="56" color="senai-red" class="mb-3">mdi-school</v-icon>
              <h2 class="selection-title">Selecionar Turma</h2>
              <p class="selection-subtitle">Digite o código da turma para visualizar os alunos</p>
            </div>
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid" @submit.prevent="loadTurma">
              <v-text-field
                v-model="turmaCode"
                label="Código da Turma"
                placeholder="Ex: T2025-001, ADM-2024, etc."
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-identifier"
                :rules="[v => !!v || 'Código da turma é obrigatório']"
                class="mb-4"
                autofocus
              />

              <v-row>
                <v-col cols="6">
                  <v-btn
                    variant="outlined"
                    color="senai-navy"
                    size="large"
                    block
                    @click="goBack"
                  >
                    Voltar
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    :disabled="!valid"
                    :loading="loading"
                    color="senai-navy"
                    size="large"
                    block
                    type="submit"
                    elevation="2"
                  >
                    Carregar Turma
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>

            <!-- Turmas Recentes -->
            <div v-if="recentTurmas.length > 0" class="recent-turmas mt-6">
              <v-divider class="mb-4" />
              <h3 class="recent-title mb-3">Turmas Recentes</h3>
              <v-chip-group>
                <v-chip
                  v-for="turma in recentTurmas"
                  :key="turma"
                  color="senai-light-blue"
                  variant="outlined"
                  @click="selectRecentTurma(turma)"
                  class="recent-chip"
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
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const router = useRouter()
const valid = ref(false)
const loading = ref(false)
const turmaCode = ref('')

// Verificar autenticação
onMounted(() => {
  if (process.client && !sessionStorage.getItem('carometro_authenticated')) {
    router.push('/carometro/login')
  }
})

const recentTurmas = ref(['T2025-001', 'ADM-2024', 'TEC-2025'])

const loadTurma = async () => {
  loading.value = true

  // Simular carregamento
  setTimeout(() => {
    if (turmaCode.value.trim() && process.client) {
      // Salvar turma selecionada
      sessionStorage.setItem('turma_selecionada', turmaCode.value)

      // Adicionar à lista de recentes se não existir
      if (!recentTurmas.value.includes(turmaCode.value)) {
        recentTurmas.value.unshift(turmaCode.value)
        recentTurmas.value = recentTurmas.value.slice(0, 5) // Manter apenas 5
      }

      router.push('/carometro')
    }
    loading.value = false
  }, 800)
}

const selectRecentTurma = (turma) => {
  turmaCode.value = turma
  loadTurma()
}

const goBack = () => {
  sessionStorage.removeItem('carometro_authenticated')
  router.push('/carometro/login')
}
</script>

<style scoped>
.turma-selection-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.selection-header {
  text-align: center;
}

.selection-title {
  color: rgb(var(--v-theme-senai-navy));
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.selection-subtitle {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  margin: 0;
}

.recent-turmas {
  text-align: center;
}

.recent-title {
  color: rgb(var(--v-theme-senai-navy));
  font-weight: 500;
  font-size: 1.1rem;
}

.recent-chip {
  cursor: pointer;
  transition: all 0.3s ease;
}

.recent-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.v-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>
