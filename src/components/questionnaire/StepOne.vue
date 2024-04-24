<template>
  <div class="form-container">
    <h2 class="form-title">La oss komme i gang...</h2>
		<div class="question-container">

			<label for="firstName">Hva er ditt fornavn?</label>
    	<input id="firstName" v-model="firstName" placeholder="First Name" required />

			<label for="lastName">Hva er ditt etternavn?</label>
    	<input id="lastName" v-model="lastName" placeholder="Last Name" required />

      <label for="nickname">Hva kaller vennene dine deg?</label>
      <input id="nickname" v-model="nickName" placeholder="Nickname" required />

			<label for="birthdate">Hvor gammel er du?</label>
    	<input type="date" id="birthdate" v-model="birthdate" placeholder="dd.mm.yyyy" required />

			<label for="occupationStatus">Hva er din nåværende yrkesstatus?</label>
			<select id="occupationStatus" v-model="occupationStatus" required>
				<option value="">Yrkesstatus</option>
				<option value="student">Student</option>
				<option value="employed">Arbeidende</option>
				<option value="unemployed">Arbeidsledig</option>
    	</select>
		</div>
    <FormButton type="submit" @click="goToNextStep">Next</FormButton>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import FormButton from '@/components/forms/FormButton.vue';

const emit = defineEmits(['update-step']);
const store = useQuestionnaireStore();

const firstName = ref(store.stepOneData.firstName);
const lastName = ref(store.stepOneData.lastName);
const nickName = ref(store.stepOneData.nickName);
const birthdate = ref(store.stepOneData.birthdate);
const occupationStatus = ref(store.stepOneData.occupationStatus);

const formErrors = ref({
  firstName: '',
  lastName: '',
  nickName: '',
  birthdate: '',
  occupationStatus: ''
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
    emit('update-step', 2);
  } else {
    alert('Please fill in all fields before proceeding.');
  }
}

function isFormValid() {
  formErrors.value = {
    firstName: '',
    lastName: '',
    nickName: '',
    birthdate: '',
    occupationStatus: ''
  };

  let isValid = true;
  if (!firstName.value) {
    formErrors.value.firstName = 'First name is required';
    isValid = false;
  }
  if (!lastName.value) {
    formErrors.value.lastName = 'Last name is required';
    isValid = false;
  }
  if (!birthdate.value) {
    formErrors.value.birthdate = 'Birthdate is required';
    isValid = false;
  }
  if (!occupationStatus.value) {
    formErrors.value.occupationStatus = 'Occupation status is required';
    isValid = false;
  }
  return isValid;
}
onMounted(() => {
  firstName.value = store.stepOneData.firstName;
  lastName.value = store.stepOneData.lastName;
  birthdate.value = store.stepOneData.birthdate;
  occupationStatus.value = store.stepOneData.occupationStatus;
});
</script>

<style scoped>

.form-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.question-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; 
  background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat; /* Add custom arrow */
  background-position: right 10px top 50%;
  background-size: 12px; 
  padding-right: 30px; 
  cursor: pointer;
}

select {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
}

select option[value=""][disabled] {
  display: none;
}
</style>@/stores/QuestionnaireStore