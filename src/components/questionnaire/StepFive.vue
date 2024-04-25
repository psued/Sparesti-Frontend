<template>
  <div class="form-container">
    <h2>Your Bank Accounts</h2>
    <div v-if="isLoading">Loading accounts...</div>
    <div v-if="error">An error occurred: {{ error }}</div>
    <div v-for="account in bankAccounts" :key="account.id" class="account-item">
      <div>{{ account.name }}: {{ account.balance }}</div>
      <ul>
        <li v-for="transaction in account.transactions" :key="transaction.id">
          {{ transaction.date }}: {{ transaction.description }} -
          {{ transaction.amount }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const userId = "";
const bankAccounts = ref<any[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
</script>

<style scoped>
.account-item {
  margin-bottom: 10px;
}
</style>
