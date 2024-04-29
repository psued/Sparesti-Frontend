<template>
  <div id="NewChallengeContainer" >
    <ExitButtonComponent @close="close" id="exitButton"/>
    <div id="header">

    </div>
    <div v-if="!showCreateChallenge && !showGenerateChallenge">
      <h1>New Challenge</h1>

      <ButtonComponent class="button" @click="createChallenge">
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
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import CreateChallengeComponent from "@/components/challenges/CreateChallengeComponent.vue";
import {ref} from "vue";
import ExitButtonComponent from "@/components/assets/ExitButtonComponent.vue";

const showCreateChallenge = ref(false);
const showGenerateChallenge = ref(false);

const createChallenge = () => {
  showCreateChallenge.value = true;
}

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
#exitButton {
  position: absolute;
  top: -7px;
  right: -7px;
  width: 50px;
  height: 50px;
}

#header {
  height: 50px;
}

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

.button {
  margin: 1rem auto;
  cursor: pointer;
  width: 200px;
  height: 50px;
}
</style>