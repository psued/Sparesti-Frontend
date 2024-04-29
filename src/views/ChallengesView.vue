<template>
  <div id="challengesViewDiv">
    <h1 id="challengesTitle">Challenges</h1>
    <div id="challengesDiv">
      <ChallengeComponent class="challenge" v-for="challengeObject in challengeObjects.values()" :key="challengeObject.id" :challenge-object="challengeObject" />
    </div>
    <NewChallengeComponent @togglePopup="toggleIsVisible" :is-visible="isVisible" ref="popup">
      <template v-slot:content>
        <div class="newChallengePopup"></div>
      </template>
    </NewChallengeComponent>
    <NewChallengeButtonComponent v-if="!isVisible" @click="toggleIsVisible" class="newChallengeButton"/>
  </div>

</template>

<script setup lang="ts">
import ChallengeComponent from '../components/challenges/ChallengeComponent.vue'
import { getUserChallenges } from "@/api/challengeHooks";
import { useUserStore } from "@/stores/userStore";
import {onMounted, ref, inject, computed} from "vue";
import type { MasterChallenge } from '@/types/challengeTypes';
import NewChallengeComponent from "@/components/assets/PopupComponent.vue";
import NewChallengeButtonComponent from "@/components/challenges/NewChallengeButtonComponent.vue";
import {mount} from "cypress/vue";
const challengeObjects = ref<MasterChallenge[]>([]);

async function fetchChallengeObjects() {
  const userStore = useUserStore()
  const userId = userStore.getUserId
  challengeObjects.value = await getUserChallenges(userId) || [];
}

onMounted(async () => {
  await fetchChallengeObjects();
});


const isVisible = ref(false)
function toggleIsVisible() {
  isVisible.value = !isVisible.value
}
</script>

<style scoped>

#challengesViewDiv{
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: calc(100px + 2rem);
  scrollbar-gutter: stable;
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

.newChallengeButton{
  position: fixed;
  cursor: pointer;
  height: 100px;
  width: 100px;
  margin: auto;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}

.newChallengePopup {
  position: absolute;
  width: 400px;
  height: 400px;
  background-color: red;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

</style>