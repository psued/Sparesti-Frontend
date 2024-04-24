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
			<div class="header">
				<h1>Alle Medaljer</h1>
			</div>
			<div class="badge-container">
				<router-link v-for="userBadge in userBadges" 
					:key="userBadge.badge.id" 
				  :to="{ name: 'BadgeDetails', params: { id: userBadge.badge.id}, query: { isOwned: 'true' } }"
				class="badge-link">
					<BadgeComponent :badge="userBadge.badge" :owned="true" />
				</router-link>			
			</div>
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
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { getUserInfo, getUserByUsername } from '@/api/userHooks';
import { getBadgesByUser } from '@/api/badgeHooks';
import type { UserBadge } from '@/types/Badge';
import ProfilePicComponent from '@/components/profile/ProfilePicComponent.vue'; 
import UserInfoComponent from '@/components/profile/UserInfoComponent.vue'; 
import TotalSavingsComponent from '@/components/profile/TotalSavingsComponent.vue';
import BadgeComponent from '@/components/badge/BadgeComponent.vue';

const user = ref<any | null>(null);
const userBadges = ref<UserBadge[]>([]);
const userStore = useUserStore();

const fetchAndSetUserInfo = async () => {
  try {
    const userByUsername = getUserByUsername(userStore.getUserName);
    const userInfo = await getUserInfo();
    if (userInfo) {
      setUser(userInfo);
      await userByUsername.then((res) => {
        if (user.value !== null) {
          user.value.totalSavings = res.totalSavings;
        } else {
          console.error("Failed to set total savings");
        }
      });
    } else {
      console.error('User info not available');
    }
  } catch (error) {
    console.error('Failed to load user info:', error);
  }
};

const setUser = (userInfo: any) => {
  user.value = {
    id: userInfo.id,
    displayName: userInfo.preferred_username || 'N/A',
    firstName: userInfo.given_name || 'N/A',
    lastName: userInfo.family_name || 'N/A',
    email: userInfo.email || 'no-email@example.com',
    pictureUrl: userInfo.picture || 'default_picture.jpg',
    userBadges: [],
    totalSavings: 0, 
    birthdate: userInfo.birthdate || 'Unknown birthdate'
  };
};

watch(() => userStore.userId, async (userId) => {
  if (userId && userId !== -1) {
    try {
		userBadges.value = await getBadgesByUser(userId) as unknown as UserBadge[];
		for (let i = 0; i < userBadges.value.length; i++) {
			userBadges.value[i].badge.description = '';
		}
    } catch (error) {
      console.error('Failed to load badges for user:', error);
    }
  }
}, { immediate: true });

onMounted(fetchAndSetUserInfo);
</script>

<style scoped>
.badge-link {
  text-decoration: none;
  color: var(--vt-c-black-soft);
  display: block; 
}
.badge-link:hover {
  background: none;
}

/* Desktop View */
@media (min-width: 769px) {
	.header{
		padding-bottom: 2rem;
		font-size: 1.5rem;
		padding-left: 2rem;
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
	.badge-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.badge-link {
		max-height:fit-content;
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
