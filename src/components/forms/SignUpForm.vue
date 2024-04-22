<template>
	<div class="signup-container">
		<h1>Meld deg på</h1>
		<p>Lag din egen bruker</p>
		<form @submit.prevent="signUp">
			<div>
				<FormInput type="email" placeholder="Skriv inn email" v-model="email" />
			</div>
			<div>
				<FormInput type="password" placeholder="Passord" v-model="password" />
			</div>
			<FormButton type="submit" @click="goToCompleteAccount">Sign up</FormButton>
		</form>
		<div class="login-link">
			<p>Har allerede bruker? <button @click="goToLogin">Logg inn</button></p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormButton from "@/components/forms/FormButton.vue";
import FormInput from "@/components/forms/FormInput.vue";

const router = useRouter();
const email = ref("");
const password = ref("");

const signUp = () => {
  console.log("Signing up with", email.value, password.value);
  router.push({ name: "complete-account" });
};

const goToLogin = () => {
  console.log("Going to login");
  router.push({ name: "login" });
};

const goToCompleteAccount = () => {
  console.log("Going to complete account");
  router.push({ name: "complete-account" });
};
</script>

<style scoped>
.signup-container {
  text-align: center;
}

.login-link {
  margin-top: 15vw;
}

.login-link button {
	background-color: transparent;
	border: none;
	cursor: pointer;
	font: bold;
}
</style>