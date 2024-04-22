<template>
    <div>
      <h2>Lets get you started 2...</h2>
      <input v-model="checkingAccount" placeholder="Checking Account Nr." />
      <input v-model="savingsAccount" placeholder="Savings Account Nr." />
      <button @click="emitUpdateStep(3)">Next</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits, watchEffect } from 'vue';
  
  const emit = defineEmits(['update-step']);
  const checkingAccount = ref('');
  const savingsAccount = ref('');
  
  function emitUpdateStep(step: number) {
    emit('update-step', step);
  }
  </script>
  