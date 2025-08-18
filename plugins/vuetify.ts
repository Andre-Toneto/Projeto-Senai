// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import '~/assets/css/main.css'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'senaiTheme',
      themes: {
        senaiTheme: {
          dark: false,
          colors: {
            primary: '#1e3a8a', // Navy Blue
            secondary: '#e53e3e', // SENAI Red
            accent: '#f59e0b', // Amber
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6',
            success: '#10b981',
            surface: '#ffffff',
            background: '#f8fafc',
            'on-surface': '#1f2937',
            'on-primary': '#ffffff',
            'on-secondary': '#ffffff',
            'senai-navy': '#1e3a8a',
            'senai-red': '#e53e3e',
            'senai-light-blue': '#dbeafe',
            'senai-gray': '#f1f5f9'
          }
        }
      }
    },
    defaults: {
      global: {
        ripple: false
      }
    }
  })
  app.vueApp.use(vuetify)
})
