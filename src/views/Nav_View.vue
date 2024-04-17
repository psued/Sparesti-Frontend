<template>
    <div class="top-bar" :class="darkMode ? '' : 'top-bar-dark'" />
    <RouterLink class="logo" to="/">
      <img :src="darkMode ? './logo_long.png' : './logo_long_dark.png'" alt="logo" class="logo" />
    </RouterLink>
    <div :class="['hamburger']">
      <div class="hamburger-box" @click="toggleSidebar()">
        <span :class="['hamburger-line', 'top', { 'hamburger-line-dark': !darkMode }]"></span>
        <span :class="['hamburger-line', 'middle', { 'hamburger-line-dark': !darkMode }]"></span>
        <span :class="['hamburger-line', 'bottom', { 'hamburger-line-dark': !darkMode }]"></span>
      </div>
    </div>
    <Transition name="move">
      <sidebar @theme="handleThemeChange" v-if="isSidebarOpen"/>
    </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue'
import { Transition } from 'vue'
import "@/assets/icons.css";
import sidebar from '../components/nav/Sidebar.vue'
const darkMode = ref(false)
const isSidebarOpen = ref(false)
const isPhone = ref(window.matchMedia('(max-width: 480px)').matches)

onMounted(() => {
  window.matchMedia('(max-width: 480px)').addEventListener('change', (e) => {
    if(isSidebarOpen.value) {
      toggleSidebar();
    }
    isPhone.value = e.matches
  })
});

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  const top = document.querySelector('.top')
  const middle = document.querySelector('.middle')
  const bottom = document.querySelector('.bottom')
  if (isSidebarOpen.value) {
    top?.classList.remove('top-close')
    top?.classList.add('top-open')
    middle?.classList.remove('middle-close')
    middle?.classList.add('middle-open')
    bottom?.classList.remove('bottom-close')
    bottom?.classList.add('bottom-open');
  } else {
    top?.classList.remove('top-open')
    top?.classList.add('top-close')
    middle?.classList.remove('middle-open')
    middle?.classList.add('middle-close')
    bottom?.classList.remove('bottom-open')
    bottom?.classList.add('bottom-close');
  }
}


const handleThemeChange = () => {
  darkMode.value = !darkMode.value
  if(isSidebarOpen.value) {
    toggleSidebar();
  }
};

</script>

<style scoped>
.top-bar{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background-color: #4b644a;
  z-index: 998;
}
.top-bar-dark{
  background-color: #23244b;
}
.logo {
  cursor: pointer;
  z-index: 999;
  position: fixed;
  top: 20px;
  height: 120px;
  left: -80px;
}
.hamburger {
  cursor: pointer;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  top: 0;
  margin-top: 15px;
  right: 0;
  margin-right: 10px;
  height: 90px;
  width: 90px;
  background-color: transparent;
  border-radius: 100px;
}

.hamburger-dark {
  background-color: #f0f0f0;
}

.hamburger-box {
  height: 60%;
  width: 65%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger-line {
  position: absolute;
  border-radius: 20px;
  height: 6px;
  width: 100%;
  background-color: #a6cd94;
}
.hamburger-line-dark {
  background-color: #757bfd;
}

.top {
  top: 0;
  z-index: 1000;
}
.top-open {
  animation: top-open 0.35s forwards;
}
.top-close {
  animation: top-close 0.35s forwards;
}
@keyframes top-open {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(24px) rotate(0);
  }
  100% {
    transform: translateY(24px) rotate(45deg);
    background-color: black;
  }
}
@keyframes top-close {
  0% {
    transform: translateY(24px) rotate(45deg);
    background-color: black;
  }
  50% {
    transform: translateY(24px) rotate(0);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}

.middle{
  z-index: 999;
}
.middle-open {
  animation: middle-open 0.35s forwards;
}
.middle-close {
  animation: middle-close 0.35s forwards;
}
@keyframes middle-open {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
    background-color: black;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes middle-close {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
    background-color: black;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.bottom {
  z-index: 1000;
  bottom: 0;
}
.bottom-open {
  animation: bottom-open 0.35s forwards;
}
.bottom-close{
  animation: bottom-close 0.35s forwards;
}
@keyframes bottom-open {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-24px) rotate(0);;
  }
  100% {
    transform: translateY(-24px) rotate(-45deg);
    background-color: black;
  }
}
@keyframes bottom-close {
  0% {
    transform: translateY(-24px) rotate(-45deg);
    background-color: black;
  }
  50% {
    transform: translateY(-24px) rotate(0);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}

.move-enter-active, .move-leave-active {
  transition: transform .35s;
}
.move-enter-from, .move-leave-to {
  transform: translateX(100%);
}
.move-enter-to, .move-leave-from {
  transform: translateX(0);
}


</style>let
