<template>
  <div class="p-5 bg-gray-100 min-h-screen font-sans">
    <h1 class="text-center text-2xl font-bold mb-6">Arquivos - Estudos Excel</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <div
        v-for="arquivo in arquivos"
        :key="arquivo.caminho"
        class="bg-white rounded-lg shadow-md p-4 hover:-translate-y-1 transform transition cursor-pointer"
      >
        <a :href="arquivo.caminho" target="_blank">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ arquivo.nome }}</h2>
          <p class="text-sm text-gray-600"><strong>Tipo:</strong> {{ arquivo.tipo }}</p>
          <p class="text-sm text-gray-600"><strong>Tamanho:</strong> {{ arquivo.tamanho }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const arquivos = ref([])

const carregarArquivos = async () => {
  try {
    const resp = await fetch('/arquivos.json')
    arquivos.value = await resp.json()
  } catch (err) {
    console.error('Erro ao carregar arquivos:', err)
  }
}

onMounted(() => {
  carregarArquivos()
})
</script>