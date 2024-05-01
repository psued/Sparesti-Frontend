<template>
  <div>

    <BudgetPage v-for="(budget, index) in budgetData"
                :name="budget.name"
                :key="index"
                :id="budget.id"
                :budget="calculateRemainingBudget(budget)"
                :totalBudget="calculateTotalBudget(budget)"
                :remainingBudget="calculateRemainingBudget(budget)"
                :daysLeft="calculateDaysLeft(budget)"
    />

    <button v-if="allBudgetsExpired" @click="renewBudgets">Renew budgets</button>
  </div>
</template>

<script setup lang = "ts" >
import BudgetPage from "@/components/budget/BudgetPage.vue";
import {onMounted, ref, computed} from "vue";
import {getBudgetByUser} from "@/api/budgetHooks";
import type {Budget} from "@/types/Budget";

const budgetData = ref<Budget[]>([]);
onMounted(async () => {
  const expensesResponse = await getBudgetByUser();
  if (expensesResponse) {
    budgetData.value = expensesResponse;
    budgetData.value.sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());
    console.log(budgetData.value);
  }
});

const allBudgetsExpired = computed(() => {
  return budgetData.value.every(budget => calculateDaysLeft(budget) <= 0);
});

const renewBudgets = () => {
  console.log("hællæ");
};

const calculateTotalBudget = (budget: Budget) => {
  return budget.row.reduce((total, row) => total + row.maxAmount, 0);
};

const calculateRemainingBudget = (budget: Budget) => {
  return budget.row.reduce((total, row) => total + row.usedAmount, 0);
};

const calculateDaysLeft = (budget: Budget) => {
  const expiryDate = new Date(budget.expiryDate);
  const currentDate = new Date();
  const differenceInTime = expiryDate.getTime() - currentDate.getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};

</script>

