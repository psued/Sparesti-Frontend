<template>
	<div class="settings-container">
		<button class="button-back-to-profile-btn" @click="backToProfile"><</button>
		<h1>Profile</h1>
		<div class="account-info">
			<div class="account">
				<h2>Checking Account</h2>
				<p>**** **** **** 1234</p>
				<p>Balance: 17.438,05,-</p>
			</div>
			<div class="account">
				<h2>Savings Account</h2>
				<p>**** **** **** 5678</p>
				<p>Balance: 157.562,32,-</p>
			</div>
		</div>
		<div class="setting-buttons">
			<h2>Settings</h2>
			<button class="button">Change Account</button>
			<button class="button">Change Password</button>
			<button class="delete-button" @click="toggleModal">Delete Account</button>
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
  // Perform API call to delete account
  showModal.value = false;
};
</script>

<style scoped>
.settings-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	columns: 1fr, 1fr;
}
.delete-button {
	background-color: #d9534f;
	color: white;
}
.button-back-to-profile-btn{
	border-radius: 50%;
}
</style>