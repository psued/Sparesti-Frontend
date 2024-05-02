<template>
  <div class="balloon-container">
    <img src="../../../public/BalloonPig2.png" alt="Pig flying hot air balloon offering advice" class="balloon" @click="showPopup = true"/>
    <PopupComponent :is-visible="showPopup" @togglePopup="togglePopup">
      <template #content>
        <div class="popup-content">
          <h1 class="saving-tip">{{tip || "No tip available 💀"}}</h1>
        </div>
      </template>
    </PopupComponent>

  </div>
</template>


<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'
import { useDailySavingTip } from '../../utils/useDailySavingTip'
import PopupComponent from '../assets/PopupComponent.vue'

const { tip, startAutoFetch, stopAutoFetch } = useDailySavingTip()
const showPopup = ref(false);
let intervalId: number;
onMounted(() => {
  intervalId = startAutoFetch(); // Fetch a tip right when the component mounts
})
onUnmounted(() => {
  stopAutoFetch(intervalId); // Clear the interval when the component unmounts
});
const togglePopup = () => {
  showPopup.value = !showPopup.value;  // Toggle the visibility state
}
</script>



<style scoped>
@keyframes floatAcross {
  0%, 100% {
    transform: translateX(0%) translateY(200%);
  }
  20% {
    transform: translateX(100%) translateY(-60%);
  }
  40% {
    transform: translateX(200%) translateY(100%);
  }
  60% {
    transform: translateX(300%) translateY(-70%);
  }
  80% {
    transform: translateX(400%) translateY(100%);
  }
}

.balloon-container {
  position: absolute;
  top: 20%;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  overflow: visible;
  z-index: 800;
}

/* FYI, it is no longer a blimp but a hot air balloon*/
.balloon {
  z-index: 800;
  animation: floatAcross 100s infinite; /* Adjust time as needed */
  width: 20%;
  /* TODO: change width for mobile, or else the blimp is a tiny baby blimp */
}

.balloon:hover {
  cursor: pointer;
}

.popup-content {
  /* Add any styling for the content */
  z-index: 800;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 300px; /* Adjust the width as needed */
  max-width: 90%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.saving-tip {
  align-self: center;
}
</style>