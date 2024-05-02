<template>
  <div class="form-container">
    <h2>Dine transaksjoner</h2>
    <div v-if="isLoading">Laster inn transaksjoner...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="transactions.length">
      <p>Vi har hentet ut transaksjoner du har gjort de siste 30 dagene. <br> Hvilke plasser vil du bruke mindre penger på?</p>
      <ul class="transaction-list">
        <li v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
          <div class="checkbox-container">
            <input type="checkbox" v-model="selectedCategories[transaction.category]">
          </div>
          <div class="category-container">
            {{ transaction.category }}
          </div>
          <div class="amount-container">
            {{ transaction.amount.toFixed(2) }} kr
          </div>
        </li>
      </ul>
    </div>
    <div class="button-container">
      <FormButton @click="goBack">Tilbake</FormButton>
      <FormButton @click="goToNextStep">Neste</FormButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, computed } from 'vue';
import { getRecentTransactionsSorted } from '@/api/bankHooks';
import FormButton from '@/components/forms/FormButton.vue';
import { useUserStore } from '@/stores/userStore';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import { updateUserInfo } from '@/api/userHooks';

const emit = defineEmits(["update-step"]);
const store = useQuestionnaireStore();
const transactions = ref([]);
const isLoading = ref(false);
const error = ref('');
const selectedCategories = ref({});
const userStore = useUserStore();

onMounted(async () => {
  try {
    const accountNr = Number(store.stepTwoData.checkingAccount);
    const data = await getRecentTransactionsSorted(accountNr);
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      transactions.value = Object.keys(data).map(category => ({
        id: category,
        category: category,
        amount: Math.abs(data[category])
      }));
    } else {
      throw new Error("Ingen transaksjoner funnet");
    }
  } catch (err) {
    console.error("Feilet:", err);
    error.value = err.message || "Greide  ikke å laste inn transaksjoner.";
  } finally {
    isLoading.value = false;
  }
});

const selectedBudgettingLocations = computed(() => {
  return Object.entries(selectedCategories.value)
    .filter(([_, isSelected]) => isSelected)
    .map(([category, _]) => category);
})

async function finishUpdate() {
  const userInfo = {
    ...userStore.userInfo,
    budgetingLocations: selectedBudgetingLocations.value
  };
  const result = await updateUserInfo(userInfo);
  if (result) {
    console.log('User info updated successfully!');
  } else {
    console.error('Failed to update user info');
  }
}

function goBack() {
  emit("update-step", 4);
}

function goToNextStep() {
  finishUpdate();
  emit("update-step", 6);
}
</script>

<style scoped>
.transaction-list {
  list-style: none;
  padding: 0;
}

.transaction-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: justify;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.checkbox-container {
  margin-right: 10px; /* Space between checkbox and category */
}

.category-container {
  flex-grow: 1; /* Allows the category to take up any extra space */
}

.amount-container {
  white-space: nowrap; /* Ensures the amount does not wrap */
}
</style>
