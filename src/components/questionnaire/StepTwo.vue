<template>
	<div class="form-container">
		<h2 class="header">Let's get you started 2...</h2>
	<div class="account-form">
		<label>Brukskonto:</label>
		<input class="account-input" v-model="checkingAccount" placeholder="xxxx xxxx xxxx xxxx" required />
		<label>Sparekonto:</label>
		<input class="account-input" v-model="savingsAccount" placeholder="xxxx xxxx xxxx xxxx" required />
	</div>
		<FormButton type="submit" @click="goToNextStep">Next</FormButton>
	</div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import FormButton from '@/components/forms/FormButton.vue';

const emit = defineEmits(['update-step']);
const checkingAccount = ref('');
const savingsAccount = ref('');

function goToNextStep() {
	if (isFormValid()) {
		saveStepData();
		emit('update-step', 3);
	} else {
		alert('Please fill in all fields before proceeding.');
	}
}

function isFormValid() {
	return checkingAccount.value && savingsAccount.value;
}

function saveStepData() {
	const stepData = {
		checkingAccount: checkingAccount.value,
		savingsAccount: savingsAccount.value
	};
	localStorage.setItem('stepTwoData', JSON.stringify(stepData));
}

function loadStepData() {
	const savedStepData = localStorage.getItem('stepTwoData');
	if (savedStepData) {
		const stepData = JSON.parse(savedStepData);
		checkingAccount.value = stepData.checkingAccount;
		savingsAccount.value = stepData.savingsAccount;
	}
}

onMounted(loadStepData);
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