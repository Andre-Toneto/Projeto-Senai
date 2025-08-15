<template>
  <v-app-bar app color="blue lighten-1" dark>
    <v-toolbar-title class="text-h6">Segunda, 28 de Julho de 2025</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text v-for="item in menuItems" :key="item.text" class="text-white">
      {{ item.text }}
    </v-btn>
  </v-app-bar>
</template>

<script setup>
const menuItems = [
  { text: 'INTRANET SENAI/SP' },
  { text: 'PORTAL EDUCACIONAL' },
  { text: 'ART RH SAP' },
  { text: 'GED SENAI-SP' },
  { text: 'OUTLOOK' },
  { text: 'SGSET-SP' },
  { text: 'EMPREGRA+' }
]
</script>
