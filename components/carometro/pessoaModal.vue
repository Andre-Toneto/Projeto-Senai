<template>
  <v-dialog v-model="isOpen" max-width="1000" persistent class="modern-dialog">
    <v-card class="modern-modal" elevation="24" rounded="xl">
      <!-- Header Moderno com Gradiente -->
      <div class="modal-header">
        <div class="header-gradient"></div>
        <div class="header-content">
          <div class="d-flex align-center">
            <v-avatar size="64" class="header-avatar elevation-8">
              <v-img :src="pessoa.foto" />
            </v-avatar>
            <div class="header-info ml-4">
              <h2 class="person-name">{{ pessoa.nome?.toUpperCase() }}</h2>
              <p class="person-role">{{ pessoa.cargo }}</p>
              <v-chip size="small" color="success" variant="elevated" class="mt-1">
                <v-icon start size="small">mdi-check-circle</v-icon>
                Ativo
              </v-chip>
            </div>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="white"
            size="large"
            @click="isOpen = false"
            class="close-btn"
          />
        </div>
      </div>

      <!-- Conteúdo Principal -->
      <v-card-text class="pa-6">
        <v-row>
          <!-- Foto Principal -->
          <v-col cols="12" md="3">
            <div class="photo-section">
              <v-img
                :src="pessoa.foto"
                height="240"
                width="180"
                class="main-photo"
                cover
              />
            </div>
          </v-col>

          <!-- Informações em Cards Modernos -->
          <v-col cols="12" md="9">
            <div class="info-cards-grid">
              <!-- Card Acadêmico -->
              <v-card class="info-card academic-card" elevation="4" rounded="xl">
                <v-card-text class="pa-4">
                  <div class="card-header">
                    <v-icon color="primary" size="24">mdi-school</v-icon>
                    <h4 class="card-title">Acadêmico</h4>
                  </div>
                  <div class="info-rows">
                    <div class="info-row">
                      <span class="label">Matrícula</span>
                      <span class="value">{{ pessoa.matricula }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Turma</span>
                      <span class="value">{{ pessoa.turma }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Curso</span>
                      <span class="value">{{ pessoa.curso }}</span>
                    </div>
                  </div>
                </v-card-text>
              </v-card>

              <!-- Card Pessoal -->
              <v-card class="info-card personal-card" elevation="4" rounded="xl">
                <v-card-text class="pa-4">
                  <div class="card-header">
                    <v-icon color="warning" size="24">mdi-account-circle</v-icon>
                    <h4 class="card-title">Pessoal</h4>
                  </div>
                  <div class="info-rows">
                    <div class="info-row">
                      <span class="label">RG</span>
                      <span class="value">{{ pessoa.rg }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">CPF</span>
                      <span class="value">{{ pessoa.cpf }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Nascimento</span>
                      <span class="value">17/01/2007</span>
                    </div>
                  </div>
                </v-card-text>
              </v-card>

              <!-- Card Contato -->
              <v-card class="info-card contact-card" elevation="4" rounded="xl">
                <v-card-text class="pa-4">
                  <div class="card-header">
                    <v-icon color="info" size="24">mdi-phone</v-icon>
                    <h4 class="card-title">Contato</h4>
                  </div>
                  <div class="info-rows">
                    <div class="info-row">
                      <span class="label">Telefone</span>
                      <span class="value">{{ pessoa.telefone }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Celular</span>
                      <span class="value">{{ pessoa.celular }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Endereço</span>
                      <span class="value">{{ pessoa.endereco }}, {{ pessoa.bairro }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Cidade</span>
                      <span class="value">{{ pessoa.cidade }} - {{ pessoa.estado }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">CEP</span>
                      <span class="value">{{ pessoa.cep }}</span>
                    </div>
                  </div>
                </v-card-text>
              </v-card>

              <!-- Card Filiação -->
              <v-card class="info-card family-card" elevation="4" rounded="xl">
                <v-card-text class="pa-4">
                  <div class="card-header">
                    <v-icon color="success" size="24">mdi-account-group</v-icon>
                    <h4 class="card-title">Filiação</h4>
                  </div>
                  <div class="info-rows">
                    <div class="info-row">
                      <span class="label">Mãe</span>
                      <span class="value">{{ pessoa.mae }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Pai</span>
                      <span class="value">{{ pessoa.pai }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Empresa</span>
                      <span class="value">{{ pessoa.empresa }}</span>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>

        <!-- Seção de Ocorrências -->
        <v-card class="occurrences-section mt-6" elevation="4" rounded="xl">
          <v-card-text class="pa-4">
            <div class="section-header">
              <h3 class="section-title">
                <v-icon color="senai-red" class="mr-2">mdi-history</v-icon>
                Histórico de Ocorrências
              </h3>
              <v-chip v-if="pessoa.ocorrencias?.length" size="small" color="senai-red" variant="outlined">
                {{ pessoa.ocorrencias.length }} registros
              </v-chip>
            </div>

            <!-- Container com Scroll Fixo (200px) -->
            <div class="occurrences-container">
              <div v-if="pessoa.ocorrencias && pessoa.ocorrencias.length > 0" class="occurrences-list">
                <v-card
                  v-for="(ocorrencia, index) in pessoa.ocorrencias"
                  :key="index"
                  class="occurrence-item"
                  variant="outlined"
                  rounded="lg"
                >
                  <v-card-text class="pa-3">
                    <div class="d-flex align-start">
                      <v-icon color="senai-red" size="12" class="mt-1 mr-2">mdi-circle</v-icon>
                      <div class="flex-grow-1">
                        <p class="occurrence-text">{{ ocorrencia }}</p>
                        <p class="occurrence-date">
                          <v-icon size="12" class="mr-1">mdi-calendar</v-icon>
                          {{ new Date().toLocaleDateString('pt-BR') }}
                        </p>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>

              <div v-else class="empty-state">
                <v-icon size="64" color="success" class="mb-3">mdi-check-circle-outline</v-icon>
                <h4 class="empty-title">Nenhuma ocorrência registrada</h4>
                <p class="empty-subtitle">{{ pessoa.nome }} não possui registros de ocorrências.</p>
              </div>
            </div>

            <!-- Formulário para Nova Ocorrência -->
            <v-expand-transition>
              <v-card v-if="showAddForm" class="add-form-card mt-4" elevation="2" rounded="lg">
                <v-card-text class="pa-4">
                  <h4 class="form-title mb-3">
                    <v-icon color="senai-red" class="mr-2">mdi-plus-circle</v-icon>
                    Nova Ocorrência
                  </h4>
                  <v-form ref="formRef" v-model="formValid" @submit.prevent="adicionarOcorrencia">
                    <v-textarea
                      v-model="novaOcorrencia"
                      label="Descrição da Ocorrência"
                      variant="outlined"
                      rows="3"
                      :rules="[v => !!v || 'Descrição é obrigatória']"
                      class="mb-4"
                      bg-color="surface"
                    />
                    <div class="form-actions">
                      <v-btn
                        color="senai-red"
                        :disabled="!formValid"
                        type="submit"
                        rounded="lg"
                        elevation="2"
                      >
                        <v-icon start>mdi-content-save</v-icon>
                        Registrar
                      </v-btn>
                      <v-btn
                        variant="outlined"
                        @click="cancelarRegistro"
                        rounded="lg"
                        class="ml-2"
                      >
                        Cancelar
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-card-text>

      <!-- Footer Moderno -->
      <v-card-actions class="footer-actions pa-6 pt-0">
        <v-btn
          variant="outlined"
          color="senai-navy"
          @click="isOpen = false"
          rounded="lg"
          size="large"
        >
          <v-icon start>mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
        <v-spacer />
        <v-btn
          :color="showAddForm ? 'grey' : 'senai-red'"
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
