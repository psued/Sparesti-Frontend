<template>
	<div class="login-container">
		<h1>Login</h1>
		<p>Sign in to your account</p>
		<form @submit.prevent="login">
			<div>
				<FormInput type="email" placeholder="Enter your email" v-model="email" />
			</div>
			<div>
				<FormInput type="password" placeholder="Password" v-model="password" />
			</div>
			<FormButton type="submit">Login</FormButton>
		</form>
		<div class="sign-up-link">
			<p>Don't have an account? <button @click="goToSignUp">Sign Up</button></p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import FormButton from '@/components/forms/FormButton.vue';
import FormInput from '@/components/forms/FormInput.vue';

const router = useRouter();
const email = ref("");
const password = ref("");
const emit = defineEmits(["change-view"]);

const login = () => {
	console.log('Logging in with', email.value, password.value);
};

const goToSignUp = () => {
  router.push({ name: "signup" });
};
</script>

<style scoped>
.login-container {
	width:100%;
	height:100%;
	text-align: center;
}
.sign-up-link {
	margin-top: 15vw;
}

.sign-up-link button {
	background-color: transparent;
	border: none;
	color: var(--color-primary);
	cursor: pointer;
}

</style>
