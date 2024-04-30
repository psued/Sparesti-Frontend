<template>
  <div class="form-container">
    <h2>Your Transactions</h2>
    <div v-if="isLoading">Loading transactions...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="transactions.length">
      <ul class="transaction-list">
        <li v-for="transaction in transactions" :key="transaction.id">
          <span>{{ transaction.date }} - {{ transaction.description }}</span>
          <span>{{ transaction.amount }}</span>
        </li>
      </ul>
    </div>
    <div class="button-container">
      <FormButton @click="goToNextStep">Sjekke utfordringer</FormButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { getBankAccountRecentTransactions } from '@/api/bankHooks';
import FormButton from '@/components/forms/FormButton.vue';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';

const emit = defineEmits(["update-step"]);
const store = useQuestionnaireStore();
const transactions = ref([]);
const isLoading = ref(false);
const error = ref('');

onMounted(async () => {
  isLoading.value = true;
  try {
    const accountNr = store.stepTwoData.checkingAccount; 
    const data = await getBankAccountRecentTransactions(accountNr);
    transactions.value = data.transactions;
  } catch (err) {
    console.error("Error loading transactions:", err);
    error.value = "Failed to load transactions.";
  } finally {
    isLoading.value = false;
  }
});

function goToNextStep() {
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
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
