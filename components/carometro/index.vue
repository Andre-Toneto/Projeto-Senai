<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="pessoa in pessoas"
        :key="pessoa.nome"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          @click="abrirModal(pessoa)"
          hover
          rounded="lg"
          elevation="2"
          style="cursor: pointer"
        >
          <v-img :src="pessoa.foto" height="200" cover />
          <v-card-title class="text-h6 font-weight-medium text-senai-navy">
            {{ pessoa.nome }}
          </v-card-title>
          <v-card-subtitle class="text-body-2 text-medium-emphasis pb-3">
            {{ pessoa.cargo }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Carometro',
  emits: ['selectPessoa'],
  setup(props, { emit }) {
    const pessoas = ref([
      {
        nome: "Ana Souza",
        cargo: "Coordenadora Pedagógica",
        foto: "https://randomuser.me/api/portraits/women/10.jpg",
        matricula: "2025001",
        turma: "T1",
        curso: "Pedagogia",
        endereco: "Rua das Flores, 123",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01000-000",
        telefone: "(11) 3333-4444",
        celular: "(11) 98888-7777",
        rg: "12.345.678-9",
        cpf: "123.456.789-00",
        mae: "Maria Souza",
        pai: "João Souza",
        empresa: "SENAI",
        ocorrencias: [
          "Atraso no dia 12/03/2025",
          "Participou de evento interno em 20/05/2025",
          "Recebeu elogio por desempenho em 01/07/2025"
        ]
      },
      {
        nome: "Carlos Pereira",
        cargo: "Professor de Matemática",
        foto: "https://randomuser.me/api/portraits/men/12.jpg",
        matricula: "2025002",
        turma: "M2",
        curso: "Licenciatura em Matemática",
        endereco: "Av. Paulista, 500",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01310-000",
        telefone: "(11) 3555-6666",
        celular: "(11) 97777-8888",
        rg: "98.765.432-1",
        cpf: "987.654.321-00",
        mae: "Clara Pereira",
        pai: "Roberto Pereira",
        empresa: "SENAI",
        ocorrencias: [
          "Faltou em reunião dia 14/04/2025",
          "Entregou relatório pedagógico em 10/06/2025"
        ]
      }
    ])

    const abrirModal = (pessoa) => {
      emit('selectPessoa', pessoa)
    }

    return {
      pessoas,
      abrirModal
    }
  }
}
</script>
