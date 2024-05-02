<template>
  <div>
    <button v-if="allBudgetsExpired" @click="renewBudgets">Forny Budsjett</button>
    <button v-if="noBudgets" @click="toggleModal">Lag et budsjett</button>
    <div v-if="showModal" class="modal" @click.self="showModal = false">
      <div class="modal-content">
        <span class="close" @click="toggleModal">&times;</span>
        <h3>Lag et nytt budsjett</h3>
        <form @submit.prevent="createBudget">
          <input class="input-margin" v-model="newBudget.name" placeholder="Budsjettets navn" />
          <div class="form-group">
            <div>
              <label for="deadline">Startdato:</label>
            </div>
            <input
                type="date"
                id="deadline"
                v-model="newBudget.startDate"
            />
            <div class="form-group">
              <div>
                <label for="deadline">Deadline:</label>
              </div>
              <input
                  type="date"
                  id="deadline"
                  v-model="newBudget.endDate"
                  :min="newBudget.startDate"
              />
            </div>
          </div>
          <p v-if="invalidFormat" class="invalid"> Vennligst fyll ut alle feltene</p>
          <button type="submit">Lagre</button>
        </form>
      </div>
    </div>
    <BudgetPage v-for="(budget, index) in budgetData"
                :name="budget.name"
                :key="index"
                :id="budget.id"
                :budget="calculateRemainingBudget(budget)"
                :totalBudget="calculateTotalBudget(budget)"
                :remainingBudget="calculateRemainingBudget(budget)"
                :daysLeft="calculateDaysLeft(budget)"
    />
  </div>
</template>

<script setup lang = "ts" >
import BudgetPage from "@/components/budget/BudgetPage.vue";
import {onMounted, ref, computed, reactive} from "vue";
import {getBudgetByUser, renewBudget} from "@/api/budgetHooks";
import type {Budget} from "@/types/Budget";
import EmojiPickerComponent from "@/components/assets/EmojiPickerComponent.vue";

const budgetData = ref<Budget[]>([]);
onMounted(async () => {
  const expensesResponse = await getBudgetByUser();
  if (expensesResponse) {
    budgetData.value = expensesResponse;
    budgetData.value.sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());
    console.log(budgetData.value);
  }
});

const invalidFormat = ref(false);

const showModal = ref(false);
const newBudget = reactive({ name: "", startDate: "", endDate: "" });


const toggleModal = () => {
  showModal.value = !showModal.value;
};

const allBudgetsExpired = computed(() => {
  return budgetData.value.length > 0 && budgetData.value.every(budget => calculateDaysLeft(budget) <= 0);
});

const noBudgets = computed(() => {
  return budgetData.value.length === 0;
});

const createBudget = () => {
  console.log(newBudget.endDate);
  if (newBudget.name === '' || newBudget.startDate === '' || newBudget.endDate === '') {
    invalidFormat.value = true;
    return;
  }
  renewBudget(newBudget.name, newBudget.startDate, newBudget.endDate);
  toggleModal(); // Close modal after adding the category
  newBudget.name = '';
  newBudget.startDate = '';
  newBudget.endDate = '';
};

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

<style scoped>

.invalid {
  color: red;
}

</style>

