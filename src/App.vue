<template>
  <div class="layout">
    <div id="nav">
      <NAV />
    </div>

    <div id="content">
      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { RouterLink, RouterView } from 'vue-router'
import NAV from './views/Nav_View.vue';
import road from './components/road/RoadTiles.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
function toggleTheme() {
  toggleDark();
  document.body.classList.toggle("dark", isDark.value);
}
document.body.classList.toggle("dark", isDark.value);
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}

#nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

#content{
  position: relative;
  top: 90px;
}
</style>
