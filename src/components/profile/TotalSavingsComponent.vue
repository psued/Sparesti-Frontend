<template>
  <div class="total-savings-container">
    <div class="total-savings-amount">{{ totalSavingsFormatted }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  totalSavings: Number
});

const totalSavingsFormatted = computed(() => {
	return 5000;
});
</script>

<style scoped>
.total-savings{
	width: 100%;
  height: 100%;
}
</style>