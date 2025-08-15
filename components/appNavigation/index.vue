<template>
  <v-navigation-drawer app permanent color="blue lighten-4">
    <v-list>
      <v-list-item v-for="item in navItems" :key="item.text" @click="router.push(`/${item.route}`)"  >
          {{ item.text }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>

const router = useRouter()

const navItems = [
  { text: 'Carômetro', route: 'carometro' },
  { text: 'Planilha de Registros' , route: 'carometro' },
  { text: 'Formulários' , route: 'carometro' },
  { text: 'Horário Escolar' , route: 'carometro' },
  { text: 'Calendário Escolar' , route: 'carometro' },
  { text: 'Proposta Pedagógica' , route: 'carometro' },
  { text: 'Plano Escolar' , route: 'carometro' },
  { text: 'Coordenação' , route: 'carometro' },
  { text: 'Regimento SENAI' , route: 'carometro' },
  { text: 'Educacional Plano' , route: 'carometro' }
]
</script>
