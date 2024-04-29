<template>
  <div class="layout">
    <div id="nav">
      <NAV />
    </div>

    <div id="content">
      <RouterView/>
    </div>
    <FOOTER v-if="isPhone" class="footer-box"/>
    
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import NAV from "./views/Nav_View.vue";
import FOOTER from "./views/Footer_View.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
function toggleTheme() {
  toggleDark();
  document.body.classList.toggle("dark", isDark.value);
}
document.body.classList.toggle("dark", isDark.value);

const isPhone = ref(false);
let mql;

onMounted(() => {
  mql = window.matchMedia('(max-width: 480px)');
  isPhone.value = mql.matches;

  mql.addEventListener('change', (e) => {
    isPhone.value = e.matches;
  });
});
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
  overflow-y: hidden;
}
@media screen and (max-width: 480px) {
  .content{
    bottom: 90px
  }
}
</style>
