<template>
  <div id="NewChallengeContainer" >
    <ExitButtonComponent v-if="!showCreateChallenge && !showGenerateChallenge" @close="close" id="exitButton"/>
    <BackButtonComponent @click="back" v-if="showCreateChallenge || showGenerateChallenge" id="backButton"/>
    <div id="contentContainer">
      <div v-if="!showCreateChallenge && !showGenerateChallenge">
        <h1>New Challenge</h1>

        <ButtonComponent class="button" @click="toggleCreateChallenge">
          <template v-slot:content>
            <h2>Create</h2>
          </template>
        </ButtonComponent>
        <ButtonComponent class="button" @click="">
          <template v-slot:content>
            <h2>Generate</h2>
          </template>
        </ButtonComponent>
      </div>
      <CreateChallengeComponent v-if="showCreateChallenge"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import CreateChallengeComponent from "@/components/challenges/CreateChallengeComponent.vue";
import {ref} from "vue";
import ExitButtonComponent from "@/components/assets/ExitButtonComponent.vue";
import BackButtonComponent from "@/components/assets/BackButtonComponent.vue";

const showCreateChallenge = ref(false);
const showGenerateChallenge = ref(false);

const toggleCreateChallenge = () => {
  showCreateChallenge.value = true;
  toggleFreeze()
}

const back = () => {
  showCreateChallenge.value = false;
  showGenerateChallenge.value = false;
  toggleFreeze()
}

const emit = defineEmits(['close', 'toggleFreeze'])

const close = () => {
  emit('close')
}

const toggleFreeze = () => {
  emit('toggleFreeze')
}
</script>

<style scoped>
#NewChallengeContainer {
  position: absolute;
  width: 400px;
  height: 90%;
  background-color: var(--color-background);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

#exitButton {
  position: absolute;
  top: -7px;
  right: -7px;
  width: 50px;
  height: 50px;
}

#backButton {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  left: 10px;
}

#contentContainer {
  height: calc(100% - 80px);
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
}

.button {
  margin: 1rem auto;
  cursor: pointer;
  width: 200px;
  height: 50px;
}
</style>