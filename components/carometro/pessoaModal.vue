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
/* Modal Moderno */
.modern-dialog :deep(.v-overlay__content) {
  margin: 24px;
}

.modern-modal {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Header com Gradiente */
.modal-header {
  position: relative;
  padding: 0;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
}

.header-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #6366f1 100%);
}

.header-content {
  position: relative;
  z-index: 2;
  padding: 24px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.header-info {
  flex-grow: 1;
}

.person-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.person-role {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.close-btn {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
}

/* Seção da Foto */
.photo-section {
  text-align: center;
}

.main-photo {
  border-radius: 16px;
  border: 4px solid rgba(var(--v-theme-senai-navy), 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
}

/* Cards de Informação */
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.info-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.06);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 8px;
  color: rgb(var(--v-theme-senai-navy));
}

.info-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: rgb(var(--v-theme-senai-navy));
  font-size: 0.875rem;
  min-width: 80px;
}

.value {
  color: #374151;
  font-size: 0.875rem;
  text-align: right;
  flex-grow: 1;
  margin-left: 8px;
}

/* Seção de Ocorrências */
.occurrences-section {
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-senai-navy));
  display: flex;
  align-items: center;
}

/* Container com Scroll Fixo */
.occurrences-container {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: #fafafa;
}

/* Scrollbar customizada */
.occurrences-container::-webkit-scrollbar {
  width: 6px;
}

.occurrences-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.occurrences-container::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-senai-red));
  border-radius: 3px;
}

.occurrences-container::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--v-theme-senai-navy));
}

.occurrences-list {
  padding: 8px;
}

.occurrence-item {
  margin-bottom: 8px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.occurrence-item:last-child {
  margin-bottom: 0;
}

.occurrence-text {
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 4px;
  color: #374151;
}

.occurrence-date {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  display: flex;
  align-items: center;
}

/* Estado Vazio */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.empty-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: rgb(var(--v-theme-senai-navy));
}

.empty-subtitle {
  font-size: 0.875rem;
  margin: 0;
}

/* Formulário */
.add-form-card {
  background: linear-gradient(145deg, #ffffff 0%, #f0f9ff 100%);
  border: 2px solid rgba(var(--v-theme-senai-red), 0.1);
}

.form-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(var(--v-theme-senai-navy));
  display: flex;
  align-items: center;
}

.form-actions {
  display: flex;
  align-items: center;
}

/* Footer */
.footer-actions {
  background: linear-gradient(145deg, #f8fafc 0%, #ffffff 100%);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

/* Responsividade */
@media (max-width: 768px) {
  .info-cards-grid {
    grid-template-columns: 1fr;
  }

  .header-content {
    padding: 16px;
  }

  .person-name {
    font-size: 1.25rem;
  }

  .main-photo {
    width: 140px;
    height: 180px;
  }

  .occurrences-container {
    max-height: 150px;
  }
}

@media (max-width: 480px) {
  .info-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .value {
    text-align: left;
    margin-left: 0;
    margin-top: 2px;
  }

  .form-actions {
    flex-direction: column;
    gap: 8px;
  }

  .form-actions .v-btn {
    width: 100%;
  }
}
</style>
