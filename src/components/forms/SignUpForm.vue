<template>
  <div class="signup-container">
    <h1>Sign up</h1>
    <p>Create your account</p>
    <form @submit.prevent="signUp">
      <div>
        <label for="email"></label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="👤Email"
        />
      </div>
      <div>
        <label for="password"></label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="🔒Password"
        />
      </div>
      <button type="submit" @click="goToCompleteAccount">Sign Up</button>
    </form>
    <p>Already have an account? <button @click="goToLogin">Login</button></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const signUp = () => {
  console.log("Signing up with", email.value, password.value);
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
