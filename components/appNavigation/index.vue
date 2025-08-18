<template>
  <v-navigation-drawer
    v-model="isNavigationVisible"
    app
    :permanent="!isMobile"
    :temporary="isMobile"
    :width="navigationWidth"
    :rail="isNavigationRail && !isMobile"
    color="surface"
    elevation="4"
    border="0"
  >
    <!-- Header -->
    <v-list-item class="pa-4">
      <template v-slot:prepend>
        <v-icon color="senai-navy" size="large">mdi-view-dashboard</v-icon>
      </template>
      <v-list-item-title
        v-if="!isNavigationRail || isMobile"
        class="text-h6 font-weight-medium"
      >
        Menu Principal
      </v-list-item-title>
      <template v-slot:append v-if="!isMobile">
        <v-btn
          @click="toggleNavigationRail"
          icon
          variant="text"
          size="small"
          color="senai-navy"
        >
          <v-icon>{{ isNavigationRail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
        </v-btn>
      </template>
    </v-list-item>

    <v-divider />

    <!-- Navigation Items -->
    <v-list density="comfortable" nav class="pa-2">
      <v-list-item
        v-for="item in navItems"
        :key="item.text"
        :to="`/${item.route}`"
        rounded="xl"
        class="mb-1"
      >
        <template v-slot:prepend>
          <v-icon :color="getIconColor(item.route)">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title class="font-weight-medium">{{ item.text }}</v-list-item-title>
        <template v-slot:append v-if="item.badge">
          <v-chip size="x-small" color="senai-red" text-color="white">
            {{ item.badge }}
          </v-chip>
        </template>
      </v-list-item>
    </v-list>

    <!-- Footer -->
    <template v-slot:append>
      <v-divider />
      <v-list-item
        prepend-icon="mdi-help-circle"
        title="Ajuda"
        subtitle="Suporte técnico"
        density="compact"
        @click="openHelp"
        class="pa-4"
      />
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const route = useRoute()
const { xs, mobile } = useDisplay()
const { isNavigationVisible, isNavigationRail, toggleNavigationRail } = useNavigation()

// Computed para detectar dispositivos móveis
const isMobile = computed(() => xs.value)

// Largura dinâmica baseada no estado
const navigationWidth = computed(() => {
  if (isNavigationRail.value && !isMobile.value) {
    return 72
  }
  return isMobile.value ? 280 : 280
})

const navItems = [
  { text: 'Carômetro', route: 'carometro/login', icon: 'mdi-account-group', badge: 'Novo' },
  { text: 'Planilha de Registros', route: 'registros', icon: 'mdi-table-large' },
  { text: 'Formulários', route: 'formularios', icon: 'mdi-form-select' },
  { text: 'Horário Escolar', route: 'horarios', icon: 'mdi-calendar-clock' },
  { text: 'Calendário Escolar', route: 'calendario', icon: 'mdi-calendar' },
  { text: 'Proposta Pedagógica', route: 'proposta', icon: 'mdi-book-open-variant' },
  { text: 'Plano Escolar', route: 'plano', icon: 'mdi-file-document-outline' },
  { text: 'Coordenação', route: 'coordenacao', icon: 'mdi-account-supervisor' },
  { text: 'Regimento SENAI', route: 'regimento', icon: 'mdi-gavel' },
  { text: 'Educacional Plano', route: 'educacional', icon: 'mdi-school' }
]

const getIconColor = (routeName) => {
  if (process.client && route && route.path) {
    return route.path.includes(routeName) ? 'senai-red' : 'senai-navy'
  }
  return 'senai-navy'
}

const openHelp = () => {
  console.log('Abrindo ajuda...')
}

// Fechar navegação automático em mobile quando navegar
watch(() => route.path, () => {
  if (isMobile.value && isNavigationVisible.value) {
    isNavigationVisible.value = false
  }
})
</script>
