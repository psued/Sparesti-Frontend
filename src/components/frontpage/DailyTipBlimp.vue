<template>
  <div class="balloon-container">
    <div class="clickable-balloon-area">
      <div class="clickable-area" @click="showPopup = true"></div>
      <picture>
        <img
          :src="darkMode ? '/BalloonPigDark.png' : '/BalloonPig.png'"
          alt="Balloon Pig"
          class="balloon"
        />
      </picture>
    </div>

    <PopupComponent :is-visible="showPopup" @togglePopup="togglePopup">
      <template #content>
        <div class="popup-content" :class="{ 'dark-mode': darkMode }">
          <h1 class="saving-tip">{{ tip || "No tip available 💀" }}</h1>
        </div>
      </template>
    </PopupComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useDailySavingTip } from "../../utils/useDailySavingTip";
import PopupComponent from "../assets/PopupComponent.vue";
import { useDark } from "@vueuse/core";

// Reactive state to handle dark mode
const darkMode = useDark();

const { tip, startAutoFetch, stopAutoFetch } = useDailySavingTip();
const showPopup = ref(false);
let intervalId: number;

onMounted(() => {
  intervalId = startAutoFetch(); // Fetch a tip when the component mounts
});

onUnmounted(() => {
  stopAutoFetch(intervalId); // Clear the interval when the component unmounts
});

const togglePopup = () => {
  showPopup.value = !showPopup.value; // Toggle the visibility state
};
</script>

<style scoped>
@keyframes floatAcross {
  0%,
  100% {
    transform: translateX(0%) translateY(200%);
  }
  20% {
    transform: translateX(100%) translateY(-39%);
  }
  40% {
    transform: translateX(200%) translateY(80%);
  }
  60% {
    transform: translateX(300%) translateY(-39%);
  }
  80% {
    transform: translateX(400%) translateY(90%);
  }
}

.clickable-balloon-area {
  z-index: 800;
  animation: floatAcross 110s infinite; /* Adjust time as needed */
  pointer-events: auto;
  width: 20%;
  /* TODO: change width for mobile, or else the blimp is a tiny baby blimp */
}

.balloon-container {
  position: fixed;
  top: 20%;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  z-index: 800;
  pointer-events: none;
}

.balloon {
  pointer-events: none;
  width: 100%;
}

.clickable-area {
  background: transparent;
  z-index: 801;
  /* Custom clickable square area of png. Perfectly crafted for width of 50%*/
  position: absolute;
  top: 23%; /* adjust these values based on the image and the desired clickable area */
  left: 28%;
  width: 38%; /* size of the clickable area */
  height: 45%;
  cursor: pointer;
  pointer-events: all;
}

.backdrop {
  pointer-events: all;
}

@media (max-width: 600px) {
  .clickable-balloon-area {
    width: 50%; /* Increase the size on mobile */
    /* animation very janky on mobile */
  }
}

.balloon:hover {
  cursor: pointer;
}

.popup-content {
  z-index: 800;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  border: solid 2px #4b644a;
  padding: 20px;
  width: 350px;
  max-width: 90%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.popup-content.dark-mode {
  border: 2px solid #757bfd;
  background-color: #23244b; /* Dark background for dark mode */
}

.saving-tip {
  align-self: center;
}
</style>
