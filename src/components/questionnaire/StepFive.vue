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
      <FormButton type="submit" @click="updateAccounts">Update</FormButton>
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
  get: () => checkingAccount.value.replace(/(\d{4})(?=\d)/g, '$1 '),
  set: (val) => {
    checkingAccount.value = val.replace(/\s/g, '');
  }
});

const formattedSavingsAccount = computed({
  get: () => savingsAccount.value.replace(/(\d{4})(?=\d)/g, '$1 '),
  set: (val) => {
    savingsAccount.value = val.replace(/\s/g, '');
  }
});

async function updateAccountNumbers() {
  isLoading.value = true;
  try {
    const response = await updateAccounts(
      formattedCheckingAccount.value.replace(/\s/g, ''), 
      formattedSavingsAccount.value.replace(/\s/g, '')
    );
    console.log('Update successful:', response);
  } catch (err) {
    error.value = `Failed to update accounts: ${err.message}`;
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

function goBack() {
  emit('update-step', 4);
}
</script>
