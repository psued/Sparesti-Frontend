<template>
  <svg class="circular-progress">
    <circle class="bg"></circle>
    <circle class="fg"></circle>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  completionPercentage: Number,
});
</script>

<style scoped>
.circular-progress {
  --size: 12rem;
  width: var(--size);
  height: var(--size);
  viewbox: 0 0 var(--size) var(--size);
  --half-size: calc(var(--size) / 2);
  --stroke-width: 0.7rem;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
  animation: progress-animation 0.5s linear 0.1s forwards;
}

.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}

.circular-progress circle.bg {
  stroke: #f3f2f0;
}

.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
}

@property --progress {
  syntax: "<number>";
  inherits: false;
  initial-value: v-bind(completionPercentage);
}

@keyframes progress-animation {
  from {
    --progress: 0;
  }
  to {
    stroke: #f5c116;
    --progress: v-bind(completionPercentage);
  }
}
</style>
