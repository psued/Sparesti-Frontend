<template>
  <div class="profile-page-container">
    <section v-if="user" class="user-info-section">
      <div class="header">
        <h1>{{ user.displayName }}'s Profile</h1>
        <button class="togglebutton" @click="toggleEditMode">{{ isEditing ? 'Save Changes' : 'Edit Profile' }}</button>
      </div>
      <section class="top-part-profile">
        <label class="profile-pic-container">
          <ProfilePicComponent :userProfilePic="imagePreview" v-if="imagePreview" />
          <ProfilePicComponent :userProfilePic="user.pictureUrl" v-else />
          <div class="overlay">
            <i class="icon-pencil">
              <img src="/svg_icons/icon-pencil.svg" alt="Pencil Icon" class="icon-pencil-image">
            </i>
          </div>
          <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" id="image" style="display:none">
        </label>
        <div class="total-savings-container">
          <TotalSavingsComponent :totalSavings="user.totalSavings" />
        </div>
      </section>
      <UserInfoComponent :user="user" :isEditing="isEditing" />
    </section>
    <section class="badges-section">
      <div class="header-badges">
        <h1>Alle dine medaljer</h1>
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
      </router-link>
    </section>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { getUserInfo, getUserByUsername, updateUserInfo, updateProfilePicture } from "@/api/userHooks";
import { getBadgesByUser } from "@/api/badgeHooks";
import type { UserBadge } from "@/types/Badge";
import { uploadImage } from "@/utils/imageUtils";
import ProfilePicComponent from "@/components/profile/ProfilePicComponent.vue";
import UserInfoComponent from "@/components/profile/UserInfoComponent.vue";
import TotalSavingsComponent from "@/components/profile/TotalSavingsComponent.vue";
import BadgeComponent from "@/components/badge/BadgeComponent.vue";

const user = ref<any | null>(null);
const userBadges = ref<UserBadge[]>([]);
const userStore = useUserStore();
const isEditing = ref(false);
const imagePreview = ref<string | null>(null);
const userProfilePic = ref<string | null>(null);

const handleImageUpload = async (event: Event) => {
  if (!isEditing.value) {
    toggleEditMode();
  }
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const toggleEditMode = async () => {
  try {
    if (isEditing.value) {
      if (imagePreview.value) {
        const fileInput = document.getElementById("image") as HTMLInputElement;
        if (fileInput) {
          const image = fileInput.files?.[0];
          if (!image) {
            console.error("No image selected.");
            return;
          }
          const imageUrl = await uploadImage(image, imagePreview);
          console.log("Image uploaded successfully." + imageUrl);
          if (imageUrl) {
            await updateProfilePicture(imageUrl);
          }
          user.value.pictureUrl = imageUrl;
        }
      }
      await updateUserInfo(user.value);
      console.log("Profile updated successfully.");
    }
    isEditing.value = !isEditing.value;
  } catch (error) {
    console.error("Failed to update user info:", error);
  }
};


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
    const userByUsername = await getUserByUsername();
    const userInfo = await getUserInfo();
    if (userInfo) {
      const userByUsernameResult = await userByUsername;
      userProfilePic.value = userByUsernameResult.profilePictureUrl;
      setUser(userInfo, userProfilePic.value || "");
      await userByUsername.then((response: { totalSavings: any; }) => {
        if (user.value !== null) {
          user.value.totalSavings = response.totalSavings;
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

const setUser = (userInfo: any, profilePictureUrl: string) => {
  user.value = {
    id: userInfo.id,
    displayName: userInfo.preferred_username || 'N/A',
    firstName: userInfo.given_name || 'N/A',
    lastName: userInfo.family_name || 'N/A',
    email: userInfo.email || 'no-email@example.com',
    pictureUrl: profilePictureUrl || '/default-profile-pic.png',
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
  background: none;
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

.icon-pencil {
  position: absolute;
  /* Adjust the position of the icon as needed */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.icon-pencil-image {
  height: 50px;
  width: 50px;
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
@media (min-width: 881px) {
  .header-badges {
    padding-bottom: 2rem;
    font-size: 1.5rem;
    padding-left: 2rem;
  }
  .header {
    padding-bottom: 2rem;
    font-size: 1.5rem;
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
@media (max-width: 880px) {
  .profile-page-container {
    grid-template-columns: 1fr;
    justify-content: center;
    padding: 20px;
  }

  .profile-pic-container, .total-savings-container {
    width: 150px;
    height: 150px;
  }
}

input[type="file"] {
  display: none;
}
</style>
