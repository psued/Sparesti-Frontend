<template>
  <daily-tip-blimp />
  <div class="container">
    <div class="background-container">
      <div class="background"></div>

    </div>
    <div class="clouds" v-if="maxMedia">
      <img src="/cloud_dark.png" alt="Cloud" class="cloud" />
      <img src="/cloud_dark.png" alt="Cloud" class="cloud" />
      <img src="/cloud_dark.png" alt="Cloud" class="cloud" />
      <img src="/cloud_dark.png" alt="Cloud" class="cloud" />
    </div>
    <road />
    <ChallengeDetailsPopup
      :challenge="selectedChallengeForPopup"
      v-if="showPopup"
      @close="closePopup"
      :position="popupPosition"
    />
  </div>
</template>

<script setup lang="ts">
import ChallengeDetailsPopup from "@/components/ChallengeDetailsPopup.vue";
import { onMounted, computed, ref } from "vue";
import { getSortedChallengesByUser } from "@/api/challengeHooks";
import { type ChallengesResponse, type Challenge } from "@/types/challengeTypes";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { useLogin } from "@/api/authenticationHooks";
import road from "../components/road/RoadTiles.vue";

import checkCircleIcon from "@/assets/check-circle.svg";
import starCircleIcon from "@/assets/star-circle.svg";
import DailyTipBlimp from "../components/frontpage/DailyTipBlimp.vue";

const selectedChallenge = ref<Challenge | null>(null);
const showPopup = ref(false);
const popupPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });

const selectedChallengeForPopup = computed(
  () => selectedChallenge.value || ({} as Challenge),
);
const maxMedia =
  window.matchMedia && window.matchMedia("(min-width: 480px)").matches;
const userStore = useUserStore();

const openPopup = (challenge: Challenge, top: number, left: number) => {
  selectedChallenge.value = challenge;
  showPopup.value = true;
  popupPosition.value = { top, left };
  console.log("Popup opened");
  console.log(challenge);
};

const closePopup = () => {
  selectedChallenge.value = null;
  showPopup.value = false;
};

onMounted(() => {
  if (!userStore.isLoggedIn()) {
    useLogin();
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

.background-container {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background {
  background-image: url("src/assets/backgroundpink.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
}

.cloud {
  z-index: 900;
  position: absolute;
  width: var(--cloud-width, 130px);
  height: auto;
  animation: floatClouds linear infinite;
  opacity: 0.3;
  display: none;
  left: -10%;
  height: 70px;
  width: 200px;
  filter: blur(5px);
  /* Add blur effect */
}

.clouds {
  z-index: 700;
}

@keyframes floatClouds {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100vw);
  }
}

.cloud:nth-child(1) {
  animation-duration: 50s;
  animation-delay: 0s;
  top: 15%;
  display: block;
}

.cloud:nth-child(2) {
  animation-duration: 60s;
  animation-delay: 5s;
  top: 30%;
  display: block;
}

.cloud:nth-child(3) {
  animation-duration: 30s;
  animation-delay: 10s;
  top: 45%;
  display: block;
}

.cloud:nth-child(4) {
  animation-duration: 40s;
  animation-delay: 13s;
  top: 65%;
  display: block;
}
</style>
