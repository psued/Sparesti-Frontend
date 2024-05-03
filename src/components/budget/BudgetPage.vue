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
    },
    totalBudget: {
      type: Number,
    },
    remainingBudget: {
      type: Number,
    },
    endDate: {
      type: String,
      required: true,
    },
  });

  const displayName = computed(() => {
    return props.name !== null ? props.name : "Månedlig budsjett";
  });
  
  const daysLeft = computed(() => {
  const today = new Date();
  const end = new Date(props.endDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const timeLeft = end.getTime() - today.getTime();
  const days = Math.ceil(timeLeft / msPerDay);
    return days > 0 ? days : 0;
  });

  const expiredClass = computed(() => {
    return daysLeft.value <= 0 ? 'expired' : '';
  });

const ProgressBar = BudgetProgressBar;
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
  