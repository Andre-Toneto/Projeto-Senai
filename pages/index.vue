<template>
  <v-app class="login-page">
    <v-main class="login-main">
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <!-- Left Side - Branding -->
          <v-col cols="12" md="6" class="login-branding">
            <div class="branding-content">
              <div class="senai-logo-container">
                <v-img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTYwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRTUzRTNFIi8+Cjx0ZXh0IHg9IjgwIiB5PSIzMiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNFTkFJPC90ZXh0Pgo8L3N2Zz4="
                  alt="SENAI"
                  class="senai-logo"
                />
              </div>
              <h1 class="system-title">DIÁRIO FIC</h1>
              <div class="illustration">
                <v-icon size="120" color="rgba(255,255,255,0.3)">mdi-school</v-icon>
              </div>
            </div>
          </v-col>

          <!-- Right Side - Login Form -->
          <v-col cols="12" md="6" class="login-form-container">
            <div class="login-form-wrapper">
              <div class="form-header">
                <h2 class="form-title">Entrar</h2>
                <p class="form-subtitle">Acesse sua conta</p>
              </div>

              <v-form v-model="valid" @submit.prevent="login" class="login-form">
                <v-text-field
                  v-model="username"
                  label="NIF"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-account"
                  :rules="[v => !!v || 'NIF é obrigatório']"
                  class="form-field"
                />

                <v-text-field
                  v-model="password"
                  label="Senha"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-lock"
                  :rules="[v => !!v || 'Senha é obrigatória']"
                  class="form-field"
                />

                <v-btn
                  :disabled="!valid"
                  color="senai-navy"
                  size="large"
                  block
                  type="submit"
                  class="login-btn"
                  elevation="2"
                >
                  Entrar
                </v-btn>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

definePageMeta({
  layout: false
});

// Variáveis de estado
const username = ref('')
const password = ref('')
const valid = ref(false)

const route = useRoute()
const router = useRouter()

// Função de login (simulada)
const login = () => {
  if (username.value === 'admin' && password.value === '1234') {
    alert('Login bem-sucedido!')
    router.push('/home')
  } else {
    alert('Usuário ou senha incorretos.')
  }
}
</script>

<style scoped>
/* Adicione aqui estilos específicos, caso necessário */
.v-container {
  background-color: #f4f6f8;
}
</style>
