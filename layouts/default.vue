<template>
  <v-app>
    <AppToolbar />
    <AppNavigation />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

</script>
