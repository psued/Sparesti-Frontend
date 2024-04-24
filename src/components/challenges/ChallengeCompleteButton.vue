<template>
  <div v-bind:class="[!completeButtonPressed ? 'challengeCompleteButton' : 'challengeCompleteButtonPressed']" @mousedown="completeButtonDown" @mouseup="completeButtonUp">Complete!</div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const completeButtonPressed = ref(false);
const completeButtonDown = () => {
  completeButtonPressed.value = true
  console.log('hei')
}
const completeButtonUp = () => {
  completeButtonPressed.value = false
  console.log('hade')
}
</script>

<style scoped>
.challengeCompleteButton {
  margin: auto;
  padding: 0 1rem;
  width: max-content;
  display: flex;
  background-color: dimgray;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 10px;
  border-style: none solid solid none;
  border-width: 0.15rem;
  border-color: #494949FC;
  cursor: pointer;
}

.challengeCompleteButtonPressed {
  margin: auto;
  padding: 0 1rem;
  width: max-content;
  display: flex;
  background-color: dimgray;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 10px;
  border-style: solid none none solid;
  cursor: pointer;
  border-color: #A6CD94;
}
</style>