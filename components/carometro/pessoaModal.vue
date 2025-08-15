<template>
  <v-dialog v-model="isOpen" max-width="800px">
    <v-card>
      <v-card-title class="text-h6">
        {{ pessoa.nome }} - {{ pessoa.cargo }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-img :src="pessoa.foto" height="200px" cover></v-img>
          </v-col>
          <v-col cols="12" md="8">
            <v-list density="compact">
              <v-list-item v-for="(valor, chave) in dadosPrincipais" :key="chave">
                <v-list-item-title>
                  <strong>{{ chave }}:</strong> {{ valor }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <h3>Histórico de Ocorrências</h3>
        <v-list density="compact">
          <v-list-item
            v-for="(ocorrencia, index) in pessoa.ocorrencias"
            :key="index"
          >
            <v-list-item-title>{{ ocorrencia }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="isOpen = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  pessoa: { type: Object, default: () => ({}) }
})

const emit = defineEmits(["update:modelValue"])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
})

// Mapeia dados principais (sem histórico)
const dadosPrincipais = computed(() => {
  const { matricula, turma, curso, endereco, bairro, cidade, estado, cep, telefone, celular, rg, cpf, mae, pai, empresa } = props.pessoa
  return { matricula, turma, curso, endereco, bairro, cidade, estado, cep, telefone, celular, rg, cpf, mae, pai, empresa }
})
</script>
