<template>
  <router-link to="/budgetpage" class="back-arrow"> ← Monthly Budget </router-link>

  <div class="budget-details">
    <div class="budget-left">
      <h2>Left to Spend</h2>
      <p>{{ remainingBudget }} kr out of {{ totalBudget }} kr</p>
      <progress-bar :value="remainingBudget" :max="totalBudget"></progress-bar>
    </div>
  </div>

  <div class="expenses">
      <h3>Expenses</h3>
      <ul>
        <li v-for="(expense, category) in expenses" :key="category">
          <span class="emoji">{{ expense.emoji }}</span>
          <span class="category">{{ category }}</span>
          <span class="amount">{{ expense.left }} kr left of {{ expense.total }} kr</span>
          <progress-bar :value="expense.left" :max="expense.total"></progress-bar>
        </li>
      </ul>
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import BudgetProgressBar from "./BudgetProgressBar.vue";

export default defineComponent({
  components: {
    'progress-bar': BudgetProgressBar,
  },
  props: {
    remainingBudget: {
    type: Number,
    default: () => 6969,
    },
    totalBudget: {
    type: Number,
    default: () => 10000,
    }
  },
  data() {
    return {
      expenses: {
        Bills: { left: 2000, total: 4000, emoji: '🧾' },
        Food: { left: 1500, total: 2500, emoji: '🍞' },
        Clothes: { left: 400, total: 1000, emoji: '👕' },
        FreeTime: { left: 2700, total: 3000, emoji: '🍻' }
      }
    }
  }
});
</script>

<style scoped>
  .back-arrow {
    font-size: 24px;
    color: #333;
    text-decoration: none; 
    padding-bottom: 10px;
    display: block; 
  }

  .budget-details {
    background-color: #a6cd94; 
    border: solid 1px #c9d6b8; 
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
    padding: 15px;
    margin: 15px;
  }

  .budget-details h2 {
    position: relative;
    display: inline-block;
  }

  .budget-details h2::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 3px;
    background-color: #443e3e;
  }

  .budget-details p {
    display: flex;
    flex-direction: column;
    text-align: left;
    color: #eeeeee;
    padding: 3px;
  }

  .expenses h3 {
    position: relative;
    display: inline-block;
    font-size: 24px;
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
    
  }

  .expenses ul {
    margin: 0;
    padding: 0;
  }

  .expenses li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #171814; 
    padding-bottom: 10px; 
  }

  .expenses li:not(:last-of-type) {
    border-bottom: 1px solid #171814; 
  }

  .emoji {
    font-size: 24px;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .category {
    flex: 1;
    margin-right: 5px;
    font-weight: bold;
  }

  .amount {
    white-space: nowrap;
    flex-shrink: 0;
    margin-right: 10px;
  }

</style>
