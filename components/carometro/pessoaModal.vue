<template>
  <v-dialog v-model="isOpen" max-width="800" persistent>
    <v-card rounded="lg">
      <v-card-title class="pa-6 pb-0">
        <div class="d-flex align-center">
          <v-avatar size="64" class="mr-4">
            <v-img :src="pessoa.foto" />
          </v-avatar>
          <div>
            <h2 class="text-h5 text-senai-navy font-weight-medium">{{ pessoa.nome }}</h2>
            <p class="text-body-1 text-medium-emphasis mb-0">{{ pessoa.cargo }}</p>
          </div>
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12" md="6">
            <h3 class="text-h6 text-senai-navy mb-3">Dados Pessoais</h3>
            <v-list density="compact" class="bg-transparent">
              <v-list-item v-for="(valor, chave) in dadosPessoais" :key="chave">
                <v-list-item-title class="d-flex">
                  <span class="font-weight-medium mr-2 text-capitalize">{{ formatarChave(chave) }}:</span>
                  <span>{{ valor }}</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="6">
            <h3 class="text-h6 text-senai-navy mb-3">Dados Acadêmicos</h3>
            <v-list density="compact" class="bg-transparent">
              <v-list-item v-for="(valor, chave) in dadosAcademicos" :key="chave">
                <v-list-item-title class="d-flex">
                  <span class="font-weight-medium mr-2 text-capitalize">{{ formatarChave(chave) }}:</span>
                  <span>{{ valor }}</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-divider class="my-6" />

        <h3 class="text-h6 text-senai-navy mb-3">Histórico de Ocorrências</h3>
        <v-list density="comfortable" class="bg-transparent">
          <v-list-item
            v-for="(ocorrencia, index) in pessoa.ocorrencias"
            :key="index"
            class="px-0"
          >
            <template v-slot:prepend>
              <v-icon color="senai-red" size="small">mdi-circle</v-icon>
            </template>
            <v-list-item-title>{{ ocorrencia }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <v-btn
          color="senai-navy"
          variant="outlined"
          @click="isOpen = false"
          size="large"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'CarometroPessoaModal',
  props: {
    modelValue: { type: Boolean, required: true },
    pessoa: { type: Object, default: () => ({}) }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })

    const dadosPessoais = computed(() => {
      const { rg, cpf, telefone, celular, endereco, bairro, cidade, estado, cep, mae, pai } = props.pessoa
      return { rg, cpf, telefone, celular, endereco, bairro, cidade, estado, cep, mae, pai }
    })

    const dadosAcademicos = computed(() => {
      const { matricula, turma, curso, empresa } = props.pessoa
      return { matricula, turma, curso, empresa }
    })

    const formatarChave = (chave) => {
      const mapeamento = {
        rg: 'RG',
        cpf: 'CPF',
        cep: 'CEP',
        mae: 'Mãe',
        pai: 'Pai'
      }
      return mapeamento[chave] || chave
    }

    return {
      isOpen,
      dadosPessoais,
      dadosAcademicos,
      formatarChave
    }
  }
}
</script>
