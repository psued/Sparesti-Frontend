<template>
    <div>
      <h2>Lets get you started 3...</h2>
      <input v-model="annualIncome" placeholder="Annual Income" />
      <input type="range" v-model="changeWillingness" min="1" max="5" />
      <button @click="emitUpdateStep(4)">Next</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits, watchEffect } from 'vue';
  
  const emit = defineEmits(['update-step']);
  const annualIncome = ref('');
  const changeWillingness = ref(3);
  
  function emitUpdateStep(step: number) {
    emit('update-step', step);
  }
  </script>
  