<template>
  <v-app-bar app color="senai-navy" dark elevation="4" height="64">
    <!-- Logo Section -->
    <div class="toolbar-logo">
      <v-img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRTUzRTNFIi8+Cjx0ZXh0IHg9IjYwIiB5PSIyNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNFTkFJPC90ZXh0Pgo8L3N2Zz4="
        alt="SENAI"
        max-height="36"
        max-width="120"
        class="senai-toolbar-logo"
      />
    </div>

    <v-divider vertical class="mx-4 opacity-30" />

    <!-- Date Section -->
    <div class="toolbar-date">
      <v-icon size="small" class="mr-2">mdi-calendar</v-icon>
      <span class="date-text">{{ currentDate }}</span>
    </div>

    <v-spacer />

    <!-- Menu Items -->
    <div class="toolbar-menu d-none d-lg-flex">
      <v-btn
        v-for="item in menuItems"
        :key="item.text"
        :href="item.link"
        target="_blank"
        variant="text"
        size="small"
        class="menu-item"
      >
        <v-icon size="small" class="mr-1">{{ item.icon }}</v-icon>
        {{ item.text }}
      </v-btn>
    </div>

    <!-- Mobile Menu -->
    <v-menu class="d-flex d-lg-none">
      <template v-slot:activator="{ props }">
        <v-btn
          icon="mdi-dots-vertical"
          v-bind="props"
          variant="text"
        />
      </template>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.text"
          :href="item.link"
          target="_blank"
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
