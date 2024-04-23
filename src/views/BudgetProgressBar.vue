<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: progressWidth }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    default: 43,
  },
  max: {
    type: Number,
    default: 100,
  }
});

const progressWidth = computed(() => {
  const val = props.value;
  const max = props.max;
  const percentage = max > 0 ? (val / max) * 100 : 0;
  return `${percentage}%`;
});
</script>

<style>
.progress-bar {
  height: 20px;
  width: 70%;
  background-color: #d75a01;
  border: 2px solid #000;
  border-radius: 7px;
  padding: 1px;
  box-sizing: border-box;
}

.progress {
  height: 100%;
  width: auto;
  max-width: calc(100% - 4px);
  background-color: #ffc107;
  border-radius: 5px;
}
</style>
