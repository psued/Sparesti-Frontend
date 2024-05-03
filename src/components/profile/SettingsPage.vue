<template>
  <div class="flex-container">
    <BackButtonComponent class="back-button" @click="goToPreviousPage">
      <template v-slot:content>
        <span class="button-content">Back</span>
      </template>
    </BackButtonComponent>
    <div class="accounts-section">
      <div class="header-account">
        <h1>Account Information</h1>
      </div>
      <div class="account">
        <h2>Checking Account</h2>
        <p v-show="!accountEditMode">{{ checkingAccountNr }}</p>
        <input
          type="text"
          v-model="checkingAccountNr"
          v-show="accountEditMode"
          maxlength="11"
        />
        <p v-if="checkingAccountNr">{{ checkingBalance.toFixed(2) + " kr" }}</p>
      </div>
      <div class="account">
        <h2>Savings Account</h2>
        <p v-show="!accountEditMode">{{ savingsAccountNr }}</p>
        <input
          type="text"
          v-model="savingsAccountNr"
          v-show="accountEditMode"
          maxlength="11"
        />
        <p v-if="savingsAccountNr">{{ savingsBalance.toFixed(2) + " kr" }}</p>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-buttons">
        <button class="button" @click="toggleAccountEdit">
          {{ accountEditMode ? "Save Changes" : "Change Accounts" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getUserByUsername, updateAccounts } from "@/api/userHooks";
import { getBankAccountDetails } from "@/api/bankHooks";
import BackButtonComponent from "@/components/assets/BackButtonComponent.vue";

const router = useRouter();

const accountEditMode = ref(false);

const checkingAccountNr = ref(0);
const checkingBalance = ref(0.0);

const savingsAccountNr = ref(0);
const savingsBalance = ref(0.0);

const goToPreviousPage = () => {
  router.back();
};

const getBankDetails = async () => {
  const userByUsername = await getUserByUsername();
  checkingAccountNr.value = userByUsername.checkingAccountNr;
  savingsAccountNr.value = userByUsername.savingsAccountNr;
  if (checkingAccountNr.value !== null) {
    const checkingAccountDetails = await getBankAccountDetails(
      checkingAccountNr.value,
    );
    checkingBalance.value = checkingAccountDetails.balance;
  }
  if (savingsAccountNr.value !== null) {
    const savingsAccountDetails = await getBankAccountDetails(
      savingsAccountNr.value,
    );
    savingsBalance.value = savingsAccountDetails.balance;
  }
};

const toggleAccountEdit = async () => {
  if (accountEditMode.value) {
    const res = await updateAccounts(
      checkingAccountNr.value,
      savingsAccountNr.value,
    );
    if (!res) {
      return;
    } else if (res.status === 200) {
    } else {
      alert("Failed to update accounts: " + res.data.title);
    }
    await getBankDetails();
  }
  accountEditMode.value = !accountEditMode.value;
};

onMounted(async () => {
  await getBankDetails();
});
</script>

<style scoped>
.flex-container {
  height: 700px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
}

.accounts-section {
  justify-content: center;
  text-align: center;
  padding: 20px;
}
.account {
  margin-bottom: 10%;
}

input[type="text"] {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid;
  border-radius: 6px;
  width: 80%;
}

.settings-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin-top: 10px;
}

.button {
  border: none;
  border-radius: 6px;
  padding: 10px;
  margin: 10px 0;
  width: 70%;
  cursor: pointer;
  transition: background-color 0.3s;
}

@media (max-width: 880px) {
  .flex-container {
    flex-direction: column;
  }

  .accounts-section {
    margin-right: 0;
    margin-bottom: 20px;
    border: none;
  }
}
</style>
