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
        required
      />
      <div class="input-gap"></div>
      <label for="savingsAccountInput">Sparekonto:</label>
      <input
        id="savingsAccountInput"
        class="account-input"
        :value="formattedSavingsAccount"
        @input="formattedSavingsAccount = ($event.target as HTMLInputElement).value"
        placeholder="xxxx xx xxxxx"
        maxlength="13"
        required
      />
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
import { updateAccounts } from "@/api/userHooks";
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
    val = val.replace(/\s/g, '');
    checkingAccount.value = isNaN(parseInt(val)) ? '' : val;
  }
});

const formattedSavingsAccount = computed({
  get: () => formatAccountNumber(savingsAccount.value),
  set: (val) => {
    val = val.replace(/\s/g, '');
    savingsAccount.value = isNaN(parseInt(val)) ? '' : val;
  }
});

function formatAccountNumber(number: any) {
  const digits = number.replace(/\D/g, '').substring(0, 11); 
  if (digits.length <= 4) {
    return digits;
  } else if (digits.length <= 6) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  } else {
    return `${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
  }
}

function goToNextStep() {
  if (isFormValid()) {
    store.updateStepTwoData({
      checkingAccount: checkingAccount.value.replace(/\s/g, ''),
      savingsAccount: savingsAccount.value.replace(/\s/g, ''),
    });
    emit("update-step", 3);
  } else {
    alert("Please fill in all fields before proceeding.");
  }
}

function goBack() {
  emit("update-step", 1);
}

function isFormValid() {
  formErrors.value = {
    checkingAccount: "",
    savingsAccount: "",
  };

  let isValid = true;
  if (!checkingAccount.value) {
    formErrors.value.checkingAccount = "Checking account is required";
    isValid = false;
  }
  if (!savingsAccount.value) {
    formErrors.value.savingsAccount = "Savings account is required";
    isValid = false;
  }

  return isValid;
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
</style>
@/stores/QuestionnaireStore