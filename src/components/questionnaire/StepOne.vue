<template>
	<div>
		<h2>Lets get you started...</h2>
		<input v-model="firstName" placeholder="What's your first name?" />
		<input v-model="lastName" placeholder="What's your last name?" />
		<input type="date" v-model="birthdate" placeholder="How old are you?" />
		<select v-model="occupationStatus">
			<option value="">What's your current occupation status?</option>
			<option value="student">Student</option>
			<option value="employed">Employed</option>
			<option value="unemployed">Unemployed</option>
		</select>
		<button @click="emitUpdateStep(2)">Next</button>
	</div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watchEffect } from 'vue';

const emit = defineEmits(['update-step']);
const firstName = ref('');
const lastName = ref('');
const birthdate = ref('');
const occupationStatus = ref('');

function emitUpdateStep(step: number) {
	emit('update-step', step);
}

watchEffect(() => {
	const stepData = {
		firstName: firstName.value,
		lastName: lastName.value,
		birthdate: birthdate.value,
		occupationStatus: occupationStatus.value
	};
	localStorage.setItem('stepOneData', JSON.stringify(stepData));
});
</script>
