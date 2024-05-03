<!--
This component is used to display a progress bar that shows the completion percentage of the questionnaire.
The completion percentage is passed as a prop to this component.
-->

<template>
  <div class="progress-bar-container">
    <div class="progress-bar" :style="{ width: progressWidth }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  completionPercentage: Number,
});

const progressWidth = computed(() => `${props.completionPercentage}%`);
</script>

<style scoped>
.progress-bar-container {
  position: absolute;
  width: 100%;
  height: 10px;
  top: 0;
}
.progress-bar {
  height: 100%;
  background-color: #f09217;
  transition: width 0.2s ease-in-out;
  border: none;
  border-radius: 0;
}
</style>
