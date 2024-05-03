<template>
  <router-link to="/budgetpage" class="back-arrow">
    ← Månedtlig Budsjett
  </router-link>

  <div class="budget-details">
    <div class="budget-left">
      <h2>Resterende budsjett</h2>
      <p>{{ leftAmount }} kr av {{ totalAmount }} kr</p>
      <progress-bar :value="leftAmount" :max="totalAmount"></progress-bar>
    </div>
  </div>

  <div class="expenses">
    <div class="header-container">
      <h3>Utgifter</h3>
      <div class="add-and-delete-category">
        <button class="add-category-btn" @click="addCategory">
          <span class="add-category-icon">➕</span> Tildel transaksjon til kategori
        </button>
        <button class="add-category-btn" @click="addCategory">
          <span class="add-category-icon">➕</span> Legg til kategori
        </button>
        <button class="delete-category-btn" @click="toggleDeleteMode">
          <span class="add-category-icon">➖</span> {{ deleteMode ? 'Slett' : 'Slett kategori' }}
        </button>
        <button v-if="deleteMode" @click="toggleCancelDeleteMode">Avbryt</button>
      </div>
    </div>

    <ul>
      <li v-for="(expense, category) in expenses" :key="category">
        <input v-if="deleteMode" type="checkbox" v-model="expense.selected">
        <span class="emoji">{{ expense.emoji }}</span>
        <span class="category">{{ category }}</span>
        <span class="amount"
          >{{ expense.left }} kr igjen av {{ expense.total }} kr</span
        >
        <progress-bar :value="expense.left" :max="expense.total"></progress-bar>
      </li>
    </ul>
  </div>

  <div v-if="showModal" class="modal" @click.self="showModal = false">
    <div class="modal-content">
      <span class="close" @click="toggleModal">&times;</span>
      <h3>Legg til en ny utgift</h3>
      <form @submit.prevent="handleNewCategory">
        <h4>Trykk på smilefjeset og velg emoji</h4>
        <EmojiPickerComponent @pickEmoji="updateEmoji" :emoji-prop="emoji"/>
        <input class="input-margin" v-model="newCategory.name" placeholder="Kategori navn" />
        <input class="input-margin" v-model.number="newCategory.total" type="Total sum" placeholder="Total Amount" />
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
import {addRowToUserBudget, deleteBudgetRow, getBudgetById, getBudgetByUser} from "@/api/budgetHooks";
import {useRoute} from "vue-router";
import EmojiPickerComponent from "@/components/assets/EmojiPickerComponent.vue";

const userStore = useUserStore();

const deleteMode = ref(false);

const emoji = ref("");

function updateEmoji(newEmoji: string) {
  emoji.value = newEmoji;
}

let totalAmount = 0;
let leftAmount= 0;

const props = defineProps({
  remainingBudget: {
    type: Number,
  },
  totalBudget: {
    type: Number,

  },
});

type ExpenseCategory = "";

type Expense = {
  [key: string]: {
    left: number;
    total: number;
    emoji: string;
    id: number;
    selected: boolean;
  };
};

const expenses: Expense = reactive({});

const showModal = ref(false);
const newCategory = reactive({ name: "", total: 0, emoji: "" });

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const route = useRoute();

const toggleDeleteMode = async () => {
  if (deleteMode.value) {
    for (const category in expenses) {
      if (expenses[category].selected) {
        const budgetId = Number(route.params.id);
        console.log("Deleting category: ", expenses[category].id);
        await deleteBudgetRow(budgetId, expenses[category].id);
        delete expenses[category];
      }
    }
  }
  deleteMode.value = !deleteMode.value;
};

const toggleCancelDeleteMode = () => {
  deleteMode.value = false;
};

const addCategory = () => {
  console.log("Add new category function triggered");
  showModal.value = true; // Open the modal
};

const handleNewCategory = async () => {
  await addRowToUserBudget(
      "string",
      0,
      newCategory.total,
      newCategory.name,
      emoji.value,
      Number(route.params.id),
  );
  toggleModal(); // Close modal after adding the category
  newCategory.name = '';
  newCategory.total = 0;
  newCategory.emoji = '';

  const expensesResponse = await getBudgetById(Number(route.params.id));

  if (expensesResponse && expensesResponse.row) {
    for (const entry of expensesResponse.row) {
      const {category, usedAmount, maxAmount, emoji, id} = entry;
      expenses[category as ExpenseCategory] = {
        left: usedAmount, // Assuming usedAmount represents the left amount
        total: maxAmount, // Assuming maxAmount represents the total amount
        emoji: emoji,
        id: id,
        selected: false
      };
      totalAmount += maxAmount;
      leftAmount += usedAmount;
    }
  }
};

onMounted(async () => {
  try {

    const expensesResponse = await getBudgetById(Number(route.params.id));

    if (expensesResponse && expensesResponse.row) {
      for (const entry of expensesResponse.row) {
        const {category, usedAmount, maxAmount, emoji, id} = entry;
        expenses[category as ExpenseCategory] = {
          left: usedAmount, // Assuming usedAmount represents the left amount
          total: maxAmount, // Assuming maxAmount represents the total amount
          emoji: emoji,
          id: id,
          selected: false
        };
        totalAmount += maxAmount;
        leftAmount += usedAmount;
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

.input-margin {
  margin-top: 10px;
}

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

  .add-and-delete-category {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

.delete-category-btn {
  padding: 0 1rem;
  width: max-content;
  display: flex;
  background-color: #f14306;
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

.delete-button{
  background-color: #ff0000;
  color: #ffffff;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}

</style>
