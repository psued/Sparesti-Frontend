<template>
	<div class="complete-account-container">
		<h1>Complete your account</h1>
		<p>Fill in more details to start up!</p>
		<form @submit.prevent="completeAccount">
			<div>
				<label for="name">👤Name</label>
				<input type="text" id="name" v-model="name" />
			</div>
			<div>
				<label for="age">👴Age</label>
				<input type="age" id="age" v-model="age" />
			</div>
			<button type="submit" @click="goToLogin">Complete</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const age = ref('')

const completeAccount = () => {
	console.log('Completing account with', name.value, age.value)
}

const goToLogin = () => {
	console.log('Going to login')
	router.push({ name: 'login' })
}
</script>