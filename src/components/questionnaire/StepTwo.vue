<!--
  This is the second step of the questionnaire. It asks for the user's bank account information.
  The user is asked to provide their checking account and savings account numbers.
-->
<template>
  <div class="form-container">
    <h2 class="header">Bankinformasjon</h2>
    <p>Vi vil trenge bankinformasjonen for dette</p>
    <div class="account-form">
      <label for="checkingAccountInput">Brukskonto:</label>
      <input
        id="checkingAccountInput"
        class="account-input"
        :value="formattedCheckingAccount"
        @input="formattedCheckingAccount = ($event.target as HTMLInputElement).value"
        placeholder="xxxx xx xxxxx"
        maxlength="13"
        minlength="13"
        required
      />
      <div v-if="formErrors.checkingAccount" class="error">{{ formErrors.checkingAccount }}</div>
      <div class="input-gap"></div>
      <label for="savingsAccountInput">Sparekonto:</label>
      <input
        id="savingsAccountInput"
        class="account-input"
        :value="formattedSavingsAccount"
        @input="formattedSavingsAccount = ($event.target as HTMLInputElement).value"
        placeholder="xxxx xx xxxxx"
        maxlength="13"
        minlength="13"
        required
      />
      <div v-if="formErrors.savingsAccount" class="error">{{ formErrors.savingsAccount }}</div>
    </div>
    <div class="button-container">
      <FormButton type="button" @click="goBack">Back</FormButton>
      <FormButton type="submit" @click="goToNextStep">Next</FormButton>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, defineEmits, onMounted, computed } from "vue";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import FormButton from "@/components/forms/FormButton.vue";

const emit = defineEmits(["update-step"]);
const store = useQuestionnaireStore();

const checkingAccount = ref(store.stepTwoData.checkingAccount);
const savingsAccount = ref(store.stepTwoData.savingsAccount);

const formErrors = ref({
  checkingAccount: "",
  savingsAccount: "",
});

const formattedCheckingAccount = computed({
  get: () => formatAccountNumber(checkingAccount.value),
  set: (val) => {
    val = val.replace(/\s/g, '').replace(/\D/g, '');
    checkingAccount.value = isNaN(parseInt(val)) ? '' : val;
  }
});

const formattedSavingsAccount = computed({
  get: () => formatAccountNumber(savingsAccount.value),
  set: (val) => {
    val = val.replace(/\s/g, '').replace(/\D/g, '');
    savingsAccount.value = isNaN(parseInt(val)) ? '' : val;
  }
});

function formatAccountNumber(number: string) {
  const digits = number.replace(/\D/g, '').substring(0, 11); 
  return formatAsBankAccount(digits);
}

function formatAsBankAccount(digits: string) {
  if (digits.length <= 4) {
    return digits;
  } else if (digits.length <= 6) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  } else {
    return `${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
  }
}

function isFormValid() {
  const pureChecking = checkingAccount.value.replace(/\s/g, '');
  const pureSavings = savingsAccount.value.replace(/\s/g, '');
  formErrors.value.checkingAccount = pureChecking.length === 11 ? "" : "Brukskonto må inneholde nøyaktig 11 sifre.";
  formErrors.value.savingsAccount = pureSavings.length === 11 ? "" : "Sparekonto må inneholde nøyaktig 11 sifre.";

  return !formErrors.value.checkingAccount && !formErrors.value.savingsAccount;
}

function goToNextStep() {
  if (isFormValid()) {
    store.updateStepTwoData({
      checkingAccount: checkingAccount.value.replace(/\s/g, ''),
      savingsAccount: savingsAccount.value.replace(/\s/g, ''),
    });
    emit("update-step", 3);
  }
}

function goBack() {
  emit("update-step", 1);
}

onMounted(() => {
  checkingAccount.value = store.stepTwoData.checkingAccount;
  savingsAccount.value = store.stepTwoData.savingsAccount;
});
</script>

<style scoped>
.account-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 35px;
}

.account-input {
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 0;
  width: 100%;
}

.form-button {
  width: 100%; 
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
}

.input-gap {
  margin-bottom: 15px;
}

.error {
  color: #E57373;
}
</style>
@/stores/QuestionnaireStore