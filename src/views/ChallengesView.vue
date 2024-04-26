<template>
  <div id="challengesViewDiv">
    <h1 id="challengesTitle">Challenges</h1>
<!--
    <NewChallengeComponent v-if="showNewChallenge" @close="toggleModal"/>
-->
    <div id="challengesDiv">
      <ChallengeComponent class="challenge" v-for="challengeObject in challengeObjects.values()" :key="challengeObject.id" :challenge-object="challengeObject" />
    </div>
  </div>
  <NewChallengeButtonComponent class="newChallengeButton"/>
</template>

<script setup lang="ts">
import ChallengeComponent from '../components/challenges/ChallengeComponent.vue'
import { getUserChallenges } from "@/api/challengeHooks";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";
import type { MasterChallenge } from '@/types/challengeTypes';
import NewChallengeComponent from "@/components/challenges/NewChallengeComponent.vue";
import NewChallengeButtonComponent from "@/components/challenges/NewChallengeButtonComponent.vue";
const challengeObjects = ref<MasterChallenge[]>([]);

async function fetchChallengeObjects() {
  const userStore = useUserStore()
  const userId = userStore.getUserId
  challengeObjects.value = await getUserChallenges(userId) || [];
}

onMounted(async () => {
  await fetchChallengeObjects();
});

let showNewChallenge = ref(true)

function toggleModal() {
  showNewChallenge.value = !showNewChallenge
  console.log("hei")
}

</script>

<style scoped>

#challengesViewDiv{
  text-align: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 150px;
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

NewChallengeComponent{
  text-align: center;
  vertical-align: center;
}
.newChallengeButton{
  position: fixed;
  height: 100px;
  width: 100px;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>