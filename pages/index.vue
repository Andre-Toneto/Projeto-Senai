<template>
  <div></div>
</template>

<script setup>
definePageMeta({
  layout: false
})

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
</script>
