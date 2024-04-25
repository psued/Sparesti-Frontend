<template>
  <div class="saving-goal-overview">
    <h1>Sparemål Oversikt</h1>
    <div>
      <h2>{{ goal.title }}</h2>
      <p>{{ goal.description }}</p>
      <p><strong>Mål i kr (NOK):</strong> {{ goal.value }}</p>
      <div v-if="goal.uploadType === 'image' && goal.image">
        <img :src="goal.image" alt="Uploaded Image">
      </div>
      <div v-if="goal.uploadType === 'icon'">
        <img :src="goal.icon" alt="Selected Icon">
      </div>
      <div v-if="goal.uploadType === 'emoji'">
        <p>{{ goal.emoji }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  goal: Object
});
</script>