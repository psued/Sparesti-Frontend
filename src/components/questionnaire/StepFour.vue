<template>
    <div>
      <h2>Lets get you started 4...</h2>
      <!-- Add inputs for products -->
      <button @click="emitUpdateStep(5)">Next</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineEmits, watchEffect} from 'vue';
  
  const emit = defineEmits(['update-step']);
  
  function emitUpdateStep(step:number) {
    emit('update-step', step);
  }
  </script>
  