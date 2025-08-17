<template>
  <v-dialog v-model="isOpen" max-width="600" persistent>
    <v-card rounded="xl" elevation="12">
      <!-- Header Compacto -->
      <v-card-title class="bg-senai-navy text-white pa-4">
        <div class="d-flex align-center">
          <v-avatar size="48" class="mr-3 elevation-4">
            <v-img :src="pessoa.foto" />
          </v-avatar>
          <div class="flex-grow-1">
            <h3 class="text-h6 font-weight-bold mb-0">{{ pessoa.nome }}</h3>
            <p class="text-body-2 opacity-80 mb-0">{{ pessoa.cargo }}</p>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="white"
            size="small"
            @click="isOpen = false"
          />
        </div>
      </v-card-title>

      <v-card-text class="pa-4">
        <!-- Informações Principais em Cards Compactos -->
        <v-row dense>
          <!-- Dados Básicos -->
          <v-col cols="12" sm="6">
            <v-card variant="outlined" rounded="lg" class="pa-3">
              <h4 class="text-subtitle-1 text-senai-red font-weight-bold mb-2">
                <v-icon size="small" class="mr-1">mdi-account</v-icon>
                Dados Básicos
              </h4>
              <div class="text-body-2 space-y-1">
                <div><strong>Matrícula:</strong> {{ pessoa.matricula }}</div>
                <div><strong>RG:</strong> {{ pessoa.rg }}</div>
                <div><strong>CPF:</strong> {{ pessoa.cpf }}</div>
                <div><strong>Turma:</strong> {{ pessoa.turma }}</div>
              </div>
            </v-card>
          </v-col>

          <!-- Contato -->
          <v-col cols="12" sm="6">
            <v-card variant="outlined" rounded="lg" class="pa-3">
              <h4 class="text-subtitle-1 text-senai-red font-weight-bold mb-2">
                <v-icon size="small" class="mr-1">mdi-phone</v-icon>
                Contato
              </h4>
              <div class="text-body-2 space-y-1">
                <div><strong>Telefone:</strong> {{ pessoa.telefone }}</div>
                <div><strong>Celular:</strong> {{ pessoa.celular }}</div>
                <div><strong>Cidade:</strong> {{ pessoa.cidade }}/{{ pessoa.estado }}</div>
                <div><strong>CEP:</strong> {{ pessoa.cep }}</div>
              </div>
            </v-card>
          </v-col>

          <!-- Acadêmico -->
          <v-col cols="12">
            <v-card variant="outlined" rounded="lg" class="pa-3">
              <h4 class="text-subtitle-1 text-senai-red font-weight-bold mb-2">
                <v-icon size="small" class="mr-1">mdi-school</v-icon>
                Informações Acadêmicas
              </h4>
              <div class="text-body-2">
                <div class="mb-1"><strong>Curso:</strong> {{ pessoa.curso }}</div>
                <div class="mb-1"><strong>Empresa:</strong> {{ pessoa.empresa }}</div>
                <div><strong>Endereço:</strong> {{ pessoa.endereco }}, {{ pessoa.bairro }}</div>
              </div>
            </v-card>
          </v-col>

          <!-- Filiação -->
          <v-col cols="12" sm="6">
            <v-card variant="outlined" rounded="lg" class="pa-3">
              <h4 class="text-subtitle-1 text-senai-red font-weight-bold mb-2">
                <v-icon size="small" class="mr-1">mdi-account-group</v-icon>
                Filiação
              </h4>
              <div class="text-body-2 space-y-1">
                <div><strong>Mãe:</strong> {{ pessoa.mae }}</div>
                <div><strong>Pai:</strong> {{ pessoa.pai }}</div>
              </div>
            </v-card>
          </v-col>

          <!-- Ocorrências -->
          <v-col cols="12" sm="6">
            <v-card variant="outlined" rounded="lg" class="pa-3">
              <h4 class="text-subtitle-1 text-senai-red font-weight-bold mb-2">
                <v-icon size="small" class="mr-1">mdi-history</v-icon>
                Ocorrências ({{ pessoa.ocorrencias?.length || 0 }})
              </h4>
              <div class="text-body-2">
                <div
                  v-for="(ocorrencia, index) in pessoa.ocorrencias?.slice(0, 2)"
                  :key="index"
                  class="mb-1 d-flex align-start"
                >
                  <v-icon size="12" color="senai-red" class="mr-1 mt-1">mdi-circle</v-icon>
                  <span class="text-caption">{{ ocorrencia }}</span>
                </div>
                <div v-if="pessoa.ocorrencias?.length > 2" class="text-caption text-medium-emphasis mt-1">
                  + {{ pessoa.ocorrencias.length - 2 }} mais...
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Footer Simples -->
      <v-card-actions class="pa-4 pt-0">
        <v-spacer />
        <v-btn
          color="senai-navy"
          variant="elevated"
          @click="isOpen = false"
          rounded="lg"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, required: true },
  pessoa: { type: Object, default: () => ({}) }
})

defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style scoped>
.space-y-1 > div:not(:last-child) {
  margin-bottom: 4px;
}
</style>
