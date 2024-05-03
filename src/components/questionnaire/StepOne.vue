<template>
  <div class="form-container">
    <h2 class="form-title">La oss komme i gang...</h2>
    <p>Vennligst skriv inn informasjon om deg selv</p>
    <div class="question-container">
      <!-- Input fields for user information with validation and error messages -->
      <div class="input-wrapper">
        <label for="firstName">Hva er ditt fornavn?</label>
        <input id="firstName" v-model="firstName" placeholder="First Name" required />
        <div v-if="formErrors.firstName" class="error">{{ formErrors.firstName }}</div>
      </div>
      <div class="input-wrapper">
        <label for="lastName">Hva er ditt etternavn?</label>
        <input id="lastName" v-model="lastName" placeholder="Last Name" required />
        <div v-if="formErrors.lastName" class="error">{{ formErrors.lastName }}</div>
      </div>
      <div class="input-wrapper">
        <label for="nickname">Hva kaller vennene dine deg?</label>
        <input id="nickname" v-model="nickName" placeholder="Nickname" required />
        <div v-if="formErrors.nickName" class="error">{{ formErrors.nickName }}</div>
      </div>
      <div class="input-wrapper">
        <label for="birthdate">Hvor gammel er du?</label>
        <input 
        type="date" 
        id="birthdate" 
        v-model="birthdate" 
        required />
        <div v-if="formErrors.birthdate" class="error">{{ formErrors.birthdate }}</div>
      </div>
      <div class="input-wrapper">
        <label for="occupationStatus">Hva er din nåværende yrkesstatus?</label>
        <select id="occupationStatus" v-model="occupationStatus" required>
          <option value="" disabled>Yrkesstatus</option>
          <option value="student">Student</option>
          <option value="employed">Arbeidende</option>
          <option value="unemployed">Arbeidsledig</option>
        </select>
        <div v-if="formErrors.occupationStatus" class="error">{{ formErrors.occupationStatus }}</div>
      </div>
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

const firstName = ref(store.stepOneData.firstName);
const lastName = ref(store.stepOneData.lastName);
const nickName = ref(store.stepOneData.nickName);
const birthdate = ref(store.stepOneData.birthdate);
const occupationStatus = ref(store.stepOneData.occupationStatus);

const formErrors = ref({
  firstName: "",
  lastName: "",
  nickName: "",
  birthdate: "",
  occupationStatus: "",
});

function goToNextStep() {
  if (isFormValid()) {
    store.updateStepOneData({
      firstName: firstName.value,
      lastName: lastName.value,
      nickName: nickName.value,
      birthdate: birthdate.value,
      occupationStatus: occupationStatus.value,
    });
    emit("update-step", 2);
  }
}

/**
 * Checks if the form is valid, and has error messages for different scenarios.
 */
function isFormValid() {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate()-1)).toISOString().slice(0, 10);
  
  formErrors.value.firstName = firstName.value ? "" : "Fornavn er påkrevd.";
  formErrors.value.lastName = lastName.value ? "" : "Etternavn er påkrevd.";
  formErrors.value.nickName = nickName.value ? "" : "Kallenavn er påkrevd.";
  formErrors.value.birthdate = !birthdate.value ? "Fødselsdato er påkrevd." : 
                              (birthdate.value > tomorrow ? "Fødselsdato kan ikke være i fremtiden." : "");
  formErrors.value.occupationStatus = occupationStatus.value ? "" : "Yrkesstatus er påkrevd.";

  return Object.values(formErrors.value).every(x => x === "");
}

onMounted(() => {
  firstName.value = store.stepOneData.firstName;
  lastName.value = store.stepOneData.lastName;
  birthdate.value = store.stepOneData.birthdate;
  occupationStatus.value = store.stepOneData.occupationStatus;
});
</script>

<style scoped>

.form-title {
  text-align: center;
}

.question-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%; 
  margin-bottom: 20px;
}

.input-wrapper label {
  margin-bottom: 5px;
  text-align: left;
}

.input-wrapper input,
.input-wrapper select {
  border: none;
  border-radius: 5px; 
  padding: 10px;
  margin: 0;
  width: 100%;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px top 50%, #fff;
  background-size: 12px;
  cursor: pointer;
}

select option[value=""][disabled] {
  display: none;
}

.form-button {
  width: 100%;
}

.error {
  color: #E57373;
}
</style>
