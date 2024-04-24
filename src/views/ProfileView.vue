<template>
	<div class="profile-page-container">
		<section v-if="user" class="user-info-section">
			<div class="header">
				<h1>{{ user.displayName }}'s profile</h1>
			</div>  
			<section class="top-part-profile">
				<div class="profile-pic-container">
					<ProfilePicComponent :userProfilePic="user.pictureUrl " />
				</div>
				<div class="total-savings-container">
					<TotalSavingsComponent :totalSavings="user.totalSavings" />
				</div> 
			</section>
			<UserInfoComponent :user="user" />
		</section>
		<section class="badges-section">
			<h2>Recent Badges</h2>  
		</section>
		<section class="settings-section">
			<router-link to="/settings" class="settings-button">
			Information & Settings
			<img src="" alt="Settings" />
			</router-link>
		</section>
		<div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserByDisplayName, getUserInfo } from '@/api/userHooks';
import type { User } from '@/types/User';
import ProfilePicComponent from '@/components/profile/ProfilePicComponent.vue'; 
import UserInfoComponent from '@/components/profile/UserInfoComponent.vue'; 
import TotalSavingsComponent from '@/components/profile/TotalSavingsComponent.vue';

const user = ref<User | null>(null);
const badges = ref([]);
onMounted(async () => {
	const fetchUserInfo = async () => {
		try {
			const userInfo = await getUserInfo();
			if (!userInfo) {
				console.error('User info not available');
				return;
			}
			mapUserInfo(userInfo);
		} catch (error) {
			console.error('Failed to load user info:', error);
		}
	};

	const mapUserInfo = (userInfo: any) => {
		user.value = {
			displayName: userInfo.preferred_username || 'N/A',
			firstName: userInfo.given_name || 'N/A',
			lastName: userInfo.family_name || 'N/A',
			email: userInfo.email || 'no-email@example.com',
			pictureUrl: userInfo.picture || 'default_picture.jpg',
			badges: [],
			totalSavings: 0, 
			birthdate: userInfo.birthdate || 'Unknown birthdate'
		};
			console.log('User info:', user.value);
	};

	await fetchUserInfo();
});
</script>

<style scoped>
/* Desktop View */
@media (min-width: 769px) {
	.header{
		padding-bottom: 2rem;
		font-size: 1.5rem;
	}
	.profile-page-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.user-info-section {
		display: flex;
		flex-direction: column;
		border-right: 2px solid;
	}
	.badges-section {
		display: flex;
		flex-direction: column;
	}
	.top-part-profile {
		display: flex;
		gap: 5rem;
		align-items: center;
		justify-content: center;
		margin-bottom: 2rem;
	}
	.profile-pic-container,
	.total-savings-container {
		height: 12vw;
		width: 12vw;
		border-radius: 50%;
		overflow: hidden; 
		border: 2px solid; 
	}
	.profile-page-container {
		display: grid;
		justify-content: center;
		padding: 2rem;
	}
	.settings-section {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 5%;
	}
	.settings-button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-radius: 1rem;
	}
	.user-info-section {
		padding-right: 2rem;
	}
}

@media (max-width: 768px) {
	.profile-page-container {
		grid-template-columns: 1fr;
		justify-content: center;
	}

	.profile-pic-container {
		width: 150px; 
		height: 150px; 
	}
}
</style>
