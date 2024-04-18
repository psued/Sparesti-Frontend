<template>
    <div class="budget-details">
      <div class="budget-left">
        <h2>Left to Spend</h2>
        <p>{{ remainingBudget }} kr out of {{ totalBudget }} kr</p>
        <progress-bar :value="remainingBudget" :max="totalBudget"></progress-bar>
      </div>
      <div class="expenses">
        <h3>Expenses</h3>
        <ul>
          <li v-for="(expense, category) in expenses" :key="category">
            <span>{{ category }}</span>
            <span>{{ expense.left }} kr left of {{ expense.total }} kr</span>
            <progress-bar :value="expense.left" :max="expense.total"></progress-bar>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import BudgetProgressBar from './BudgetProgressBar.vue';
  
  export default defineComponent({
    components: {
      BudgetProgressBar
    },
    props: {
      remainingBudget: Number,
      totalBudget: Number,
      expenses: Object as () => Record<string, { left: number; total: number }>
    }
  });
  </script>
  