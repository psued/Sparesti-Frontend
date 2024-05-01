<template>
  <div class="blimp-container">
    <img src="../../assets/BalloonPig.png" alt="Flying Pig Blimp" class="blimp" @click="showPopup = true"/>

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
import { ref, onMounted } from 'vue'
import { useDailySavingTip } from '../../utils/useDailySavingTip'
import PopupComponent from '../assets/PopupComponent.vue'

const { tip, fetchTip } = useDailySavingTip()
const showPopup = ref(false);
onMounted(() => {
  fetchTip(); // Fetch a tip right when the component mounts
})
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

.blimp-container {
  position: fixed;
  top: 20%;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  overflow: visible;
}

/* FYI, it is no longer a blimp but a hot air balloon*/
.blimp {
  animation: floatAcross 100s infinite; /* Adjust time as needed */
  width: 20%;
  /* Click me indicator */
}

.blimp:hover {
  cursor: pointer;
}

.popup-content {
  /* Add any styling for the content */
  display: grid;
  background-color: white;
  border-radius: 8px;
  width: 75%;
  place-items: center;
}

.saving-tip {
  align-self: center;
}
</style>