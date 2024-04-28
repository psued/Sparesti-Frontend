<template>
  <div id="challengesViewDiv" :class="{showingPopup : showNewChallenge}">
    <h1 id="challengesTitle">Challenges</h1>
    <div id="challengesDiv">
      <ChallengeComponent class="challenge" v-for="challengeObject in challengeObjects.values()" :key="challengeObject.id" :challenge-object="challengeObject" />
    </div>
    <NewChallengeComponent v-if="showNewChallenge" @close="toggleModal"/>
    <NewChallengeButtonComponent v-if="!showNewChallenge" @click="toggleModal" class="newChallengeButton"/>
  </div>

</template>

<script setup lang="ts">
import ChallengeComponent from '../components/challenges/ChallengeComponent.vue'
import { getUserChallenges } from "@/api/challengeHooks";
import { useUserStore } from "@/stores/userStore";
import {onMounted, ref, watchEffect} from "vue";
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

let showNewChallenge = ref(false)

function toggleModal() {
  showNewChallenge.value = !showNewChallenge.value
}

import { watchEffect } from 'vue';

let scrollTop = 0;

watchEffect(() => {
  if (showNewChallenge.value) {
    scrollTop = document.documentElement.scrollTop;
    document.body.style.setProperty('--st', -scrollTop + "px");
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
    document.documentElement.scrollTop = scrollTop;
  }
});
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

NewChallengeComponent{
  text-align: center;
  vertical-align: center;
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
</style>