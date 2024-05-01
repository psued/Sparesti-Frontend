<template>
    <router-link :to="`/details/${id}`" tag="div" class="budget-overview" :class="expiredClass">
      <div class="budget-summary">
        <h2>{{ displayName }}</h2>
        <p>{{ budget }} kr av {{ totalBudget }} kr</p>
        <span>{{ daysLeft <= 0 ? 'Expired' : daysLeft + ' Dager Igjen' }}</span>
        <progress-bar :value="budget" :max="totalBudget"></progress-bar>
      </div>
    </router-link>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import BudgetProgressBar from "@/components/budget/BudgetProgressBar.vue";
  import { defineProps } from "vue";
  
  const props = defineProps({
    name: {
      type: String,
      default: "Månedlig budsjett",
    },
    id: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      default: () => Math.floor(Math.random() * 10000),
    },
    totalBudget: {
      type: Number,
      default: () => 10000,
    },
    remainingBudget: {
      type: Number,
      default: () => 6969,
    },
    daysLeft: {
      type: Number,
      default: () => Math.floor(Math.random() * 30),
    },
  });

  const displayName = computed(() => {
    return props.name !== null ? props.name : "Månedlig budsjett";
  });
  
  const ProgressBar = BudgetProgressBar;

  const expiredClass = computed(() => {
    return props.daysLeft <= 0 ? 'expired' : '';
  });
  </script>
  
  <style scoped>

  .expired {
    background-color: grey !important;
  }
  .budget-overview {
    background-color: #a6cd94;
    border: solid 1px #c9d6b8;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 15px;
    height: 17vh;
    display: block;
  }
  
  .budget-summary h2 {
    position: relative;
    display: inline-block;
    color: black;
  }
  
  .budget-summary h2::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 3px;
    background-color: #443e3e;
  }
  
  .budget-summary p,
  span {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    color: #eeeeee;
    padding: 3px;
  }
  </style>
  