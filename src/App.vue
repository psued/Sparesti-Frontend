<template>
  <NAV />

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NAV from './views/Nav_View.vue';
</script>


<style scoped>

</style>
