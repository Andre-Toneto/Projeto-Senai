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
