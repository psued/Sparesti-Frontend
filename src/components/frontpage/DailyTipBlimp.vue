<template>
  <div class="blimp-container">
    <img src="../../assets/BalloonPig.png" alt="Flying Pig Blimp" class="blimp"/>
    <div class="speech-bubble">{{tip || "no tip available right now!"}}</div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDailySavingTip } from '../../utils/useDailySavingTip'

const { tip, fetchTip } = useDailySavingTip()

onMounted(() => {
  fetchTip(); // Fetch a tip right when the component mounts
})
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
  /* animation will likely be infinite */
  animation: floatAcross 100s infinite; /* Adjust time as needed */
  width: 20%;
  /* Click me indicator */
  /* Remove pig balloon cavity */
}

/*___SPEECH BUBBLE___*/
.speech-bubble {
  position: relative;
  background: #fab120;
  color: #FFFFFF;
  font-family: Arial;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  width: 250px;
  height: 120px;
  border-radius: 10px;
  padding: 0px;
}
.speech-bubble:after {
  content: '';
  position: absolute;
  display: block;
  width: 0;
  z-index: 1;
  border-style: solid;
  border-color: #fab120 transparent;
  border-width: 20px 14px 0;
  bottom: -20px;
  left: 50%;
  margin-left: -14px;
}
</style>