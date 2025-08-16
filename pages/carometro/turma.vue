<template>
  <v-container fluid class="fill-height d-flex align-center">
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="8" rounded="lg" class="pa-6">
          <v-card-title class="text-center pb-4">
            <div class="text-center">
              <v-icon size="56" color="senai-red" class="mb-3">mdi-school</v-icon>
              <h2 class="text-h4 text-senai-navy font-weight-medium mb-2">Selecionar Turma</h2>
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
            <div v-if="recentTurmas.length > 0" class="mt-6 text-center">
              <v-divider class="mb-4" />
              <h3 class="text-h6 text-senai-navy font-weight-medium mb-3">Turmas Recentes</h3>
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
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'TurmaSelection',
  setup() {
    const router = useRouter()
    const valid = ref(false)
    const loading = ref(false)
    const turmaCode = ref('')
    const recentTurmas = ref(['T2025-001', 'ADM-2024', 'TEC-2025'])

    const turmaRules = [
      v => !!v || 'Código da turma é obrigatório'
    ]

    onMounted(() => {
      if (process.client && !sessionStorage.getItem('carometro_authenticated')) {
        router.push('/carometro/login')
      }
    })

    const loadTurma = () => {
      loading.value = true

      setTimeout(() => {
        if (turmaCode.value.trim() && process.client) {
          sessionStorage.setItem('turma_selecionada', turmaCode.value)

          if (!recentTurmas.value.includes(turmaCode.value)) {
            recentTurmas.value.unshift(turmaCode.value)
            recentTurmas.value = recentTurmas.value.slice(0, 5)
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
      if (process.client) {
        sessionStorage.removeItem('carometro_authenticated')
      }
      router.push('/carometro/login')
    }

    return {
      valid,
      loading,
      turmaCode,
      recentTurmas,
      turmaRules,
      loadTurma,
      selectRecentTurma,
      goBack
    }
  }
}
</script>
