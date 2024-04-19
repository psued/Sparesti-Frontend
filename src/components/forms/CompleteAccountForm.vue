<template>
	<div class="complete-account-container">
		<h1>Complete your account</h1>
		<p>Fill in more details to start up!</p>
		<form @submit.prevent="completeAccount">
			<div>
				
				<label for="name"></label>
				<input type="text" id="name" v-model="name" placeholder="👤Name" />
			</div>
			<div>
				<label for="age"></label>
				<input type="age" id="age" v-model="age" placeholder="👴Age" />
			</div>
			<FormButton type="submit">Complete</FormButton>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormButton from '@/components/forms/FormButton.vue'

const router = useRouter()
const name = ref('')
const age = ref('')

const completeAccount = () => {
	console.log('Completing account with', name.value, age.value)
}

const goToPersonalisation = () => {
	console.log('Going to personalisation')
	router.push({ name: 'personalisation' })
}
</script>

<style scoped>
.complete-account-container {
	text-align: center;
}
</style>