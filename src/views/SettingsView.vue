<template>
  <div class="flex-container">
    <div class="accounts-section">
      <div class="header-account">
        <h1>Informasjon</h1>
      </div>
      <div class="account">
        <h2>Brukskonto</h2>
        <p>{{ checkingAccountNr }}</p>
        <p>Balance: 17.438,05,-</p>
      </div>
      <div class="account">
        <h2>Sparekonto</h2>
        <p>{{ savingsAccountNr }}</p>
        <p>Balance: 157.562,32,-</p>
      </div>
    </div>
    <div class="settings-section">
      <div class="header-settings">
        <h1>Instillinger</h1>
      </div>
      <div class="settings-buttons">
        <button class="button">Endre kontoer</button>
        <button class="button">Endre passord</button>
        <button class="delete-button" @click="toggleModal">Slett konto</button>
      </div>
    </div>
    <DeleteAccountModal
      v-if="showModal"
      :isModalVisible="showModal"
      @closeModal="showModal = false"
      @confirmDelete="handleAccountDeletion"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DeleteAccountModal from "@/components/profile/DeleteAccountModal.vue";
import { getUserByUsername } from "@/api/userHooks";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const showModal = ref(false);
const checkingAccountNr = ref("");
const savingsAccountNr = ref("");

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const backToProfile = () => {
  router.push("/profile");
};

const handleAccountDeletion = (password: string) => {
  console.log("Delete account with password:", password);
  showModal.value = false;
};

onMounted(async () => {
  const userByUsername = await getUserByUsername(userStore.getUserName);
  checkingAccountNr.value = userByUsername.checkingAccountNr;
  savingsAccountNr.value = userByUsername.savingsAccountNr;
  console.log(userByUsername);
});
</script>

<style scoped>
.flex-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.accounts-section,
.settings-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.accounts-section {
  border-right: 2px solid;
}

.settings-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.button,
.delete-button {
  border: none;
  border-radius: 6px;
  padding: 10px;
  margin: 10px 0;
  width: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delete-button {
  background-color: #d9534f;
  color: white;
}

.delete-button:hover {
  background-color: #c9302c;
}

@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }

  .accounts-section,
  .settings-section {
    width: 100%;
  }
}
</style>
