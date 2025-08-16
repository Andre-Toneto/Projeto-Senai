<template>
  <v-navigation-drawer
    app
    permanent
    :width="navigationWidth"
    color="surface"
    elevation="4"
    border="0"
  >
    <!-- Header -->
    <v-list-item class="pa-4">
      <template v-slot:prepend>
        <v-icon color="senai-navy" size="large">mdi-view-dashboard</v-icon>
      </template>
      <v-list-item-title class="text-h6 font-weight-medium">Menu Principal</v-list-item-title>
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

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AppNavigation',
  setup() {
    const route = useRoute()
    const navigationWidth = ref(280)

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

    onMounted(() => {
      const updateWidth = () => {
        if (process.client) {
          navigationWidth.value = window.innerWidth < 960 ? 260 : 280
        }
      }

      updateWidth()
      window.addEventListener('resize', updateWidth)

      onUnmounted(() => {
        window.removeEventListener('resize', updateWidth)
      })
    })

    return {
      navigationWidth,
      navItems,
      getIconColor,
      openHelp
    }
  }
}
</script>
