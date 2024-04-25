<template>
  <div id="challengesViewDiv">
    <h1 id="challengesTitle">Challenges</h1>
    <div id="challengesDiv">
      <ChallengeComponent class="challenge" v-for="challengeObject in challengeObjects" :key="challengeObject.id" :challenge-object="challengeObject" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChallengeComponent from '../components/challenges/ChallengeComponent.vue'
import { getUserChallenges } from "@/api/challengeHooks";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";
import type { MasterChallenge } from '@/types/challengeTypes';
const challengeObjects = ref<MasterChallenge[]>([]);

async function fetchChallengeObjects() {
  const userStore = useUserStore()
  const userId = userStore.getUserId
  challengeObjects.value = await getUserChallenges(userId) || [];
  console.log(challengeObjects.value);
}

onMounted(async () => {
  await fetchChallengeObjects();
});
</script>

<!--reactive([
{
title: "Example Title",
id: 123,
description: "Example Description",
targetAmount: 250,
savedAmount: 140,
mediaUrl: "🤑",
timeInterval: "Daily",
difficultyLevel: "Hard",
expiryDate: new Date(1715353792000),
completed: false
}])-->

<style scoped>

#challengesViewDiv{
  text-align: center;
  align-items: center;
    justify-content: center;
}

#challengesTitle {
  font-style: italic;
  margin: 2rem;
  font-size: 4rem;
}

#challengesDiv {
  float: left;
}

.challenge {
  display: inline-block;
  margin: 10px;
}
</style>