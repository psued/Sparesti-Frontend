<template>
  <div>
    <button v-if="allBudgetsExpired" @click="toggleRenewModal">Forny Budsjett</button>
    <div v-if="showRenewModal" class="modal" @click.self="showRenewModal = false">
      <div class="modal-content">
        <span class="close" @click="toggleRenewModal">&times;</span>
        <h3>Forny Budsjett</h3>
        <form @submit.prevent="renewBudgets">
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
                :endDate="budget.expiryDate"
    />
  </div>
</template>

<script setup lang = "ts" >
import BudgetPage from "@/components/budget/BudgetPage.vue";
import {onMounted, ref, computed, reactive} from "vue";
import { useRoute } from "vue-router";
import {
  getBudgetByUser,
  getBudgetById,
  getNewestBudget,
  renewBudget,
  renewBudgetWithCategories,
  getBudgetWithNewestExpiryDate, addBudgetWithRow
} from "@/api/budgetHooks";
import type {Budget} from "@/types/Budget";
import EmojiPickerComponent from "@/components/assets/EmojiPickerComponent.vue";
import { categories } from "@vueuse/core/metadata.mjs";

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
const showRenewModal = ref(false);
const newBudget = reactive({ name: "", startDate: "", endDate: "" });


const toggleModal = async () => {
  const newestBudget = await getNewestBudget();
  console.log(newestBudget);
  showModal.value = !showModal.value;
};

const toggleRenewModal = () => {
  showRenewModal.value = !showRenewModal.value;
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

const renewBudgets = async () => {
  const allBudgets = await getBudgetByUser();
  console.log(allBudgets);
  if (allBudgets !== null) {
    const latestExpiryBudget = allBudgets.reduce((latest, current) => {
      return new Date(latest.expiryDate) > new Date(current.expiryDate) ? latest : current;
    });
    await addBudgetWithRow(newBudget.name, newBudget.startDate, newBudget.endDate, latestExpiryBudget);
  } else {
    console.error("No newest budget found");
  }
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

const route = useRoute();
const budgetDetails = reactive({
  name: "",
  startDate: "",
  endDate: "",
  categories: [],
});

const renewCurrentBudget = async () => {
  if (!budgetDetails.name || !budgetDetails.startDate || !budgetDetails.endDate) {
    alert("Fyll ut alle feltene!");
    return;
  }

  try {
    const currentBudget = await getBudgetById(Number(route.params.id)); // Get the current budget ID from route
    if (!currentBudget) {
      console.error("No current budget found with id:", route.params.id);
      return;
    }

    // Use currentBudget.id as the oldBudgetId
    const renewalResponse = await renewBudgetWithCategories(
      currentBudget.id, // Pass the current budget ID as oldBudgetId
      budgetDetails.name,
      budgetDetails.startDate,
      budgetDetails.endDate
    );

    if (!renewalResponse) {
      console.error("Failed to renew budget due to an API issue");
      return;
    }

    console.log("Budget renewed with categories");
  } catch (error) {
    console.error("Failed to renew budget:", error);
    if ((error as any).response) {
      console.error("API responded with:", (error as any).response.status, (error as any).response.data);
    }
  }
};

</script>

<style scoped>

.invalid {
  color: red;
}

</style>

