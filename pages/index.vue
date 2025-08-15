<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="400" class="pa-4">
      <v-card-title class="text-h5 justify-center">
        <v-img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fsp.senai.br%2Funidade%2Fgrafica%2F&psig=AOvVaw0BavNbeIkV6aa9-uooEI6e&ust=1755366995317000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJiWz-SxjY8DFQAAAAAdAAAAABAE"
          max-width="200"
          alt="Logo SENAI SP"
        />
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="Usuário"
            outlined
            :rules="[v => !!v || 'Usuário é obrigatório']"
          />
          <v-text-field
            v-model="password"
            label="Senha"
            type="password"
            outlined
            :rules="[v => !!v || 'Senha é obrigatória']"
          />
          <v-btn
            :disabled="!valid"
            color="primary"
            block
            type="submit"
          >
            Entrar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
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
