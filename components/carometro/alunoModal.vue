<template>
  <v-dialog
    v-model="dialogModel"
    max-width="600"
    persistent
    scrollable
  >
    <v-card rounded="lg">
      <v-card-title class="pa-6 pb-0">
        <div class="d-flex justify-space-between align-center">
          <div>
            <h2 class="text-h5 text-senai-red font-weight-medium">
              {{ isEditing ? 'Editar Aluno' : 'Adicionar Novo Aluno' }}
            </h2>
            <p class="text-body-2 text-medium-emphasis mb-0">
              {{ isEditing ? 'Atualize os dados do aluno' : 'Preencha os dados do novo aluno' }}
            </p>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="fecharModal"
          />
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-form ref="form" v-model="valid" @submit.prevent="salvarAluno">
          <v-row>
            <!-- Upload de Foto -->
            <v-col cols="12" class="text-center">
              <div class="mb-4">
                <v-avatar
                  size="120"
                  class="elevation-4 mb-4"
                  @click="$refs.fileInput.click()"
                  style="cursor: pointer"
                >
                  <v-img
                    v-if="aluno.foto"
                    :src="aluno.foto"
                    cover
                  />
                  <v-icon
                    v-else
                    size="60"
                    color="grey-lighten-1"
                  >
                    mdi-camera-plus
                  </v-icon>
                </v-avatar>
                
                <div>
                  <v-btn
                    variant="outlined"
                    color="senai-red"
                    prepend-icon="mdi-camera"
                    @click="$refs.fileInput.click()"
                    :loading="uploadingPhoto"
                  >
                    {{ aluno.foto ? 'Trocar Foto' : 'Adicionar Foto' }}
                  </v-btn>
                </div>

                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="uploadFoto"
                />
              </div>
            </v-col>

            <!-- Dados Básicos -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.nome"
                label="Nome Completo *"
                variant="outlined"
                density="comfortable"
                :rules="nomeRules"
                prepend-inner-icon="mdi-account"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.matricula"
                label="Matrícula *"
                variant="outlined"
                density="comfortable"
                :rules="matriculaRules"
                prepend-inner-icon="mdi-identifier"
                :disabled="isEditing"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.cargo"
                label="Cargo/Função"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-briefcase"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.curso"
                label="Curso"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-school"
              />
            </v-col>

            <!-- Contato -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.telefone"
                label="Telefone"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-phone"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.celular"
                label="Celular"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-cellphone"
              />
            </v-col>

            <!-- Documentos -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.rg"
                label="RG"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-card-account-details"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.cpf"
                label="CPF"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-card-account-details-outline"
              />
            </v-col>

            <!-- Endereço -->
            <v-col cols="12">
              <v-text-field
                v-model="aluno.endereco"
                label="Endereço"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-map-marker"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="aluno.bairro"
                label="Bairro"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12" md="5">
              <v-text-field
                v-model="aluno.cidade"
                label="Cidade"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="aluno.estado"
                label="Estado"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="aluno.cep"
                label="CEP"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <!-- Filiação -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.mae"
                label="Nome da Mãe"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-account-heart"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="aluno.pai"
                label="Nome do Pai"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-account-tie"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn
          variant="outlined"
          @click="fecharModal"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="senai-red"
          :disabled="!valid"
          :loading="salvando"
          @click="salvarAluno"
        >
          {{ isEditing ? 'Atualizar' : 'Salvar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  alunoEditar: Object,
  turma: String
})

const emit = defineEmits(['update:modelValue', 'alunoSalvo'])

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const form = ref(null)
const valid = ref(false)
const salvando = ref(false)
const uploadingPhoto = ref(false)

const isEditing = computed(() => props.alunoEditar && props.alunoEditar.matricula)

const aluno = ref({
  nome: '',
  matricula: '',
  cargo: 'Aluno',
  curso: '',
  foto: '',
  telefone: '',
  celular: '',
  rg: '',
  cpf: '',
  endereco: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
  mae: '',
  pai: '',
  empresa: 'SENAI',
  ocorrencias: []
})

const nomeRules = [
  v => !!v || 'Nome é obrigatório',
  v => v.length >= 3 || 'Nome deve ter pelo menos 3 caracteres'
]

const matriculaRules = [
  v => !!v || 'Matrícula é obrigatória',
  v => v.length >= 3 || 'Matrícula deve ter pelo menos 3 caracteres'
]

const uploadFoto = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploadingPhoto.value = true

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch('/api/upload/image', {
      method: 'POST',
      body: formData
    })

    aluno.value.foto = response.imageUrl
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    alert('Erro ao fazer upload da imagem')
  } finally {
    uploadingPhoto.value = false
  }
}

const salvarAluno = async () => {
  if (!valid.value) return

  salvando.value = true

  try {
    const response = await $fetch('/api/alunos/save', {
      method: 'POST',
      body: {
        turma: props.turma,
        aluno: aluno.value
      }
    })

    emit('alunoSalvo', response.alunos)
    fecharModal()
  } catch (error) {
    console.error('Erro ao salvar aluno:', error)
    alert('Erro ao salvar aluno')
  } finally {
    salvando.value = false
  }
}

const fecharModal = () => {
  emit('update:modelValue', false)
  resetForm()
}

const resetForm = () => {
  aluno.value = {
    nome: '',
    matricula: '',
    cargo: 'Aluno',
    curso: '',
    foto: '',
    telefone: '',
    celular: '',
    rg: '',
    cpf: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    mae: '',
    pai: '',
    empresa: 'SENAI',
    ocorrencias: []
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.alunoEditar) {
    aluno.value = { ...props.alunoEditar }
  } else if (newVal) {
    resetForm()
  }
})
</script>
