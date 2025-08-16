<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6" elevation="12" rounded="lg">
          <v-card-title class="text-center pb-4">
            <div class="auth-header">
              <v-icon size="48" color="senai-red" class="mb-2">mdi-account-group</v-icon>
              <h2 class="auth-title">Acesso ao Carômetro</h2>
              <p class="auth-subtitle">Autenticação necessária</p>
            </div>
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid" @submit.prevent="authenticate">
              <v-text-field
                v-model="credentials.usuario"
                label="Usuário"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-account"
                :rules="[v => !!v || 'Usuário é obrigatório']"
                class="mb-3"
              />
              
              <v-text-field
                v-model="credentials.senha"
                label="Senha"
                type="password"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-lock"
                :rules="[v => !!v || 'Senha é obrigatória']"
                class="mb-4"
              />

              <v-btn
                :disabled="!valid"
                :loading="loading"
                color="senai-navy"
                size="large"
                block
                type="submit"
                elevation="2"
              >
                Autenticar
              </v-btn>
            </v-form>
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

const credentials = ref({
  usuario: '',
  senha: ''
})

const authenticate = async () => {
  loading.value = true
  
  // Simular autenticação
  setTimeout(() => {
    if (credentials.value.usuario === 'professor' && credentials.value.senha === '123456') {
      // Salvar estado de autenticação
      if (process.client) {
        sessionStorage.setItem('carometro_authenticated', 'true')
      }
      router.push('/carometro/turma')
    } else {
      alert('Credenciais inválidas. Use: professor/123456')
    }
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.auth-header {
  text-align: center;
}

.auth-title {
  color: rgb(var(--v-theme-senai-navy));
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  margin: 0;
}

.v-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>
