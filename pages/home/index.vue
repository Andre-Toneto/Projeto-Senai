<template>
  <div class="home-page">
    <!-- Welcome Section -->
    <v-card class="welcome-card mb-6" color="senai-navy" dark elevation="8">
      <v-card-text class="pa-6">
        <v-row align="center">
          <v-col cols="12" md="8">
            <h1 class="welcome-title mb-3">Bem-vindo ao Portal SENAI</h1>
            <p class="welcome-subtitle mb-0">
              Acesse todas as ferramentas educacionais em um só lugar
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="80" color="white" class="welcome-icon">mdi-school</v-icon>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Main Content Grid -->
    <v-row>
      <!-- Security Alert -->
      <v-col cols="12" lg="8">
        <v-card class="security-card" elevation="4" color="error" dark>
          <v-card-text class="pa-6">
            <div class="d-flex align-start">
              <v-icon size="48" class="mr-4 mt-1">mdi-shield-alert</v-icon>
              <div class="flex-grow-1">
                <h2 class="security-title mb-3">Proteja-se contra o Phishing</h2>
                <p class="security-text mb-4">
                  Mantenha-se seguro! Aprenda a identificar e evitar ataques de phishing
                  que podem comprometer seus dados pessoais e profissionais.
                </p>
                <v-btn
                  variant="outlined"
                  color="white"
                  size="large"
                  prepend-icon="mdi-open-in-new"
                >
                  Saiba Mais
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Quick Access Tools -->
      <v-col cols="12" lg="4">
        <v-row dense>
          <!-- Power BI -->
          <v-col cols="12" sm="6" lg="12">
            <v-card class="tool-card powerbi-card" elevation="4" @click="openPowerBI">
              <v-card-text class="pa-4 text-center">
                <v-icon size="40" color="warning" class="mb-2">mdi-chart-bar</v-icon>
                <h3 class="tool-title">Power BI</h3>
                <p class="tool-subtitle mb-0">Relatórios e Dashboards</p>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Educational Planning -->
          <v-col cols="12" sm="6" lg="12">
            <v-card class="tool-card planning-card" elevation="4" @click="openPlanning">
              <v-card-text class="pa-4 text-center">
                <v-icon size="40" color="info" class="mb-2">mdi-calendar-edit</v-icon>
                <h3 class="tool-title">Planejamento de Ensino</h3>
                <p class="tool-subtitle mb-0">Organização Pedagógica</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Additional Tools Section -->
    <v-row class="mt-4">
      <v-col cols="12">
        <h2 class="section-title mb-4">Ferramentas Principais</h2>
      </v-col>

      <v-col
        v-for="tool in mainTools"
        :key="tool.name"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="main-tool-card"
          elevation="2"
          hover
          @click="openTool(tool)"
        >
          <v-card-text class="pa-4 text-center">
            <v-icon :color="tool.color" size="36" class="mb-3">{{ tool.icon }}</v-icon>
            <h4 class="tool-name">{{ tool.name }}</h4>
            <p class="tool-description mb-0">{{ tool.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const mainTools = [
  {
    name: 'Carômetro',
    description: 'Gestão de alunos',
    icon: 'mdi-account-group',
    color: 'senai-red',
    route: '/carometro/login'
  },
  {
    name: 'Calendário',
    description: 'Cronograma escolar',
    icon: 'mdi-calendar',
    color: 'primary',
    route: '/calendario'
  },
  {
    name: 'Formulários',
    description: 'Documentos digitais',
    icon: 'mdi-form-select',
    color: 'success',
    route: '/formularios'
  },
  {
    name: 'Coordenação',
    description: 'Gestão administrativa',
    icon: 'mdi-account-supervisor',
    color: 'warning',
    route: '/coordenacao'
  }
]

const openPowerBI = () => {
  console.log('Abrindo Power BI...')
}

const openPlanning = () => {
  console.log('Abrindo Planejamento...')
}

const openTool = (tool) => {
  const router = useRouter()
  router.push(tool.route)
}
</script>

<style scoped>
.home-page {
  padding: 0;
}

.welcome-card {
  border-radius: 16px;
}

.welcome-title {
  font-weight: 600;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}

.welcome-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  opacity: 0.9;
}

.welcome-icon {
  opacity: 0.8;
}

.security-card {
  border-radius: 12px;
}

.security-title {
  font-weight: 600;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
}

.security-text {
  font-size: clamp(0.85rem, 2vw, 1rem);
  line-height: 1.6;
}

.tool-card {
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.powerbi-card {
  background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
}

.planning-card {
  background: linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%);
  color: white;
}

.tool-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.tool-subtitle {
  font-size: 0.85rem;
  opacity: 0.8;
}

.section-title {
  color: rgb(var(--v-theme-senai-navy));
  font-weight: 600;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
}

.main-tool-card {
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.main-tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-color: rgb(var(--v-theme-senai-red));
}

.tool-name {
  color: rgb(var(--v-theme-senai-navy));
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.tool-description {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  font-size: 0.85rem;
}

/* Responsividade */
@media (max-width: 960px) {
  .welcome-icon {
    margin-top: 1rem;
  }

  .security-card .d-flex {
    flex-direction: column;
    text-align: center;
  }

  .security-card .mr-4 {
    margin-right: 0 !important;
    margin-bottom: 1rem;
  }
}

@media (max-width: 600px) {
  .home-page {
    padding: 0 0.5rem;
  }

  .welcome-card .pa-6 {
    padding: 1.5rem !important;
  }

  .security-card .pa-6 {
    padding: 1.5rem !important;
  }
}
</style>
