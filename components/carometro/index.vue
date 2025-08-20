<template>
  <v-container fluid>
    <!-- Grid Responsivo Moderno -->
    <v-row class="d-flex">
      <v-col
        v-for="pessoa in pessoas"
        :key="pessoa.nome"
        cols="12"
        sm="6"
        md="4"
        lg="2"
        xl="2"
        class="d-flex pa-1"
      >
        <v-card
          @click="abrirModal(pessoa)"
          hover
          rounded="xl"
          elevation="4"
          class="person-card flex-grow-1"
        >
          <!-- Avatar/Foto -->
          <div class="text-center pt-6 pb-2">
            <v-avatar size="80" class="elevation-4">
              <v-img :src="pessoa.foto" cover />
            </v-avatar>
          </div>

          <!-- Informações -->
          <v-card-title class="text-center text-h6 font-weight-bold text-senai-red px-4 pb-1">
            {{ pessoa.nome }}
          </v-card-title>

          <v-card-subtitle class="text-center text-body-2 text-medium-emphasis px-4 pb-2">
            {{ pessoa.cargo }}
          </v-card-subtitle>

          <!-- Badge de Status -->
          <div class="d-flex justify-center text-center pb-4 ">
            <v-chip
              size="small"
              color="success"
              variant="outlined"
            >
              <v-icon start size="small">mdi-check-circle</v-icon>
              Ativo
            </v-chip>
             <div class="ml-3 text-center">
                <div class="text-caption text-medium-emphasis">Matrícula</div>
                <div class="text-body-2 font-weight-medium">{{ pessoa.matricula }}</div>
              </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const emit = defineEmits(['selectPessoa'])

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
  },
  {
    nome: "Maria Silva",
    cargo: "Professora de Português",
    foto: "https://randomuser.me/api/portraits/women/25.jpg",
    matricula: "2025003",
    turma: "P1",
    curso: "Licenciatura em Letras",
    endereco: "Rua da Consolação, 800",
    bairro: "Consolação",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01302-000",
    telefone: "(11) 4444-5555",
    celular: "(11) 96666-7777",
    rg: "11.222.333-4",
    cpf: "111.222.333-44",
    mae: "Rosa Silva",
    pai: "José Silva",
    empresa: "SENAI",
    ocorrencias: [
      "Ministrou palestra em 15/02/2025",
      "Participou de formação continuada"
    ]
  },
  {
    nome: "João Santos",
    cargo: "Aluno",
    foto: "https://randomuser.me/api/portraits/men/35.jpg",
    matricula: "2025004",
    turma: "T1",
    curso: "Técnico em Informática",
    endereco: "Rua Augusta, 200",
    bairro: "Jardins",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01305-000",
    telefone: "(11) 5555-6666",
    celular: "(11) 95555-6666",
    rg: "22.333.444-5",
    cpf: "222.333.444-55",
    mae: "Ana Santos",
    pai: "Pedro Santos",
    empresa: "SENAI",
    ocorrencias: [
      "Excelente desempenho em projeto",
      "Participou de olimpíada de programação"
    ]
  }
])

const abrirModal = (pessoa) => {
  emit('selectPessoa', pessoa)
}
</script>

<style scoped>
.person-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.person-card:hover {
  transform: translateY(-8px);
  border-color: rgb(var(--v-theme-senai-red));
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}
</style>
