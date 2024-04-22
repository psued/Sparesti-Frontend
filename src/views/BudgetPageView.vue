<template>
  <router-link to="/details" tag="div" class="budget-overview">
    <div class="budget-summary">
      <h2>Monthly Budget</h2>
      <p>{{ budget }} kr of {{ totalBudget }} kr</p>
      <span>{{ daysLeft }} Days Left</span>
      <progress-bar :value="budget" :max="totalBudget"></progress-bar>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BudgetProgressBar from "./BudgetProgressBar.vue";

export default defineComponent({
  components: {
    "progress-bar": BudgetProgressBar,
  },

  props: {
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
  },
});
</script>

<style scoped>
.budget-overview {
  background-color: #a6cd94;
  border: solid 1px #c9d6b8; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
  margin: -1px;
  height: 17vh;
  display: block;
}

.budget-summary h2 {
  position: relative;
  display: inline-block;
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
