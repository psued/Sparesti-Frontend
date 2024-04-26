<template>
  <div>
    <div v-if="budgetData && budgetData.length > 0">
      <div v-for="(budgetItem, index) in sortedBudgetData" :key="index" class="budget-overview" :class="{ 'expired-budget': calculateDaysLeft(budgetItem) <= 0 }">
        <router-link :to="{ name: 'BudgetDetails', params: { id: budgetItem.id } }" tag="div" class="budget-summary">
          <h2>Månedtlig Budsjett</h2>
          <p>{{ calculateBudget(budgetItem) }} kr av {{ calculateTotalBudget(budgetItem) }} kr</p>
          <span v-if="calculateDaysLeft(budgetItem) > 0">{{ calculateDaysLeft(budgetItem) }} Dager Igjen</span>
          <span v-else>Expired</span>
          <progress-bar :value="calculateBudget(budgetItem)" :max="calculateTotalBudget(budgetItem)"></progress-bar>
        </router-link>
      </div>
    </div>
    <div v-else>
      <button @click="showModal = true" class="add-category-btn">Would you like to create a budget?</button>
      <div @click.self="showModal = false" v-if="showModal" class="modal">
        <div @click.stop class="modal-content">
          <span @click="showModal = false" class="close">&times;</span>
          <form @submit.prevent="handleNewBudget">
            <!-- replace with your input fields -->
            <input type="text" v-model="newBudget.name" placeholder="Budget Name">
            <input type="number" v-model="newBudget.total" placeholder="Total Amount">
            <button type="submit">Create Budget</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed, nextTick} from "vue";
import BudgetProgressBar from "./BudgetProgressBar.vue";
import { useUserStore} from "@/stores/userStore";
import { type Budget } from "@/types/Budget";
import {addRowToUserBudget, getBudgetByUser} from "@/api/budgetHooks";

const userStore = useUserStore();
const budgetData = ref<Budget | null>(null);



const calculateTotalBudget = (budgetItem) => {
  let total = 0;
  for (const row of budgetItem.row){
    total += row.maxAmount;
  }
  return total;
};

const calculateBudget = (budgetItem) => {
  let total = 0;
  for (const row of budgetItem.row){
    total += row.usedAmount;
  }
  return total;
};

const calculateDaysLeft = (budgetItem) => {
  const today = new Date();
  const expiryDate = new Date(budgetItem.expiryDate);
  return Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};
onMounted(async () => {
  const userId = userStore.getUserId;
  console.log(userId);
  const expensesResponse = await getBudgetByUser(userId);
  if (expensesResponse) {
    budgetData.value = expensesResponse;
    console.log(budgetData.value);
  }

  const modalRef = ref(null);

  await nextTick();
  modalRef.value.addEventListener('click', (event) => {
    if (event.target === modalRef.value) {
      showModal.value = false;
    }
  });
});

const showModal = ref(false);
const newBudget = ref({ name: '', total: 0 });

const handleNewBudget = () => {
  // handle new budget creation here
  console.log(newBudget.value);
  showModal.value = false;
};

const sortedBudgetData = computed(() => {
  return budgetData.value.slice().sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());
});


const ProgressBar = BudgetProgressBar;


</script>

<style scoped>
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

.expired-budget {
  background-color: gray;
}
</style>
