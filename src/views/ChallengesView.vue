<template>
  <div id="challengesViewDiv">
    <h1 id="challengesTitle">Challenges</h1>
    <div id="challengesDiv">
      <ChallengeComponent class="challenge" v-for="challengeObject in challengeObjects.values()" :key="challengeObject.id" :challenge-object="challengeObject" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChallengeComponent from '../components/challenges/ChallengeComponent.vue'
import { getUserChallenges } from "@/api/challengeHooks";
import { onMounted, ref } from "vue";
import type { MasterChallenge } from '@/types/challengeTypes';
const challengeObjects = ref<MasterChallenge[]>([]);

async function fetchChallengeObjects() {
  challengeObjects.value = await getUserChallenges() || [];
  console.log(challengeObjects.value);
}

onMounted(async () => {
  await fetchChallengeObjects();
});
</script>

<style scoped>

#challengesViewDiv{
  text-align: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#challengesTitle {
  font-style: italic;
  margin: 2rem;
  font-size: 4rem;
}

#challengesDiv {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.challenge{
  width: 250px;
  flex-shrink: 0;
}
</style>