<template>
  <v-dialog v-model="isOpen" max-width="800" persistent>
    <v-card rounded="lg" elevation="8">
      <!-- Header -->
      <v-card-title class="pa-4 pb-2 d-flex align-center justify-space-between">
        <h2 class="text-h6 text-senai-navy font-weight-bold">
          {{ pessoa.nome?.toUpperCase() }}
        </h2>
        <v-btn
          icon="mdi-close"
          variant="text"
          color="senai-navy"
          @click="isOpen = false"
        />
      </v-card-title>

      <v-card-text class="pa-4 pt-2">
        <v-row dense>
          <!-- Foto -->
          <v-col cols="12" md="3" class="d-flex justify-center">
            <v-img
              :src="pessoa.foto"
              height="200"
              width="150"
              class="rounded-lg elevation-4"
              cover
            />
          </v-col>

          <!-- Informações -->
          <v-col cols="12" md="9">
            <v-container fluid class="pa-0">
              <!-- Matrícula / Turma -->
              <v-row dense>
                <v-col cols="12" sm="6" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Matrícula:</span>
                  <span class="ml-2">{{ pessoa.matricula }}</span>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Turma:</span>
                  <span class="ml-2">{{ pessoa.turma }}</span>
                </v-col>
              </v-row>

              <!-- Curso -->
              <v-row dense>
                <v-col cols="12" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Curso:</span>
                  <span class="ml-2">{{ pessoa.curso }}</span>
                </v-col>
              </v-row>

              <!-- Endereço -->
              <v-row dense>
                <v-col cols="12" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Endereço:</span>
                  <span class="ml-2">{{ pessoa.endereco }}, {{ pessoa.bairro }}</span>
                </v-col>
              </v-row>

              <!-- Cidade / CEP -->
              <v-row dense>
                <v-col cols="12" sm="8" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Cidade:</span>
                  <span class="ml-2">{{ pessoa.cidade }} - {{ pessoa.estado }}</span>
                </v-col>
                <v-col cols="12" sm="4" class="py-1">
                  <span class="font-weight-bold text-senai-navy">CEP:</span>
                  <span class="ml-2">{{ pessoa.cep }}</span>
                </v-col>
              </v-row>

              <!-- Telefones -->
              <v-row dense>
                <v-col cols="12" sm="6" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Telefone:</span>
                  <span class="ml-2">{{ pessoa.telefone }}</span>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Celular:</span>
                  <span class="ml-2">{{ pessoa.celular }}</span>
                </v-col>
              </v-row>

              <!-- RG / CPF -->
              <v-row dense>
                <v-col cols="12" sm="6" class="py-1">
                  <span class="font-weight-bold text-senai-navy">RG:</span>
                  <span class="ml-2">{{ pessoa.rg }}</span>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <span class="font-weight-bold text-senai-navy">CPF:</span>
                  <span class="ml-2">{{ pessoa.cpf }}</span>
                </v-col>
              </v-row>

              <!-- Pais -->
              <v-row dense>
                <v-col cols="12" sm="6" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Mãe:</span>
                  <span class="ml-2">{{ pessoa.mae }}</span>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Pai:</span>
                  <span class="ml-2">{{ pessoa.pai }}</span>
                </v-col>
              </v-row>

              <!-- Empresa -->
              <v-row dense>
                <v-col cols="12" class="py-1">
                  <span class="font-weight-bold text-senai-navy">Empresa:</span>
                  <span class="ml-2">
                    {{ pessoa.empresa }} - Nascimento: 17/01/2007
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>

        <v-divider class="my-3" />

        <!-- Ocorrências -->
        <div>
          <h3 class="text-subtitle-1 text-senai-navy font-weight-bold mb-2">
            Histórico de Ocorrências
          </h3>

          <div v-if="pessoa.ocorrencias && pessoa.ocorrencias.length > 0">
            <v-card
              v-for="(ocorrencia, index) in pessoa.ocorrencias"
              :key="index"
              variant="outlined"
              class="mb-2 pa-2"
            >
              <div class="d-flex align-start">
                <v-icon color="senai-red" size="small" class="mr-2 mt-1">mdi-circle</v-icon>
                <div>
                  <p class="text-body-2 mb-1">{{ ocorrencia }}</p>
                  <p class="text-caption text-medium-emphasis">
                    Registrado em: {{ new Date().toLocaleDateString('pt-BR') }}
                  </p>
                </div>
              </div>
            </v-card>
          </div>

          <div v-else class="text-center pa-4">
            <v-icon size="48" color="success" class="mb-2">mdi-check-circle</v-icon>
            <p class="text-body-2 text-medium-emphasis">
              Nenhuma ocorrência registrada para {{ pessoa.nome }}.
            </p>
          </div>
        </div>
      </v-card-text>

      <!-- Footer -->
      <v-card-actions class="pa-3 pt-0">
        <v-btn variant="outlined" color="senai-navy" @click="isOpen = false">
          Voltar p/ Carômetro
        </v-btn>
        <v-spacer />
        <v-btn
          color="senai-red"
          @click="toggleAddForm"
          :prepend-icon="showAddForm ? 'mdi-close' : 'mdi-plus'"
        >
          {{ showAddForm ? 'Cancelar' : 'Registrar Ocorrência' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  pessoa: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const showAddForm = ref(false)
const novaOcorrencia = ref('')
const formValid = ref(false)

const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value
  if (!showAddForm.value) {
    novaOcorrencia.value = ''
  }
}

const cancelarRegistro = () => {
  showAddForm.value = false
  novaOcorrencia.value = ''
}

const adicionarOcorrencia = () => {
  if (novaOcorrencia.value.trim()) {
    // Adicionar nova ocorrência à lista
    if (!props.pessoa.ocorrencias) {
      props.pessoa.ocorrencias = []
    }
    props.pessoa.ocorrencias.unshift(novaOcorrencia.value.trim())

    // Limpar formulário
    novaOcorrencia.value = ''
    showAddForm.value = false

    // Feedback para o usuário
    console.log('Ocorrência registrada com sucesso!')
  }
}
</script>

<style scoped>
.info-grid {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background-color: #fafafa;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid #eeeeee;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: rgb(var(--v-theme-senai-navy));
  min-width: 100px;
  margin-right: 8px;
}

.info-value {
  color: #333;
  flex: 1;
}

.ocorrencias-section {
  margin-top: 16px;
}

.d-flex.gap-2 {
  gap: 8px;
}

@media (max-width: 600px) {
  .info-label {
    min-width: 80px;
    font-size: 0.875rem;
  }

  .info-value {
    font-size: 0.875rem;
  }
}
</style>
