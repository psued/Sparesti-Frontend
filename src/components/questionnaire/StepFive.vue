<template>
  <div class="form-container">
    <h2>Your Bank Accounts</h2>
    <div v-if="isLoading">Loading accounts...</div>
    <div v-if="error">An error occurred: {{ error }}</div>
    <div class="account-form">
      <label for="checkingAccountInput">Checking Account:</label>
      <input id="checkingAccountInput"
             class="account-input"
             v-model="formattedCheckingAccount"
             placeholder="xxxx xxxx xxxx xxxx"
             required>
      <div class="input-gap"></div>
      <label for="savingsAccountInput">Savings Account:</label>
      <input id="savingsAccountInput"
             class="account-input"
             v-model="formattedSavingsAccount"
             placeholder="xxxx xxxx xxxx xxxx"
             required>
    </div>
    <div class="button-container">
      <FormButton type="button" @click="goBack">Back</FormButton>
      <FormButton type="submit" @click="goToNextStep">goToNextStep</FormButton>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import { updateAccounts } from '@/api/userHooks'; // This is the imported function from your API hooks.
import FormButton from '@/components/forms/FormButton.vue';

const store = useQuestionnaireStore();
const isLoading = ref(false);
const error = ref(null);
const emit = defineEmits(['update-step']);

const checkingAccount = ref(store.stepTwoData.checkingAccount);
const savingsAccount = ref(store.stepTwoData.savingsAccount);


const formattedCheckingAccount = computed({
  get: () => checkingAccount.value.replace(/\s/g, ''),
  set: (val) => {
    checkingAccount.value = val.replace(/\s/g, '');
  }
});

const formattedSavingsAccount = computed({
  get: () => savingsAccount.value.replace(/\s/g, ''),
  set: (val) => {
    savingsAccount.value = val.replace(/\s/g, '');
  }
});

async function updateAccountNumbers() {
  isLoading.value = true;
  // Ensure all whitespace is removed before sending
  const formattedChecking = formattedCheckingAccount.value.replace(/\s/g, '');
  const formattedSavings = formattedSavingsAccount.value.replace(/\s/g, '');

  try {
    const response = await updateAccounts(formattedChecking, formattedSavings);
    console.log('Update successful:', response);
    emit('update-step', 6);  // Only proceed if update is successful
  } catch (err) {
    error.value = `Failed to update accounts: ${err.message}`;
    console.error('Error updating accounts:', err);
  } finally {
    isLoading.value = false;
  }
}

function goToNextStep() {
  updateAccountNumbers();
}

function goBack() {
  emit('update-step', 4);
}
</script>
