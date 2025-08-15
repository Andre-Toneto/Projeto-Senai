<template>
  <div>

    <Carometro 
    @selectPessoa="selecionarPessoa" />
   <CarometroPessoaModal
      v-model="modalAberto"
      :pessoa="pessoaSelecionada"
    />
  </div>
</template>

<script setup>

const modalAberto = ref(false)
const pessoaSelecionada = ref({})

function selecionarPessoa(pessoa) {
  pessoaSelecionada.value = pessoa
  modalAberto.value = true
}
</script>
