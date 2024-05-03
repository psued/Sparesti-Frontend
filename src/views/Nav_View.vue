/** * @file Nav_View.vue * @description This file contains the implementation of
the navigation view component. * The component includes a top bar with a logo, a
hamburger menu, and a sidebar. * It also includes a phone bar for mobile
devices. * The component handles dark mode and theme changes. */
<template>
  <!-- Top bar -->
  <div class="top-bar" :class="darkMode ? 'top-bar-dark' : ''">
    <div v-if="loginStreak != 0" class="login-streak">
      <span class="fire-emoji">🔥</span> {{ loginStreak }}
    </div>
    <RouterLink class="logo" to="/">
      <img
        :src="darkMode ? '/logo_long_dark.png' : '/logo_long.png'"
        alt="logo"
        class="logo"
      />
    </RouterLink>
  </div>
  <div class="progress-container">
    <!-- Progress bar -->
    <p v-if="savingGoalPresent" class="numeric-progress">
      {{ savedAmount }}kr/{{ targetAmount }}kr
    </p>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressWidth }"></div>
    </div>
  </div>

  <!-- Hamburger menu -->
  <div :class="['hamburger', { darkMode: 'hamburger-dark' }]">
    <div class="hamburger-box" @click="toggleSidebar()">
      <span
        :class="['hamburger-line', 'top', { 'hamburger-line-dark': darkMode }]"
      ></span>
      <span
        :class="[
          'hamburger-line',
          'middle',
          { 'hamburger-line-dark': darkMode },
        ]"
      ></span>
      <span
        :class="[
          'hamburger-line',
          'bottom',
          { 'hamburger-line-dark': darkMode },
        ]"
      ></span>
    </div>
  </div>

  <!-- Sidebar -->
  <Transition name="move">
    <sidebar
      :darkMode="darkMode"
      @theme="handleThemeChange"
      @bar="toggleSidebar"
      v-if="isSidebarOpen"
    />
  </Transition>

  <!-- Blur screen -->
  <Transition name="fade">
    <div class="blur-screen" v-if="isSidebarOpen" @click="toggleSidebar" />
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, computed, watch, watchEffect } from "vue";
import { useDark } from "@vueuse/core";
import { Transition } from "vue";
import "@/assets/icons.css";
import sidebar from "../components/nav/Sidebar.vue";
import { useUserStore } from "@/stores/userStore";
import {
  getCurrentSavingGoal,
  savingGoalListener,
} from "@/api/savingGoalHooks";
import { getLoginStreak } from "@/api/userHooks";

// Progress bar
const savedAmount = ref(0);
const targetAmount = ref(1);
const savingGoalPresent = ref(false);
const progress = computed(() => {
  if (savedAmount.value >= targetAmount.value) {
    return 100;
  }
  return Math.round((savedAmount.value / targetAmount.value) * 100);
});
const progressWidth = computed(() => {
  return `${progress.value}%`;
});
const userStore = useUserStore();
const loginStreak = ref(1);

async function fetchSavingProgress() {
  if (!userStore.isLoggedIn()) {
    return;
  }
  try {
    const res = await getCurrentSavingGoal();
    if (!res) {
      return;
    }
    savingGoalPresent.value = true;
    targetAmount.value = res.targetAmount;
    savedAmount.value =
      res.savedAmount >= res.targetAmount ? res.targetAmount : res.savedAmount;
  } catch (error) {
    return;
  }
}
watch(savingGoalListener, () => {
  fetchSavingProgress();
});

const darkMode = useDark();

// Sidebar and phone bar state
const isSidebarOpen = ref(false);
const isPhone = ref(
  window.matchMedia && window.matchMedia("(max-width: 480px)").matches,
);

// Handle window resize event for mobile devices
onMounted(() => {
  if (userStore.isLoggedIn()) {
    fetchSavingProgress();
  }
  window.matchMedia &&
    window.matchMedia("(max-width: 480px)").addEventListener("change", (e) => {
      if (isSidebarOpen.value) {
        toggleSidebar();
      }
      isPhone.value = e.matches;
    });
});

// Toggle sidebar visibility
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  const top = document.querySelector(".top");
  const middle = document.querySelector(".middle");
  const bottom = document.querySelector(".bottom");

  const openClass = darkMode.value ? "-open-dark" : "-open";
  const closeClass = darkMode.value ? "-close-dark" : "-close";

  if (isSidebarOpen.value) {
    top?.classList.add(`top${openClass}`);
    top?.classList.remove(`top${closeClass}`);
    middle?.classList.add(`middle${openClass}`);
    middle?.classList.remove(`middle${closeClass}`);
    bottom?.classList.add(`bottom${openClass}`);
    bottom?.classList.remove(`bottom${closeClass}`);
  } else {
    top?.classList.remove(`top${openClass}`);
    top?.classList.add(`top${closeClass}`);
    middle?.classList.remove(`middle${openClass}`);
    middle?.classList.add(`middle${closeClass}`);
    bottom?.classList.remove(`bottom${openClass}`);
    bottom?.classList.add(`bottom${closeClass}`);
  }
};

// Handle theme change event
const emit = defineEmits(["theme"]);
const handleThemeChange = () => {
  darkMode.value = !darkMode.value;
  if (isSidebarOpen.value) {
    toggleSidebar();
  }
  emit("theme");
};

async function fetchLoginStreak() {
  loginStreak.value = 0;
  try {
    loginStreak.value = (await getLoginStreak()) ?? 0;
  } catch (error) {
    console.error("Error fetching login streak:", error);
  }
}

watchEffect(async () => {
  if (userStore.isLoggedIn()) {
    fetchSavingProgress();
    fetchLoginStreak();
  }
});
</script>

<style scoped>
.blur-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 989;
}

.top-bar {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90px;
  background-color: #ecffda;
  border-bottom: 1px solid #4b644a;
  z-index: 988;
  overflow: hidden;
  align-items: center;
}

.top-bar-dark {
  background-color: #23244b;
  border-bottom: 1px solid #757bfd;
}

.logo {
  cursor: pointer;
  z-index: 900;
  position: relative;
  height: 100px;
  margin-left: -30px;
}

.hamburger {
  cursor: pointer;
  position: fixed;
  margin-left: auto;
  width: fit-content;
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
}

.hamburger-dark {
  background-color: #f0f0f0;
}

.hamburger-dark:hover {
  background-color: #757bfd;
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
  background-color: #8fbf7f;
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

.top-open-dark {
  animation: top-open-dark 0.35s forwards;
}

.top-close {
  animation: top-close 0.35s forwards;
}

.top-close-dark {
  animation: top-close-dark 0.35s forwards;
}

.progress-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90px;
  position: fixed;
  top: 0;
}

.progress-bar {
  height: 20px;
  width: 70%;
  background-color: #f3f2f0;
  border: 2px solid #000;
  border-radius: 7px;
  padding: 1px;
  box-sizing: border-box;
}

.progress {
  height: 100%;
  width: auto;
  max-width: 100%;
  background-color: var(--color-badges-owned);
  border-radius: 5px;
}

.numeric-progress {
  position: absolute;
  -webkit-text-fill-color: #2e323e;
  font-size: 1em;
  font-weight: bold;
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

@keyframes top-open {
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

.middle {
  z-index: 998;
}

.middle-open {
  animation: middle-open 0.35s forwards;
}

.middle-open-dark {
  animation: middle-open-dark 0.35s forwards;
}

.middle-close {
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

.bottom-close {
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
    transform: translateY(-18px) rotate(0);
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
    transform: translateY(-18px) rotate(0);
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

.move-enter-active,
.move-leave-active {
  transition: transform 0.35s;
}

.move-enter-from,
.move-leave-to {
  transform: translateX(100%);
}

.move-enter-to,
.move-leave-from {
  transform: translateX(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
@media (max-width: 630px) {
  .progress-bar {
    width: 50%;
  }
}

.login-streak {
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  color: var(--color-text);
  border-radius: 4px;
  font-weight: bold;
}
</style>
