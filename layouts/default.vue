<template>
  <v-app>
    <AppToolbar />
    <AppNavigation />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
