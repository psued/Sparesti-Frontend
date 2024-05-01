<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <div class="layout">
    <div id="nav">
      <NAV @theme="handleThemeChange" />
    </div>

    <div id="content">
      <RouterView/>
    </div>
    
    <FOOTER v-if="isPhone" id="footer-box"/>

  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { RouterLink, RouterView } from "vue-router";
import NAV from "./views/Nav_View.vue";
import { onMounted, ref } from "vue";
import FOOTER from "./views/Footer_View.vue";



const isDark = useDark();
const toggleDark = useToggle(isDark);
const  emit  = defineEmits();
const handleThemeChange = () => {
  toggleDark();
  document.body.classList.toggle("dark", isDark.value);
};
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

#content {
  position: relative;
  top: 90px;
  overflow-y: hidden;
}

#footer-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}

@media screen and (max-width: 480px) {
  #content{
    padding-bottom: 60px
  }
}
</style>
