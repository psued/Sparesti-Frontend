<template>
	<div class="flex-container">
		<div class="accounts-section">
			<div class="header-account">
				<h1>Informasjon</h1>
			</div>
			<div class="account">
				<h2>Bruks konto</h2>
				<p>**** **** **** 1234</p>
				<p>Balance: 17.438,05,-</p>
			</div>
			<div class="account">
				<h2>Spare konto</h2>
				<p>**** **** **** 5678</p>
				<p>Balance: 157.562,32,-</p>
			</div>
		</div>
		<div class="settings-section">
			<div class="header-settings">
				<h1>Settings</h1>
			</div>
			<div class="settings-buttons">
				<button class="button">Change Account</button>
				<button class="button">Change Password</button>
				<button class="delete-button" @click="toggleModal">Delete Account</button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DeleteAccountModal from '@/components/profile/DeleteAccountModal.vue';

const router = useRouter();
const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const backToProfile = () => {
	router.push('/profile');
};

const handleAccountDeletion = (password: string) => {
  console.log('Delete account with password:', password);
  showModal.value = false;
};
</script>

<style scoped>
.flex-container {
  display: flex;
  width: 100%;
	justify-content: space-around;
}
.accounts-section, .settings-section {
  display: flex;
  flex-direction: column;
	width: 45%;
}
.delete-button {
  background-color: #d9534f;
  color: white;
}
.delete-button:hover {
	background-color: #c9302c;
}
.settings-buttons {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px; /* Add top margin only to separate buttons */

	width: 45%;
}
.button, .delete-button {
  border: none;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }

  .accounts-section, .settings-section {
    width: 100%;
  }
}
</style>