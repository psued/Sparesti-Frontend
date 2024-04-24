<template>
  <div class="saving-goal-overview">
    <h1>Sparemål Oversikt</h1>
    <div v-if="savingGoal">
      <h2>{{ savingGoal.title }}</h2>
      <p>{{ savingGoal.description }}</p>
      <p><strong>Total Sparemål: </strong>{{ savingGoal.value }} NOK</p>
      <div v-if="savingGoal.image || savingGoal.icon || savingGoal.emoji">
        <img v-if="savingGoal.image" :src="savingGoal.image" alt="Sparemål Bilde">
        <img v-if="savingGoal.icon" :src="savingGoal.icon" alt="Sparemål Ikon">
        <span v-if="savingGoal.emoji">{{ savingGoal.emoji }}</span>
      </div>
    </div>
    <router-link to="/">Tilbake til opprettelse</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const savingGoal = ref(null);
</script>
