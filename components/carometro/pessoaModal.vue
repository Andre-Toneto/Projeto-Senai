<template>
  <v-dialog v-model="isOpen" max-width="1000" persistent>
    <v-card elevation="24" rounded="xl" color="surface">
      <!-- Header com gradiente -->
      <v-sheet
        class="d-flex align-center justify-space-between pa-2"
        rounded="t-xl"
        color="senai-navy"
      >
        <div class="d-flex align-center">
          <v-avatar size="64" class="elevation-8" color="white">
            <v-img :src="pessoa.foto" />
          </v-avatar>
          <div class="ml-4">
            <div class="d-flex align-center">
              <h2 class="text-h5 font-weight-bold text-white mr-3">{{ pessoa.nome?.toUpperCase() }}</h2>
              <v-chip size="small" color="success" variant="elevated">
                <v-icon start size="small">mdi-check-circle</v-icon>
                Ativo
              </v-chip>
            </div>
            <p class="text-body-2 text-white">{{ pessoa.cargo }}</p>
          </div>
        </div>
        <v-btn icon="mdi-close" variant="text" color="white" size="large" @click="isOpen = false" />
      </v-sheet>

      <!-- Conteúdo -->
      <v-card-text class="pa-6">
        <v-row>

          <!-- Cards -->
          <v-col cols="12">
            <v-row dense>
              <!-- foto -->
              <v-col cols="12" md="3" class="d-flex justify-center">
                <v-img :src="pessoa.foto" height="240" width="180" rounded="lg" cover class="elevation-6" />
              </v-col>
              <!-- Acadêmico -->
              <v-col cols="12" sm="3">
                <v-card elevation="4" rounded="xl" variant="tonal">
                  <v-card-text>
                    <div class="d-flex align-center mb-2">
                      <v-icon color="primary" class="mr-2">mdi-school</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">Acadêmico</span>
                    </div>
                    <v-divider class="mb-2" />
                    <v-list class="flex" density="compact">
                      <v-list-item title="Matrícula" :subtitle="pessoa.matricula" />
                      <v-list-item title="Turma" :subtitle="pessoa.turma" />
                      <v-list-item title="Curso" :subtitle="pessoa.curso" />
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Pessoal -->
              <v-col cols="12" sm="3">
                <v-card elevation="4" rounded="xl" variant="tonal">
                  <v-card-text>
                    <div class="d-flex align-center mb-2">
                      <v-icon color="warning" class="mr-2">mdi-account-circle</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">Pessoal</span>
                    </div>
                    <v-divider class="mb-2" />
                    <v-list density="compact">
                      <v-list-item title="RG" :subtitle="pessoa.rg" />
                      <v-list-item title="CPF" :subtitle="pessoa.cpf" />
                      <v-list-item title="Nascimento" subtitle="17/01/2007" />
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Filiação -->
              <v-col cols="12" sm="3">
                <v-card elevation="4" rounded="xl" variant="tonal">
                  <v-card-text>
                    <div class="d-flex align-center mb-2">
                      <v-icon color="success" class="mr-2">mdi-account-group</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">Filiação</span>
                    </div>
                    <v-divider class="mb-2" />
                    <v-list density="compact">
                      <v-list-item title="Mãe" :subtitle="pessoa.mae" />
                      <v-list-item title="Pai" :subtitle="pessoa.pai" />
                      <v-list-item title="Empresa" :subtitle="pessoa.empresa" />
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Contato -->
              <v-col cols="12" sm="4">
                <v-card elevation="4" rounded="xl" variant="tonal">
                  <v-card-text>
                    <div class="d-flex align-center mb-2">
                      <v-icon color="info" class="mr-2">mdi-phone</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">Contato</span>
                    </div>
                    <v-divider class="mb-2" />
                    <v-list density="compact">
                      <v-list-item title="Telefone" :subtitle="pessoa.telefone" />
                      <v-list-item title="Celular" :subtitle="pessoa.celular" />
                      <v-list-item title="Endereço" :subtitle="pessoa.endereco + ', ' + pessoa.bairro" />
                      <v-list-item title="Cidade" :subtitle="pessoa.cidade + ' - ' + pessoa.estado" />
                      <v-list-item title="CEP" :subtitle="pessoa.cep" />
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>

              
                <!-- Ocorrências -->
              <v-col cols="12" sm="8">
                <v-card  elevation="4" rounded="xl" variant="tonal">
                  <v-card-text>
                    <div class="d-flex justify-space-between align-center mb-3">
                      <div class="d-flex align-center">
                        <v-icon color="error" class="mr-2">mdi-history</v-icon>
                        <h3 class="text-subtitle-1 font-weight-medium">Histórico de Ocorrências</h3>
                      </div>
                      <v-chip v-if="pessoa.ocorrencias?.length" size="small" color="error" variant="outlined">
                        {{ pessoa.ocorrencias.length }} registros
                      </v-chip>
                    </div>

                    <!-- Lista com scroll fixo -->
                    <v-sheet height="263" rounded="lg" border class="pa-2 overflow-y-auto">
                      <template v-if="pessoa.ocorrencias && pessoa.ocorrencias.length">
                        <v-card
                          v-for="(ocorrencia, index) in pessoa.ocorrencias"
                          :key="index"
                          class="mb-2"
                          variant="outlined"
                          rounded="lg"
                        >
                          <v-card-text class="pa-3">
                            <div class="d-flex">
                              <v-icon color="error" size="12" class="mt-1 mr-2">mdi-circle</v-icon>
                              <div>
                                <p class="text-body-2">{{ ocorrencia }}</p>
                                <p class="text-caption d-flex align-center">
                                  <v-icon size="12" class="mr-1">mdi-calendar</v-icon>
                                  {{ new Date().toLocaleDateString('pt-BR') }}
                                </p>
                              </div>
                            </div>
                          </v-card-text>
                        </v-card>
                      </template>
                      <template v-else>
                        <div class="text-center pa-6">
                          <v-icon size="64" color="success" class="mb-2">mdi-check-circle-outline</v-icon>
                          <h4 class="text-subtitle-1 font-weight-medium">Nenhuma ocorrência registrada</h4>
                          <p class="text-body-2">{{ pessoa.nome }} não possui registros de ocorrências.</p>
                        </div>
                      </template>
                    </v-sheet>

                    <!-- Formulário para Nova Ocorrência (re-adicionado) -->
                    <!-- <v-expand-transition>
                      <v-card v-if="showAddForm" class="mt-4" elevation="2" rounded="lg" variant="tonal">
                        <v-card-text>
                          <div class="d-flex align-center mb-3">
                            <v-icon color="error" class="mr-2">mdi-plus-circle</v-icon>
                            <h4 class="text-subtitle-1 font-weight-medium">Nova Ocorrência</h4>
                          </div>

                          <v-form ref="formRef" v-model="formValid" @submit.prevent="adicionarOcorrencia">
                            <v-textarea
                              v-model="novaOcorrencia"
                              label="Descrição da Ocorrência"
                              variant="outlined"
                              rows="3"
                              :rules="[required]"
                              class="mb-4"
                            />

                            <div class="d-flex align-center">
                              <v-btn
                                color="error"
                                :disabled="!formValid"
                                type="submit"
                                rounded="lg"
                                elevation="2"
                              >
                                <v-icon start>mdi-content-save</v-icon>
                                Registrar
                              </v-btn>

                              <v-btn class="ml-2" variant="outlined" rounded="lg" @click="cancelarRegistro">
                                Cancelar
                              </v-btn>
                            </div>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-expand-transition> -->
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="12">
                <v-expand-transition>
                      <v-card v-if="showAddForm" class="mt-4" elevation="2" rounded="lg" variant="tonal">
                        <v-card-text>
                          <div class="d-flex align-center mb-3">
                            <v-icon color="error" class="mr-2">mdi-plus-circle</v-icon>
                            <h4 class="text-subtitle-1 font-weight-medium">Nova Ocorrência</h4>
                          </div>

                          <v-form ref="formRef" v-model="formValid" @submit.prevent="adicionarOcorrencia">
                            <v-textarea
                              v-model="novaOcorrencia"
                              label="Descrição da Ocorrência"
                              variant="outlined"
                              rows="3"
                              :rules="[required]"
                              class="mb-4"
                            />

                            <div class="d-flex align-center">
                              <v-btn
                                color="error"
                                :disabled="!formValid"
                                type="submit"
                                rounded="lg"
                                elevation="2"
                              >
                                <v-icon start>mdi-content-save</v-icon>
                                Registrar
                              </v-btn>

                              <v-btn class="ml-2" variant="outlined" rounded="lg" @click="cancelarRegistro">
                                Cancelar
                              </v-btn>
                            </div>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-expand-transition>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Footer -->
      <v-card-actions class="pa-6 pt-0">
        <v-btn variant="outlined" color="primary" @click="isOpen = false" rounded="lg" size="large">
          <v-icon start>mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
        <v-spacer />
        <v-btn
          :color="showAddForm ? 'grey' : 'error'"
          @click="toggleAddForm"
          :variant="showAddForm ? 'outlined' : 'elevated'"
          rounded="lg"
          size="large"
          elevation="2"
        >
          <v-icon start>{{ showAddForm ? 'mdi-close' : 'mdi-plus' }}</v-icon>
          {{ showAddForm ? 'Cancelar' : 'Registrar Ocorrência' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

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
const formRef = ref()
const formValid = ref(false)
const novaOcorrencia = ref('')

const required = (v) => !!(v && String(v).trim()) || 'Descrição é obrigatória'

const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value
  if (!showAddForm.value) {
    novaOcorrencia.value = ''
    formRef.value?.reset()
    formRef.value?.resetValidation?.()
  }
}

const cancelarRegistro = () => {
  showAddForm.value = false
  novaOcorrencia.value = ''
  formRef.value?.reset()
  formRef.value?.resetValidation?.()
}

const adicionarOcorrencia = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  if (!props.pessoa.ocorrencias) props.pessoa.ocorrencias = []
  props.pessoa.ocorrencias.unshift(novaOcorrencia.value.trim())

  // limpar e fechar form
  novaOcorrencia.value = ''
  formRef.value?.resetValidation?.()
  showAddForm.value = false
}
</script>
