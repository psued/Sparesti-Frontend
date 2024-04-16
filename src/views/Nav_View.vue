<template>
    <div :class="['hamburger', {'hamburger-dark': darkMode}]">
        <div class="hamburger-box" @click="toggleSidebar()">
        <span :class="['hamburger-line', 'top']"></span>
        <span :class="['hamburger-line', 'middle']"></span>
        <span :class="['hamburger-line', 'bottom']"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const darkMode = ref(true)
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  const top = document.querySelector('.top')
  const middle = document.querySelector('.middle')
  const bottom = document.querySelector('.bottom')
  if(isSidebarOpen.value){
    top?.classList.remove('top-close')
    top?.classList.add('top-open')
    middle?.classList.remove('middle-close')
    middle?.classList.add('middle-open')
    bottom?.classList.remove('bottom-close')
    bottom?.classList.add('bottom-open')
  } else {
    top?.classList.remove('top-open')
    top?.classList.add('top-close')
    middle?.classList.remove('middle-open')
    middle?.classList.add('middle-close')
    bottom?.classList.remove('bottom-open')
    bottom?.classList.add('bottom-close')
  }
}
</script>

<style scoped>
.hamburger {
  cursor: pointer;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
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
  background-color: #333;
  transition: transform 0.3s;
}

.top {
  top: 0;
}
.top-open {
  animation: top-open 0.5s forwards;
}
.top-close {
  animation: top-close 0.5s forwards;
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
  }
}
@keyframes top-close {
  0% {
    transform: translateY(24px) rotate(45deg);
  }
  50% {
    transform: translateY(24px) rotate(0);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}

.middle-open {
  animation: middle-open 0.5s forwards;
}
.middle-close {
  animation: middle-close 0.5s forwards;
}
@keyframes middle-open {
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
  50% {
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.bottom {
  bottom: 0;
}
.bottom-open {
  animation: bottom-open 0.5s forwards;
}
.bottom-close{
  animation: bottom-close 0.5s forwards;
}
@keyframes bottom-open {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-24px) rotate(0);
  }
  100% {
    transform: translateY(-24px) rotate(-45deg);
  }
}
@keyframes bottom-close {
  0% {
    transform: translateY(-24px) rotate(-45deg);
  }
  50% {
    transform: translateY(-24px) rotate(0);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}
</style>
