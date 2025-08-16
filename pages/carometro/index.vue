<template>
  <div class="carometro-page">
    <!-- Header da Turma -->
    <div class="turma-header">
      <v-card class="pa-4 mb-4" color="senai-navy" dark elevation="4">
        <v-row align="center">
          <v-col>
            <div class="d-flex align-center">
              <v-icon size="large" class="mr-3">mdi-school</v-icon>
              <div>
                <h2 class="turma-title">Turma: {{ turmaSelecionada }}</h2>
                <p class="turma-subtitle mb-0">{{ totalAlunos }} alunos cadastrados</p>
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
      </v-card>
    </div>

    <!-- Componente Carômetro -->
    <Carometro
      :turma="turmaSelecionada"
      @selectPessoa="selecionarPessoa"
    />

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

// Verificar autenticação e turma selecionada
onMounted(() => {
  if (!sessionStorage.getItem('carometro_authenticated')) {
    router.push('/carometro/login')
    return
  }

  const turma = sessionStorage.getItem('turma_selecionada')
  if (!turma) {
    router.push('/carometro/turma')
    return
  }

  turmaSelecionada.value = turma
  totalAlunos.value = 2 // Será atualizado pelo componente Carometro
})

function selecionarPessoa(pessoa) {
  pessoaSelecionada.value = pessoa
  modalAberto.value = true
}

function changeTurma() {
  router.push('/carometro/turma')
}
</script>

<style scoped>
.carometro-page {
  padding: 0;
}

.turma-header {
  margin-bottom: 1rem;
}

.turma-title {
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.turma-subtitle {
  opacity: 0.8;
  font-size: 0.9rem;
}
</style>
