<template>
  <div id="challengesViewDiv">
    <h1 id="challengesTitle">Challenges</h1>
    <div id="challengesDiv">
      <ChallengeComponent class="challenge" v-for="challengeObject in challengeObjects.values()" :key="challengeObject.id" :challenge-object="challengeObject" />
    </div>
    <PopupComponent @togglePopup="toggleIsVisible" :is-visible="isVisible" ref="popup">
      <template v-slot:content>
        <NewChallengeComponent @toggleFreeze="toggleIsFrozen" @close="toggleIsVisible"/>
      </template>
    </PopupComponent>
    <SVGButtonComponent  v-if="!isVisible" @click="toggleIsVisible" class="newChallengeButton">
      <template v-slot:icon>
        <svg class="pluss" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#F09217" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#F09217" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </template>
    </SVGButtonComponent>
  </div>

</template>

<script setup lang="ts">
import ChallengeComponent from '../components/challenges/ChallengeComponent.vue'
import { getUserChallenges } from "@/api/challengeHooks";
import { useUserStore } from "@/stores/userStore";
import {onMounted, ref} from "vue";
import type { MasterChallenge } from '@/types/challengeTypes';
import NewChallengeComponent from "@/components/challenges/NewChallengeComponent.vue";
import PopupComponent from "@/components/assets/PopupComponent.vue";
import SVGButtonComponent from "@/components/assets/SVGButtonComponent.vue";
const challengeObjects = ref<MasterChallenge[]>([]);

async function fetchChallengeObjects() {
  const userStore = useUserStore()
  const userId = userStore.getUserId
  challengeObjects.value = await getUserChallenges(userId) || [];
}

onMounted(async () => {
  await fetchChallengeObjects();
});

let isFrozen = false
function toggleIsFrozen(){
  isFrozen = !isFrozen
}
const isVisible = ref(false)
function toggleIsVisible() {
  if(!isFrozen){
    isVisible.value = !isVisible.value
  }
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
</style>