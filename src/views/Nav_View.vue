<template>
  <div class="top-bar" :class="darkMode ? 'top-bar-dark' : ''">
    <RouterLink class="logo" to="/">
      <img :src="darkMode ?  './logo_long_dark.png' : './logo_long.png'" alt="logo" class="logo" />
    </RouterLink>
    <div :class="['hamburger']">
      <div class="hamburger-box" @click="toggleSidebar()">
        <span :class="['hamburger-line', 'top', { 'hamburger-line-dark': darkMode }]"></span>
        <span :class="['hamburger-line', 'middle', { 'hamburger-line-dark': darkMode }]"></span>
        <span :class="['hamburger-line', 'bottom', { 'hamburger-line-dark': darkMode }]"></span>
      </div>
    </div>
    <Transition name="move">
      <sidebar :darkMode="darkMode" @theme="handleThemeChange" @bar="toggleSidebar" v-if="isSidebarOpen" />
    </Transition>
    <div class="phone-bar" v-if="isPhone" :class="{'phone-bar-dark' : darkMode}" >
      <RouterLink class="phone-bar-item" :class="{'phone-bar-item-dark': darkMode}" to="/">
        <i :class="darkMode ? 'icon-home-dark' : 'icon-home'"></i>
      </RouterLink>
      <RouterLink class="phone-bar-item" :class="{'phone-bar-item-dark': darkMode}" to="/challenges">
        <i :class="darkMode ? 'icon-challenges-dark' : 'icon-challenges'"></i>
      </RouterLink>
      <RouterLink class="phone-bar-item" :class="{'phone-bar-item-dark': darkMode}" to="/budget">
        <i :class="darkMode ? 'icon-budget-dark' : 'icon-budget'"></i>
      </RouterLink>
    </div>
  </div>
  <Transition name="fade">
    <div class="blur-screen" v-if="isSidebarOpen" @click="toggleSidebar" />
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue'
import { Transition } from 'vue'
import "@/assets/icons.css";
import sidebar from '../components/nav/Sidebar.vue'
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const darkMode = ref(prefersDarkMode);
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
  
  const openClass = darkMode.value ? '-open-dark' : '-open'
  const closeClass = darkMode.value ? '-close-dark' : '-close'
  
  if (isSidebarOpen.value) {
    top?.classList.add(`top${openClass}`)
    top?.classList.remove(`top${closeClass}`)
    middle?.classList.add(`middle${openClass}`)
    middle?.classList.remove(`middle${closeClass}`)
    bottom?.classList.add(`bottom${openClass}`)
    bottom?.classList.remove(`bottom${closeClass}`)
  } else {
    top?.classList.remove(`top${openClass}`)
    top?.classList.add(`top${closeClass}`)
    middle?.classList.remove(`middle${openClass}`)
    middle?.classList.add(`middle${closeClass}`)
    bottom?.classList.remove(`bottom${openClass}`)
    bottom?.classList.add(`bottom${closeClass}`)
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
.blur-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 997;
}
.top-bar{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background-color: #ecffda;
  border-bottom: 1px solid #4b644a;
  z-index: 998;
  overflow: hidden;
}
.top-bar-dark{
  background-color: #23244b;
  border-bottom: 1px solid #757bfd;
}
.logo {
  cursor: pointer;
  z-index: 999;
  position: relative;
  top: 5px;
  height: 100px;
  left: -30px;
}
.hamburger {
  cursor: pointer;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  top: 0;
  margin-top: 10px;
  right: 0;
  margin-right: 12px;
  height: 70px;
  width: 80px;
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
.lightOpen {
  background-color: #000000;
}
.darkOpen {
  background-color: #f0f0f0;
}
.top {
  top: 0;
  z-index: 1000;
}
.top-open {
  animation: top-open 0.35s forwards;
}
.top-open-dark{
  animation: top-open-dark 0.35s forwards;
}
.top-close {
  animation: top-close 0.35s forwards;
}
.top-close-dark{
  animation: top-close-dark 0.35s forwards;
}
@keyframes top-open-dark {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(18px) rotate(0);
  }
  100% {
    transform: translateY(18px) rotate(45deg);
  }
}
@keyframes top-open{
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(18px) rotate(0);
   
  }
  100% {
    transform: translateY(18px) rotate(45deg);
    background-color: black;
  }
}
@keyframes top-close {
  0% {
    transform: translateY(18px) rotate(45deg);
    background-color: black;
  }
  50% {
    transform: translateY(18px) rotate(0);
    background-color: black;
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}
@keyframes top-close-dark {
  0% {
    transform: translateY(18px) rotate(45deg);
  }
  50% {
    transform: translateY(18px) rotate(0);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}
.middle{
  z-index: 998;
}
.middle-open {
  animation: middle-open 0.35s forwards;
}
.middle-open-dark{
  animation: middle-open-dark 0.35s forwards;
}
.middle-close{
  animation: middle-close 0.35s forwards;
}
.middle-close-dark {
  animation: middle-close-dark 0.35s forwards;
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
@keyframes middle-open-dark {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
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
  40% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes middle-close-dark {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 0;
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
.bottom-open-dark {
  animation: bottom-open-dark 0.35s forwards;
}
.bottom-close{
  animation: bottom-close 0.35s forwards;
}
.bottom-close-dark {
  animation: bottom-close-dark 0.35s forwards;
}
@keyframes bottom-open-dark {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-18px) rotate(0);;
  }
  100% {
    transform: translateY(-18px) rotate(-45deg);
  }
}
@keyframes bottom-open {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-18px) rotate(0);;
  }
  100% {
    transform: translateY(-18px) rotate(-45deg);
    background-color: black;
  }
}
@keyframes bottom-close {
  0% {
    transform: translateY(-18px) rotate(-45deg);
    background-color: black;
  }
  50% {
    transform: translateY(-18px) rotate(0);
    background-color: black;
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}
@keyframes bottom-close-dark {
  0% {
    transform: translateY(-18px) rotate(-45deg);
  }
  50% {
    transform: translateY(-18px) rotate(0);
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .35s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}


.phone-bar {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #ecffda;
  border-top: 2px solid #4b644a;
  z-index: 998;
}
.phone-bar-dark {
  background-color: #23244b;
  border-top: 2px solid #757bfd;
}

.phone-bar-item{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.phone-bar-item:hover{
  background-color: #a6cd94;
}
.phone-bar-item-dark:hover{
  background-color: #757bfd;
}

</style>let
