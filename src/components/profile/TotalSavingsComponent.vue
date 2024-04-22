<template>
  <div class="total-savings-container">
    <div class="total-savings-label">Total Savings:</div>
    <div class="total-savings-amount">{{ formattedTotalSavings }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  totalSavings: {
    type: Number,
    default: 0,
  }
});

const formattedTotalSavings = computed(() => {
  return new Intl.NumberFormat('no-NO', {
    style: 'currency',
    currency: 'NOK'
  }).format(props.totalSavings);
});
</script>

<style scoped>
.total-savings-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.total-savings-label {
  font-weight: bold;
}

</style>