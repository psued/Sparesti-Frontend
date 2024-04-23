<template>
  <div class="container">

    <div class="progress-bar-container">
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: 30%"></div>
      </div>
    </div>

    <div class="path-container">
      <img src="/path.webp" alt="Path" id="path-image" />
      <img src="/avatar.png" alt="Avatar" class="avatar" />

      <div class="checkpoints">
        <template v-for="(checkpoint, index) in sortedCheckpoints">
        <img
          v-if="checkpoint.status === 'completed'"
          :src="checkCircleIcon"
          alt="Completed Checkpoint"
          class="checkpoint-icon check"
          :style="{ top: checkpoint.top + 'px', left: checkpoint.left + 'px' }"
          @click="openPopup(checkpoint.challenge || {} as Challenge, checkpoint.top, checkpoint.left)"
        />
        <img
          v-else
          :src="starCircleIcon"
          alt="Incomplete Checkpoint"
          class="checkpoint-icon star"
          :style="{ top: checkpoint.top + 'px', left: checkpoint.left + 'px' }"
          @click="openPopup(checkpoint.challenge || {} as Challenge, checkpoint.top, checkpoint.left)"
        />
      </template>
      </div>
    </div>

    <div class="background-container">
      <div class="background"></div>
        <div class="clouds">
          <img src="/cloud_1.png" alt="Cloud" class="cloud" />
          <img src="/cloud_2.png" alt="Cloud" class="cloud" />
          <img src="/cloud_3.png" alt="Cloud" class="cloud" />
          <img src="/cloud_4.png" alt="Cloud" class="cloud" />
        </div>
    </div>
    <ChallengeDetailsPopup :challenge="selectedChallengeForPopup" v-if="showPopup" @close="closePopup" :position="popupPosition" />  </div>
</template>

<script setup lang="ts">
import ChallengeDetailsPopup from "@/components/ChallengeDetailsPopup.vue";
import { onMounted, computed, ref } from "vue";
import { getChallengesByUser } from "@/api/challengeHooks";
import { type ChallengesResponse, type Challenge } from "@/types/challengeTypes";

import checkCircleIcon from "@/assets/check-circle.svg";
import starCircleIcon from "@/assets/star-circle.svg";

interface Checkpoint {
  top: number;
  left: number;
  status: string;
  expiryDate: string;
  challenge: Challenge | null;
}

const selectedChallenge = ref<Challenge | null>(null);
const showPopup = ref(false);
const popupPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });

const checkpoints = ref<{ top: number; left: number; status: string; expiryDate: string; challenge: Challenge | null }[]>([]);
const bottomLeftCoordinate = ref<{ x: number; y: number }>({ x: 0, y: 0 });

onMounted(async () => {
  const userId = 2; // Change this to the actual user ID
  const challengesResponse = await getChallengesByUser(userId);
  console.log(challengesResponse)

  const pathContainer = document.querySelector(".path-container");
  if (pathContainer) {
    const { left, bottom } = pathContainer.getBoundingClientRect();
    bottomLeftCoordinate.value = { x: left, y: bottom };
    console.log(bottomLeftCoordinate.value)
  } else {
    console.error("path-container not found");
  }

  if (challengesResponse) {
    const { purchaseChallenges, consumptionChallenges, savingChallenges } = challengesResponse;

    // Merge all challenge types into a single array
    const allChallenges = [...purchaseChallenges, ...consumptionChallenges, ...savingChallenges];

    const sortedChallenges = allChallenges.sort((a, b) => {
      // First, sort by completion status
      if (a.completed && !b.completed) return -1; // a comes before b if a is completed and b is not
      if (!a.completed && b.completed) return 1; // b comes before a if b is completed and a is not

      // If completion status is the same, sort by expiry date
      const dateComparison = new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime();
      if (dateComparison !== 0) {
        return dateComparison; // If expiry dates are different, return the comparison result
      }

      // If expiry dates are the same, sort by challenge ID
      return a.id - b.id;
    });


    // Initial coordinates
    let initial_top = bottomLeftCoordinate.value.y - 190;
    let initial_left = bottomLeftCoordinate.value.x - 330;

    // Structure the checkpoints array
    checkpoints.value = sortedChallenges.map((challenge, index) => ({    
      top: calculateTop(initial_top, index),
      left: calculateLeft(initial_left, index),
      status: challenge.completed ? "completed" : "in-progress", 
      expiryDate: challenge.expiryDate,
      challenge: challenge as unknown as Challenge || null, // Assign the challenge object itself
    }));
  } else {
    console.error('Failed to fetch challenges.');
  }
})

// Function to calculate the top coordinate based on the index
const calculateTop = (initial_top: number, index: number) => {
  return initial_top - Math.floor(index / 2) * 80;
}

// Function to calculate the left coordinate based on the index
const calculateLeft = (initial_left: number, index: number) => {
  const offset = (index % 2 === 0) ? -90 : -10;
  return initial_left + offset;
}

const sortedCheckpoints = computed(() => {
  return [...checkpoints.value];
});

const selectedChallengeForPopup = computed(() => selectedChallenge.value || ({} as Challenge));

const openPopup = (challenge: Challenge, top: number, left: number) => {
  selectedChallenge.value = challenge;
  showPopup.value = true;
  popupPosition.value = { top, left };
  console.log("Popup opened");
  console.log(challenge);
}

const closePopup = () => {
  selectedChallenge.value = null;
  showPopup.value = false;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  height: 100vh;
}

.background-container {
  background-size: cover;
  background-repeat: repeat;
  z-index: -1;
  position: absolute;
  width: -webkit-fill-available;
  height: 100%;
}

.background {
  background: rgb(45,229,172);
  background: linear-gradient(194deg, rgba(45,229,172,1) 0%, rgba(255,254,134,1) 100%);
  width: -webkit-fill-available;
  height: -webkit-fill-available;
}

.cloud {
  position: absolute;
  width: var(--cloud-width, 130px);  
  height: auto;
  animation: floatClouds linear infinite;
  opacity: 0.8;
  display: none;
  left: -10%;
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

.path-container {
  width: 100%;
  height: auto;
  position: relative;
  justify-content: center;
  z-index: 2;
  text-align: center;
  width: 50vh;
  filter: none;
}

#path-image {
  width: -webkit-fill-available;
  height: auto;
}

.progress-container {
  width: 100%;
  justify-content: center;
}

.progress-bar {
  background-color: #ffffff;
  border-radius: 5px;
  height: 25px;
  width: 130vh;
  position: relative;
  margin: 10px;
}

.progress-bar-fill {
  background-color: #4caf50;
  height: 100%;
  border-radius: 5px;
}

.checkpoints {
  top: 0;
  left: 0;
  width: 100%;
}

.checkpoint {
  background-color: #fff;
  border: 2px solid #000000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 3;
}

.checkpoint.completed {
  background-color: #4caf50;
  border-color: #000000;
}

.checkpoint.in-progress {
  background-color: #ffc13b;
  border-color: #000000;
}

.checkpoint.finish-line {
  background: url("/finish-line.jpeg");
  background-size: 1px;
  border-color: #000000;
}

.avatar {
  position: absolute;
  width: 50px; /* Adjust width as needed */
  height: auto;
  z-index: 4; /* Ensure pig is above the checkpoints */
  transition: all 2s ease; /* Add smooth transition effect */
}

.checkpoint-icon {
  position: absolute;
}

.check {
  background-color: rgb(23, 228, 23);
  border-radius: 50%;
}

.star {
  background-color: rgb(255, 192, 55);
  border-radius: 50%;
}

</style>
