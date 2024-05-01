<template>
  <div class="layout">
    <div id="nav">
      <NAV v-if="!isSetup"/>
    </div>

    <div id="content">
      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import NAV from './views/Nav_View.vue';
import road from './components/road/RoadTiles.vue';



const route = useRoute();

const isSetup = computed(() => route.name === 'setup');

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
