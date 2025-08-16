<template>
  <v-navigation-drawer
    app
    permanent
    :width="navigationWidth"
    color="surface"
    elevation="4"
    border="0"
    class="navigation-drawer"
  >
    <!-- Header -->
    <div class="navigation-header">
      <v-icon color="senai-navy" size="large">mdi-view-dashboard</v-icon>
      <span class="header-title">Menu Principal</span>
    </div>

    <v-divider class="my-2" />

    <!-- Navigation Items -->
    <v-list density="comfortable" nav class="navigation-list">
      <v-list-item
        v-for="item in navItems"
        :key="item.text"
        :to="`/${item.route}`"
        :active="$route.path.includes(item.route)"
        rounded="xl"
        class="nav-item"
      >
        <template v-slot:prepend>
          <v-icon :color="getIconColor(item.route)">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title class="nav-text">{{ item.text }}</v-list-item-title>
        <template v-slot:append v-if="item.badge">
          <v-chip size="x-small" color="senai-red" text-color="white">
            {{ item.badge }}
          </v-chip>
        </template>
      </v-list-item>
    </v-list>

    <!-- Footer -->
    <template v-slot:append>
      <div class="navigation-footer">
        <v-divider class="mb-2" />
        <v-list-item
          prepend-icon="mdi-help-circle"
          title="Ajuda"
          subtitle="Suporte técnico"
          density="compact"
          @click="openHelp"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
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

const getIconColor = (routeName: string) => {
  if (process.client && route.path) {
    return route.path.includes(routeName) ? 'senai-red' : 'senai-navy'
  }
  return 'senai-navy'
}

const openHelp = () => {
  // Implementar modal de ajuda ou redirecionamento
  console.log('Abrindo ajuda...')
}

// Responsividade - fix hydration
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
</script>

<style scoped>
.navigation-drawer {
  border-right: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.navigation-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px 16px;
}

.header-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface));
}

.navigation-list {
  padding: 0 12px;
}

.nav-item {
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background: rgba(var(--v-theme-senai-navy), 0.04);
}

.nav-item.v-list-item--active {
  background: rgba(var(--v-theme-senai-red), 0.1);
  color: rgb(var(--v-theme-senai-red));
}

.nav-text {
  font-weight: 500;
  font-size: 0.9rem;
}

.navigation-footer {
  padding: 8px;
}

/* Responsividade */
@media (max-width: 960px) {
  .navigation-header {
    padding: 16px 12px 12px;
  }

  .header-title {
    font-size: 1rem;
  }

  .navigation-list {
    padding: 0 8px;
  }
}
</style>
