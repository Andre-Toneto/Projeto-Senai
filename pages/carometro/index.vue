<template>
  <div>
    <!-- Header da Turma -->
    <v-container fluid>
      <v-card color="senai-navy" dark elevation="4" rounded="lg" class="mb-4">
        <v-card-text class="pa-4">
          <v-row align="center">
            <v-col>
              <div class="d-flex align-center">
                <v-icon size="large" class="mr-3">mdi-school</v-icon>
                <div>
                  <h2 class="text-h5 font-weight-medium mb-1">Turma: {{ turmaSelecionada }}</h2>
                  <p class="text-body-2 opacity-80 mb-0">{{ totalAlunos }} alunos cadastrados</p>
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

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CarometroPage',
  setup() {
    const router = useRouter()
    const modalAberto = ref(false)
    const pessoaSelecionada = ref({})
    const turmaSelecionada = ref('')
    const totalAlunos = ref(0)

    onMounted(() => {
      if (process.client) {
        const isAuthenticated = sessionStorage.getItem('carometro_authenticated')
        if (!isAuthenticated) {
          router.push('/carometro/login')
          return
        }

        const turma = sessionStorage.getItem('turma_selecionada')
        if (!turma) {
          router.push('/carometro/turma')
          return
        }

        turmaSelecionada.value = turma
        totalAlunos.value = 2
      }
    })

    const selecionarPessoa = (pessoa) => {
      pessoaSelecionada.value = pessoa
      modalAberto.value = true
    }

    const changeTurma = () => {
      router.push('/carometro/turma')
    }

    return {
      modalAberto,
      pessoaSelecionada,
      turmaSelecionada,
      totalAlunos,
      selecionarPessoa,
      changeTurma
    }
  }
}
</script>
