<template>
	<div class="signup-container">
		<h1>Sign up</h1>
		<p>Create your account</p>
		<form @submit.prevent="signUp">
			<div>
				<FormInput type="email" placeholder="Enter your email" v-model="email" />
			</div>
			<div>
				<FormInput type="password" placeholder="Password" v-model="password" />
			</div>
			<FormButton type="submit" @click="goToCompleteAccount">Sign up</FormButton>
		</form>
		<p>Already have an account? <button @click="goToLogin">Login</button></p>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormButton from '@/components/forms/FormButton.vue'
import FormInput from '@/components/forms/FormInput.vue'

const router = useRouter()
const email = ref('')
const password = ref('')

const signUp = () => {
	console.log('Signing up with', email.value, password.value)
	router.push({ name: 'complete-account' })
}

const goToLogin = () => {
	console.log('Going to login')
	router.push({ name: 'login' })
}

const goToCompleteAccount = () => {
	console.log('Going to complete account')
	router.push({ name: 'complete-account' })
}

</script>

<style scoped>
.signup-container {
	text-align: center;
}
</style>