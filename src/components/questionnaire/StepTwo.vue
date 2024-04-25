<template>
  <div class="form-container">
    <h2 class="header">Let's get you started 2...</h2>
    <div class="account-form">
      <label>Brukskonto:</label>
      <input
        class="account-input"
        v-model="checkingAccount"
        placeholder="xxxx xxxx xxxx xxxx"
        required
      />
      <label>Sparekonto:</label>
      <input
        class="account-input"
        v-model="savingsAccount"
        placeholder="xxxx xxxx xxxx xxxx"
        required
      />
    </div>
    <FormButton type="submit" @click="goToNextStep">Next</FormButton>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from "vue";
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

function goToNextStep() {
  if (isFormValid()) {
    store.updateStepTwoData({
      checkingAccount: checkingAccount.value,
      savingsAccount: savingsAccount.value,
    });
    emit("update-step", 3);
  } else {
    alert("Please fill in all fields before proceeding.");
  }
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
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.account-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.account-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
@/stores/QuestionnaireStore
