<template>
  <v-app>
    <v-container fluid class="fill-height">
      <v-row no-gutters class="fill-height">
        <!-- Left Side - Branding -->
        <v-col cols="12" md="6">
          <v-sheet color="senai-navy" class="fill-height d-flex align-center justify-center">
            <div class="text-center">
              <v-img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTYwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTYwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRTUzRTNFIi8+Cjx0ZXh0IHg9IjgwIiB5PSIzMiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNFTkFJPC90ZXh0Pgo8L3N2Zz4="
                alt="SENAI"
                max-width="200"
                class="mb-8"
              />
              <h1 class="text-h3 text-white font-weight-light mb-4">DIÁRIO FIC</h1>
              <v-icon size="120" color="rgba(255,255,255,0.3)">mdi-school</v-icon>
            </div>
          </v-sheet>
        </v-col>

        <!-- Right Side - Login Form -->
        <v-col cols="12" md="6">
          <v-sheet class="fill-height d-flex align-center justify-center">
            <v-card max-width="400" width="100%" elevation="0" class="pa-6">
              <v-card-title class="text-center mb-4">
                <div>
                  <h2 class="text-h4 text-senai-navy mb-2">Entrar</h2>
                  <p class="text-body-1 text-medium-emphasis">Acesse sua conta</p>
                </div>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" @submit.prevent="login">
                  <v-text-field
                    v-model="username"
                    label="NIF"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-account"
                    :rules="usernameRules"
                    class="mb-3"
                  />

                  <v-text-field
                    v-model="password"
                    label="Senha"
                    type="password"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-lock"
                    :rules="passwordRules"
                    class="mb-4"
                  />

                  <v-btn
                    :disabled="!valid"
                    color="senai-navy"
                    size="large"
                    block
                    type="submit"
                    elevation="2"
                  >
                    Entrar
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()

    const username = ref('')
    const password = ref('')
    const valid = ref(false)

    const usernameRules = [
      v => !!v || 'NIF é obrigatório'
    ]

    const passwordRules = [
      v => !!v || 'Senha é obrigatória'
    ]

    const login = () => {
      if (username.value === 'admin' && password.value === '1234') {
        alert('Login bem-sucedido!')
        router.push('/home')
      } else {
        alert('Usuário ou senha incorretos.')
      }
    }

    return {
      username,
      password,
      valid,
      usernameRules,
      passwordRules,
      login
    }
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  overflow: hidden;
}

.login-main {
  height: 100vh;
}

.login-branding {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.branding-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.senai-logo-container {
  margin-bottom: 2rem;
}

.senai-logo {
  max-width: 200px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.system-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.illustration {
  position: absolute;
  bottom: -20px;
  right: -20px;
  opacity: 0.1;
}

.login-form-container {
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-form-wrapper {
  width: 100%;
  max-width: 400px;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title {
  color: #1e3a8a;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.login-form {
  margin-top: 2rem;
}

.form-field {
  margin-bottom: 1rem;
}

.login-btn {
  margin-top: 1rem;
  height: 48px;
  font-weight: 600;
  text-transform: none;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 960px) {
  .login-branding {
    padding: 2rem 1rem;
  }

  .system-title {
    font-size: 2rem;
  }

  .login-form-container {
    padding: 1rem;
  }
}

@media (max-width: 600px) {
  .system-title {
    font-size: 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
  }
}
</style>
