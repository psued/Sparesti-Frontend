<template>
  <router-link to="/budgetpage" class="back-arrow">
    ← Månedtlig Budsjett
  </router-link>

  <div class="budget-details">
    <div class="budget-left">
      <h2>Resterende budsjett</h2>
      <p>{{ remainingBudget }} kr av {{ totalBudget }} kr</p>
      <progress-bar :value="remainingBudget" :max="totalBudget"></progress-bar>
    </div>
  </div>

  <div class="expenses">
    <div class="header-container">
      <h3>Utgifter</h3>
      <button class="add-category-btn" @click="addCategory">
        <span class="add-category-icon">➕</span> Legg til kategori
      </button>
    </div>

    <ul>
      <li v-for="(expense, category) in expenses" :key="category">
        <span class="emoji">{{ expense.emoji }}</span>
        <span class="category">{{ category }}</span>
        <span class="amount"
          >{{ expense.left }} kr igjen av {{ expense.total }} kr</span
        >
        <progress-bar :value="expense.left" :max="expense.total"></progress-bar>
      </li>
    </ul>
  </div>

  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="toggleModal">&times;</span>
      <h3>Legg til en ny utgift</h3>
      <form @submit.prevent="handleNewCategory">
        <input v-model="newCategory.emoji" placeholder="Emoji (eks. 🍔)" />
        <input v-model="newCategory.name" placeholder="Kategori navn" />
        <input
          v-model.number="newCategory.total"
          type="Total sum"
          placeholder="Total Amount"
        />
        <button type="submit">Lagre</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BudgetProgressBar from "./BudgetProgressBar.vue";
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";
import { addRowToUserBudget, getBudgetByUser } from "@/api/budgetHooks";

const userStore = useUserStore();

const props = defineProps({
  remainingBudget: {
    type: Number,
    default: 6969,
  },
  totalBudget: {
    type: Number,
    default: 10000,
  },
});

type ExpenseCategory = "Kvitteringer" | "Mat" | "Klær" | "Fritid" | "Betting";

type Expense = {
  [key in ExpenseCategory]: {
    left: number;
    total: number;
    emoji: string;
  };
};

const expenses: Expense = reactive({
  Kvitteringer: { left: 2000, total: 4000, emoji: "🧾" },
  Mat: { left: 1500, total: 2500, emoji: "🍞" },
  Klær: { left: 400, total: 1000, emoji: "👕" },
  Fritid: { left: 2700, total: 3000, emoji: "🍻" },
  Betting: { left: 1250, total: 2000, emoji: "🎲" },
});

const showModal = ref(false);
const newCategory = reactive({ name: "", total: 0, emoji: "" });

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const addCategory = () => {
  console.log("Add new category function triggered");
  showModal.value = true; // Open the modal
};

const handleNewCategory = () => {
  expenses[newCategory.name as keyof typeof expenses] = {
    left: newCategory.total,
    total: newCategory.total,
    emoji: newCategory.emoji,
  };
  addRowToUserBudget(
    userStore.getUserId,
    "string",
    0,
    newCategory.total,
    newCategory.name,
    newCategory.emoji,
  );
  toggleModal(); // Close modal after adding the category
  newCategory.name = "";
  newCategory.total = 0;
  newCategory.emoji = "";
};

onMounted(async () => {
  try {
    const userId = userStore.getUserId;

    console.log(userId);

    const expensesResponse = await getBudgetByUser(userId);

    console.log(expensesResponse);

    if (expensesResponse) {
      for (const entry of expensesResponse) {
        for (const row of entry.row) {
          const { category, usedAmount, maxAmount, emoji } = row;
          // Use category from row as the key for expenses
          expenses[category as ExpenseCategory] = {
            left: usedAmount, // Assuming usedAmount represents the left amount
            total: maxAmount, // Assuming maxAmount represents the total amount
            emoji: emoji, // Hardcoding emoji for now
          };
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// Components must be registered in setup if used in the template
const ProgressBar = BudgetProgressBar;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.expenses {
  margin: 15px;
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

.add-category-btn {
  padding: 0 1rem;
  width: max-content;
  display: flex;
  background-color: #a6cd94;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 0.15rem;
  cursor: pointer;
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.close {
  float: right;
  font-size: 28px;
  cursor: pointer;
}
</style>
