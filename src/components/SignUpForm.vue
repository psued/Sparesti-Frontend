<template>
	<div>
		<form @submit.prevent="signUp">
			<div>
				<label for="email">👤Email</label>
				<input type="email" id="email" v-model="email" required />
			</div>
			<div>
				<label for="password">🔒Password</label>
				<input type="password" id="password" v-model="password" />
			</div>
			<button type="submit">Sign Up</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')
const password = ref('')

const signUp = () => {
	console.log('Signing up with', email.value, password.value)
}

</script>