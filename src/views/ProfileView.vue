<template>
  <div class="profile-page-container">
    <section v-if="user" class="user-info-section">
      <div class="header">
        <h1>{{ user.displayName }}'s profile</h1>
        <button v-if="!isEditing" @click="toggleEdit">Edit Profile</button>
        <button v-if="isEditing" @click="saveChanges">Save Changes</button>
      </div>
      <section class="top-part-profile">
        <div class="profile-pic-container">
          <ProfilePicComponent :userProfilePic="user.pictureUrl" />
					<div class="overlay">
						<i class="icon-pencil"></i>
					</div>
					<input type="file" ref="fileInput" @change="handleProfilePictureChange" style="display:none">
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
        <router-link
          v-for="userBadge in userBadges"
          :key="userBadge.badge.id"
          :to="{
            name: 'BadgeDetails',
            params: { id: userBadge.badge.id },
            query: { isOwned: 'true' },
          }"
          class="badge-link"
        >
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
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { getUserInfo, getUserByUsername } from "@/api/userHooks";
import { getBadgesByUser } from "@/api/badgeHooks";
import type { UserBadge } from "@/types/Badge";
import ProfilePicComponent from "@/components/profile/ProfilePicComponent.vue";
import UserInfoComponent from "@/components/profile/UserInfoComponent.vue";
import TotalSavingsComponent from "@/components/profile/TotalSavingsComponent.vue";
import BadgeComponent from "@/components/badge/BadgeComponent.vue";

const user = ref<any | null>(null);
const userBadges = ref<UserBadge[]>([]);
const userStore = useUserStore();

const fetchAndSetUserInfo = async () => {
	try {
		userBadges.value = (await getBadgesByUser()) as unknown as UserBadge[];
		for (let i = 0; i < userBadges.value.length; i++) {
			userBadges.value[i].badge.description = "";
		}
	} catch (error) {
		console.error("Failed to load badges for user:", error);
	}

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
      console.error("User info not available");
    }
  } catch (error) {
    console.error("Failed to load user info:", error);
  }
};

const setUser = (userInfo: any) => {
  user.value = {
    id: userInfo.id,
    displayName: userInfo.preferred_username || 'N/A',
    firstName: userInfo.given_name || 'N/A',
    lastName: userInfo.family_name || 'N/A',
    email: userInfo.email || 'no-email@example.com',
    pictureUrl: userInfo.picture || '/default-profile-pic.png',
    userBadges: [],
    totalSavings: 0,
    birthdate: userInfo.birthdate || "Unknown birthdate",
  };
};

onMounted(fetchAndSetUserInfo);
</script>

<style scoped>
/* Base styles for links within the profile */
.badge-link {
  text-decoration: none;
  color: var(--vt-c-black-soft);
  display: block;
}

.badge-link:hover {
  background: none; /* Ensure no background change on hover */
}

/* Styling for the profile picture container */
.profile-pic-container, .total-savings-container {
  position: relative;
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Overlay styling that appears on hover */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;
}

.profile-pic-container:hover .overlay {
  opacity: 1;
}

/* Ensure top-part-profile is always flex row */
.top-part-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem; /* Adjust space between elements */
  margin-bottom: 2rem;
}

/* Desktop view */
@media (min-width: 769px) {
  .header {
    padding-bottom: 2rem;
    font-size: 1.5rem;
    padding-left: 2rem;
  }

  .profile-page-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 2rem;
  }

  .user-info-section, .badges-section {
    display: flex;
    flex-direction: column;
  }

  .user-info-section {
    border-right: 2px solid;
    padding-right: 2rem;
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

  .badge-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .badge-link {
    max-height: fit-content;
  }
}

/* Mobile view */
@media (max-width: 768px) {
  .profile-page-container {
    grid-template-columns: 1fr;
    justify-content: center;
  }

  .profile-pic-container, .total-savings-container {
    width: 150px;
    height: 150px;
  }
}
</style>
