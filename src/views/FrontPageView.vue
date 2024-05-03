/** * @file FrontPageView.vue * @description This file contains the
implementation of the FrontPageView component. * The FrontPageView component is
responsible for rendering the front page of the application. * It displays a
daily tip blimp, a background container with clouds, a road, and a challenge
details popup. * It also handles the display of a badge popup when a user
receives a badge. * The component uses various child components such as
ChallengeDetailsPopup, PopupComponent, ButtonComponent, BadgeComponent, and
DailyTipBlimp. * The component makes API calls to fetch challenges, user
information, and award badges. * It also handles user interactions such as
closing popups, accepting badges, and triggering confetti animation. * The
component is written in TypeScript and uses Vue 3 composition API. */
<template>
  <daily-tip-blimp />
  <div class="container" @click="closeBadgePopup">
    <div class="background-container">
      <div class="background"></div>
    </div>
    <div class="clouds" v-if="maxMedia && !dark">
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

  <PopupComponent
    :isVisible="showBadgePopup"
    :flashingBorder="true"
    class="popup"
  >
    <template #content>
      <h2>Gratulerer, du har mottatt en medalje!</h2>
      <BadgeComponent :badge="rewardedBadge" :owned="true" />
      <ButtonComponent class="button" @click="closeBadgePopupAndAwardBadge">
        <template v-slot:content>
          <h2>Godta Medalje</h2>
        </template>
        <template v-slot:click>
          <h2>Godta Medalje</h2>
        </template>
      </ButtonComponent>
      <div class="confetti-container" v-if="showConfetti"></div>
    </template>
  </PopupComponent>
</template>

<script setup lang="ts">
import ChallengeDetailsPopup from "@/components/ChallengeDetailsPopup.vue";
import PopupComponent from "@/components/assets/PopupComponent.vue";
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import BadgeComponent from "@/components/badge/BadgeComponent.vue";
import confetti from "canvas-confetti";
import { Howl } from "howler";
import plingSound from "/pling.wav";
import { onMounted, computed, ref } from "vue";
import { type Challenge } from "@/types/challengeTypes";
import { type Badge } from "@/types/Badge";
import { useUserStore } from "@/stores/userStore";
import { checkAndAwardBadge, giveUserBadge } from "@/api/badgeHooks";
import { updateLoginStreak } from "@/api/userHooks";
import { useLogin } from "@/api/authenticationHooks";
import road from "../components/road/RoadTiles.vue";
import { useDark } from "@vueuse/core";
import DailyTipBlimp from "../components/frontpage/DailyTipBlimp.vue";
import { getUserByUsername } from "@/api/userHooks";

// Initializing variables and references
const selectedChallenge = ref<Challenge | null>(null);
const rewardedBadge = ref<Badge | null>(null);
const showPopup = ref(false);
const showBadgePopup = ref(false);
const popupPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
const showConfetti = ref(false);
const dark = useDark();
const selectedChallengeForPopup = computed(
  () => selectedChallenge.value || ({} as Challenge),
);
const maxMedia =
  window.matchMedia && window.matchMedia("(min-width: 480px)").matches;
const userStore = useUserStore();

// Function to handle badge rewarded event
const handleBadgeRewarded = async (badge: Badge) => {
  rewardedBadge.value = badge;
  showBadgePopup.value = true;
};

// Function to close the challenge details popup
const closePopup = () => {
  selectedChallenge.value = null;
  showPopup.value = false;
  showConfetti.value = false;
};

// Function to close the badge popup and award the badge
const closeBadgePopupAndAwardBadge = async () => {
  const user = await getUserByUsername();
  await giveUserBadge(Number(rewardedBadge.value?.id), user.id);
  rewardedBadge.value = null;
  showBadgePopup.value = false;
  triggerConfetti();
  playPlingSound();
};

// Function to close the badge popup
const closeBadgePopup = () => {
  showBadgePopup.value = false;
};

// Function to trigger the confetti animation
const triggerConfetti = () => {
  showConfetti.value = true;
  let scalar = 2;
  let coin = confetti.shapeFromText({ text: "💰", scalar });
  const confettiOptions = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    sizes: [20, 30],
    shapes: [coin],
    scalar,
  };
  confetti(confettiOptions);
  setTimeout(() => {
    showConfetti.value = false;
  }, 5000);
};

// Function to play the pling sound
const playPlingSound = () => {
  if (userStore.getMuted) return;
  const sound = new Howl({
    src: [plingSound],
    autoplay: true,
    loop: false,
    volume: 0.1,
  });
};

// Function to handle the component's mounted event
onMounted(async () => {
  if (!userStore.isLoggedIn()) {
    useLogin();
  } else {
    updateLoginStreak();
    const badge = await checkAndAwardBadge();
    if (badge) {
      handleBadgeRewarded(badge);
    }
  }
});
</script>

<style scoped>
/* CSS styles for the component */
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
  background-image: url("/backgroundpink.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
}

.cloud {
  z-index: 900;
  position: fixed;
  width: var(--cloud-width, 130px);
  height: auto;
  animation: floatClouds linear infinite;
  opacity: 0.3;
  display: none;
  left: -210px;
  height: 70px;
  width: 200px;
  filter: blur(5px);
  /* Add blur effect */
}

.clouds {
  z-index: 800;
}

@keyframes floatClouds {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(120vw);
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
  top: 40%;
  display: block;
}

.cloud:nth-child(3) {
  animation-duration: 30s;
  animation-delay: 10s;
  top: 65%;
  display: block;
}

.cloud:nth-child(4) {
  animation-duration: 40s;
  animation-delay: 13s;
  top: 85%;
  display: block;
}

.popup {
  position: fixed; /* Keep the popup in a fixed position */
  top: 50%; /* Position the top edge of the element at the middle of the screen */
  left: 50%; /* Position the left edge of the element at the middle of the screen */
  transform: translate(
    -50%,
    -50%
  ); /* Shift the element back by half its own width and height to truly center it */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  width: 80%; /* Control width */
  height: fit-content; /* Adjust height as needed */
  display: flex; /* Enables flexbox */
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */
  justify-content: center; /* Center children vertically */
  z-index: 999; /* Ensures the popup stays above other content */
}

/* Optional: Ensuring width doesn't become too large on bigger screens */
@media (min-width: 600px) {
  .popup {
    width: 400px; /* Maximum width on large screens */
  }
}

.button {
  color: white;
  margin: 2rem auto;
  cursor: pointer;
  width: 200px;
  height: 50px;
}
</style>
