<template>
  <div class="form-container">
    <h2>Dine transaksjoner</h2>
    <div v-if="isLoading">Laster inn transaksjoner...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="transactions.length">
      <p>Vi har hentet ut transaksjoner du har gjort de siste 30 dagene. <br> Hvilke plasser vil du bruke mindre penger på?</p>
      <ul class="transaction-list">
        <li v-for="transaction in transactions" :key="transaction.id">
          <label>
            <input type="checkbox" v-model="selectedCategories[transaction.category]">
            {{ transaction.category }} - {{ transaction.amount }}/mo
          </label>
        </li>
      </ul>
    </div>
    <div class="button-container">
      <FormButton @click="goBack">Tilbake</FormButton>
      <FormButton @click="goToNextStep">Neste</FormButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { getRecentTransacitonsSorted } from '@/api/bankHooks';
import FormButton from '@/components/forms/FormButton.vue';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';

const emit = defineEmits(["update-step"]);
const store = useQuestionnaireStore();
const transactions = ref([]);
const isLoading = ref(false);
const error = ref('');
const selectedCategories = ref({});

onMounted(async () => {
  try {
    const accountNr = store.stepTwoData.checkingAccount;
    const data = await getRecentTransacitonsSorted(accountNr);
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      transactions.value = Object.keys(data).map(category => ({
        id: category,
        category: category,
        amount: Math.abs(data[category])
      }));
    } else {
      throw new Error("Data is not in the expected format or is empty");
    }
  } catch (err) {
    console.error("Error loading transactions or bad data:", err);
    error.value = err.message || "Failed to load transactions.";
  } finally {
    isLoading.value = false;
  }
});

function goBack() {
  emit("update-step", 4);
}

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
