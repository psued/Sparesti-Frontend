<template>
    <div class="budget-overview" @click="showDetails">
      
      <div class="budget-summary">
        <h2>Monthly Budget</h2>
        <p>{{ budget }} kr of {{ totalBudget }} kr</p>
        <progress-bar :value="budget" :max="totalBudget"></progress-bar>
        <span>{{ daysLeft }} Days Left</span>
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
      budget: Number,
      totalBudget: Number,
      daysLeft: Number
    },

    methods: {
      showDetails() {
        this.$emit('showDetails');
      }
    }

  });
  </script>
  