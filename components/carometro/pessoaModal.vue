<template>
  <v-dialog v-model="isOpen" max-width="900" persistent>
    <v-card rounded="lg" elevation="8">
      <!-- Header -->
      <v-card-title class="pa-4 pb-0">
        <div class="d-flex align-center justify-space-between w-100">
          <h2 class="text-h6 text-senai-navy font-weight-bold">
            {{ pessoa.nome?.toUpperCase() }}
          </h2>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="senai-navy"
            @click="isOpen = false"
          />
        </div>
      </v-card-title>

      <v-card-text class="pa-4">
        <!-- Layout Principal - Foto + Dados -->
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

          <!-- Informações Principais -->
          <v-col cols="12" md="9">
            <v-sheet
              rounded="md"
              elevation="0"
              class="pa-2 bg-grey-lighten-4"
            >
              <!-- Matrícula / Turma -->
              <v-row dense class="mb-1">
                <v-col cols="12" sm="6" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Matrícula:</span>
                    <span class="text-body-2">{{ pessoa.matricula }}</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Turma:</span>
                    <span class="text-body-2">{{ pessoa.turma }}</span>
                  </div>
                </v-col>
              </v-row>

              <!-- Curso -->
              <v-row dense class="mb-1">
                <v-col cols="12" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Curso:</span>
                    <span class="text-body-2">{{ pessoa.curso }}</span>
                  </div>
                </v-col>
              </v-row>

              <!-- Endereço -->
              <v-row dense class="mb-1">
                <v-col cols="12" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Endereço:</span>
                    <span class="text-body-2">{{ pessoa.endereco }}, {{ pessoa.bairro }}</span>
                  </div>
                </v-col>
              </v-row>

              <!-- Cidade / CEP -->
              <v-row dense class="mb-1">
                <v-col cols="12" sm="8" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Cidade:</span>
                    <span class="text-body-2">{{ pessoa.cidade }} - {{ pessoa.estado }}</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="4" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">CEP:</span>
                    <span class="text-body-2">{{ pessoa.cep }}</span>
                  </div>
                </v-col>
              </v-row>

              <!-- Telefones -->
              <v-row dense class="mb-1">
                <v-col cols="12" sm="6" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Telefone:</span>
                    <span class="text-body-2">{{ pessoa.telefone }}</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Celular:</span>
                    <span class="text-body-2">{{ pessoa.celular }}</span>
                  </div>
                </v-col>
              </v-row>

              <!-- RG / CPF -->
              <v-row dense class="mb-1">
                <v-col cols="12" sm="6" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">RG:</span>
                    <span class="text-body-2">{{ pessoa.rg }}</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">CPF:</span>
                    <span class="text-body-2">{{ pessoa.cpf }}</span>
                  </div>
                </v-col>
              </v-row>

              <!-- Pais -->
              <v-row dense class="mb-1">
                <v-col cols="12" sm="6" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Mãe:</span>
                    <span class="text-body-2">{{ pessoa.mae }}</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Pai:</span>
                    <span class="text-body-2">{{ pessoa.pai }}</span>
                  </div>
                </v-col>
              </v-row>

              <!-- Empresa -->
              <v-row dense>
                <v-col cols="12" class="py-1">
                  <div class="d-flex align-center">
                    <span class="font-weight-medium text-senai-navy mr-2">Empresa:</span>
                    <span class="text-body-2">
                      {{ pessoa.empresa }} - Nascimento: 17/01/2007
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <v-divider class="my-3" />

        <!-- Seção de Ocorrências -->
        <div>
          <h3 class="text-subtitle-1 text-senai-navy font-weight-bold mb-2">
            Histórico de Ocorrências
          </h3>

          <!-- Lista de Ocorrências -->
          <div v-if="pessoa.ocorrencias && pessoa.ocorrencias.length > 0" class="mb-3">
            <v-card
              v-for="(ocorrencia, index) in pessoa.ocorrencias"
              :key="index"
              variant="outlined"
              class="mb-2 pa-2"
            >
              <div class="d-flex align-start">
                <v-icon color="senai-red" size="small" class="mr-2 mt-1">mdi-circle</v-icon>
                <div class="flex-grow-1">
                  <p class="text-body-2 mb-1">{{ ocorrencia }}</p>
                  <p class="text-caption text-medium-emphasis">
                    Registrado em: {{ new Date().toLocaleDateString('pt-BR') }}
                  </p>
                </div>
              </div>
            </v-card>
          </div>

          <!-- Mensagem quando não há ocorrências -->
          <div v-else class="text-center pa-4">
            <v-icon size="48" color="success" class="mb-2">mdi-check-circle</v-icon>
            <p class="text-body-2 text-medium-emphasis">
              Nenhuma ocorrência registrada para {{ pessoa.nome }}.
            </p>
          </div>

          <!-- Formulário Nova Ocorrência -->
          <v-card
            variant="tonal"
            color="senai-light-blue"
            class="pa-3"
            v-if="showAddForm"
          >
            <h4 class="text-subtitle-2 font-weight-bold mb-2">Registrar Nova Ocorrência</h4>
            <v-form ref="form" v-model="formValid" @submit.prevent="adicionarOcorrencia">
              <v-textarea
                v-model="novaOcorrencia"
                label="Descrição da Ocorrência"
                variant="outlined"
                rows="3"
                :rules="[v => !!v || 'Descrição é obrigatória']"
                class="mb-2"
              />
              <div class="d-flex ga-2">
                <v-btn color="senai-red" :disabled="!formValid" type="submit">
                  Registrar
                </v-btn>
                <v-btn variant="outlined" @click="cancelarRegistro">
                  Cancelar
                </v-btn>
              </div>
            </v-form>
          </v-card>
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
