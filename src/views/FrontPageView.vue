<template>
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
    <PopupComponent :isVisible="showBadgePopup" :flashingBorder="true" @togglePopup="closeBadgePopup" class="popup">
      <!-- Slot for content -->
      <template #content>
        <h2>Gratulerer, du har mottatt en medalje!</h2>
        <!-- Render the rewarded badge here -->
        <BadgeComponent :badge="rewardedBadge" :owned="true" />
        <!-- Change this to be a ButtonComponent, I dont know why it doesnt work when I use it -->
        <button @click="closeBadgePopup">Godta Medalje</button>
        <div class="confetti-container" v-if="showConfetti"></div>
      </template>
    </PopupComponent>
  </div>
</template>

<script setup lang="ts">
import ChallengeDetailsPopup from "@/components/ChallengeDetailsPopup.vue";
import PopupComponent from "@/components/assets/PopupComponent.vue";
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import BadgeComponent from "@/components/badge/BadgeComponent.vue";
import confetti from 'canvas-confetti';
import coinImage from "@/assets/gold-coin.png";
import { Howl } from 'howler';
import plingSound from "@/assets/pling.wav";
import { onMounted, computed, ref } from "vue";
import { getSortedChallengesByUser } from "@/api/challengeHooks";
import { type ChallengesResponse, type Challenge } from "@/types/challengeTypes";
import { type Badge } from "@/types/Badge";
import { useUserStore } from "@/stores/userStore";
import { checkAndAwardBadge } from "@/api/badgeHooks";
import { useRouter } from "vue-router";
import { useLogin } from "@/api/authenticationHooks";
import road from "../components/road/RoadTiles.vue";

import checkCircleIcon from "@/assets/check-circle.svg";
import starCircleIcon from "@/assets/star-circle.svg";

const selectedChallenge = ref<Challenge | null>(null);
const rewardedBadge = ref<Badge | null>(null);
const showPopup = ref(false);
const showBadgePopup = ref(false);
const popupPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
const showConfetti = ref(false);
const plingAudio = ref<HTMLAudioElement | null>(null);
const playSound = ref(true);

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

const handleBadgeRewarded = (badge: Badge) => {
  rewardedBadge.value = badge;
  showBadgePopup.value = true;
};

const closePopup = () => {
  selectedChallenge.value = null;
  showPopup.value = false;
  showConfetti.value = false;
};

const closeBadgePopup = () => {
  rewardedBadge.value = null;
  showBadgePopup.value = false;
  triggerConfetti();
  playPlingSound();
};

const triggerConfetti = () => {
  showConfetti.value = true;
  
  let scalar = 2;
  let coin = confetti.shapeFromText({text: '💰', scalar})

  // Configure custom shape options for confetti
  const confettiOptions = {
    particleCount: 100, // Number of confetti particles
    spread: 70, // Spread of confetti
    origin: { y: 0.6 }, // Starting position of confetti
    sizes: [20, 30], // Size of the confetti particles (coins)
    shapes: [coin], // Shape of the confetti particles (coins)
    scalar,
  };

  // Trigger confetti with custom options
  confetti(confettiOptions);
  
  // Optionally, set a timeout to hide the confetti after a certain duration
  setTimeout(() => {
    showConfetti.value = false;
  }, 5000); // 5000 milliseconds (adjust as needed)
};

const playPlingSound = () => {
  const sound = new Howl({
    src: [plingSound],
    autoplay: true,
    loop: false,
  });
};

onMounted(async () => {
  if (!userStore.isLoggedIn()) {
    useLogin();
  } else {
    const badge = await checkAndAwardBadge();
    if (badge) {
      handleBadgeRewarded(badge);
    }
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

.popup {
  position: absolute;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  max-height: fit-content;
  overflow-y: auto;
  padding: 20px;
  width: 80%;
  width: fit-content;
  height: fit-content;
  text-align: -webkit-center;
  z-index: 999;
}
</style>
