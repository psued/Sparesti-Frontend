<template>
  <div class="login-container">
    <h1>Login</h1>
    <p>Sign in to your account</p>
    <form @submit.prevent="login">
      <div>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="👤Email"
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="🔒Password"
        />
      </div>
      <FormButton type="submit">Login</FormButton>
    </form>
    <p>Don't have an account? <button @click="goToSignUp">Sign Up</button></p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useRouter } from "vue-router";
import FormButton from "@/components/forms/FormButton.vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const emit = defineEmits(["change-view"]);

const login = () => {
  console.log("Logging in with", email.value, password.value);
  // Implement your login logic here
};

const goToSignUp = () => {
  router.push({ name: "signup" });
};
</script>

<style scoped>
.login-container {
  text-align: center;
}
</style>
