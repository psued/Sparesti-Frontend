<template>
  <div class="profile-page-container">
    <section v-if="user" class="user-info-section">
      <div class="header">
        <h1>{{ user.displayName }}'s Profile</h1>
      </div>
      <section class="top-part-profile">
        <label class="profile-pic-container">
          <!-- Profile Picture -->
          <ProfilePicComponent :userProfilePic="imagePreview" v-if="imagePreview" />
          <ProfilePicComponent :userProfilePic="user.pictureUrl" v-else />
          <div class="overlay">
            <i class="icon-pencil">
              <img src="/svg_icons/icon-pencil.svg" alt="Pencil Icon" class="icon-pencil-image">
            </i>
          </div>
          <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" id="image" style="display:none">
        </label>
        <!-- Total Savings -->
        <div class="total-savings-container">
          <TotalSavingsComponent :totalSavings="user.totalSavings" />
        </div>
      </section>
      <!-- User Information -->
      <UserInfoComponent :user="user" :isEditing="isEditing" />
      <!-- Edit and Settings Buttons -->
      <section class="edit-section">
        <ButtonComponent class="edit-profile-button" @click="toggleEditMode">
          <template v-slot:content>
            <span class="button-content">
              {{ isEditing ? 'Lagre Endringer' : 'Rediger profil' }}<i class="icon-pencil-edit"></i>
            </span>
          </template>
        </ButtonComponent>
        <ButtonComponent class="settings-button" @click="goToSettings">
          <template v-slot:content>
            <span class="button-content">
              Innstillinger<i class="icon-setting"></i>
            </span>
          </template>
        </ButtonComponent>
      </section>
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
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getUserInfo, getUserByUsername, updateUserInfo, updateProfilePicture } from "@/api/userHooks";
import { getBadgesByUser } from "@/api/badgeHooks";
import type { UserBadge } from "@/types/Badge";
import { uploadImage } from "@/utils/imageUtils";
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import ProfilePicComponent from "@/components/profile/ProfilePicComponent.vue";
import UserInfoComponent from "@/components/profile/UserInfoComponent.vue";
import TotalSavingsComponent from "@/components/profile/TotalSavingsComponent.vue";
import BadgeComponent from "@/components/badge/BadgeComponent.vue";

const router = useRouter();
const user = ref<any | null>(null);
const userBadges = ref<UserBadge[]>([]);
const isEditing = ref(false);
const imagePreview = ref<string | null>(null);
const userProfilePic = ref<string | null>(null);

const goToSettings = () => {
  router.push('/settings');
};

/**
 * 
 * @param event The event that triggered the image upload.
 */
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

/**
 * Toggles the edit mode for the user profile.
 */
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

.edit-profile-button, .settings-button {
  width: 200px;
  height: 40px;
}

.edit-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.icon-setting {
  background-image: url('/svg_icons/icon-setting.svg');
  background-size: cover;
  display: block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

.icon-pencil-edit {
  background-image: url('/svg_icons/icon-pencil.svg');
  background-size: cover; 
  display: block; 
  width: 20px; 
  height: 20px;
  margin-left: 10px;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-link {
  text-decoration: none;
  color: var(--vt-c-black-soft);
  display: block;
  padding-bottom: 40px;
  padding-left: 20px;
}

.badge-link:hover {
  background: none;
}

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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.icon-pencil-image {
  height: 50px;
  width: 50px;
}

.top-part-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem; 
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

  .header-badges {
    padding-top: 40px;
    padding-bottom: 20px;
  }

  .badge-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .badge-link {
    width: calc(50%);
    margin-bottom: 10px; 
    padding-left: 0;
  }
}

input[type="file"] {
  display: none;
}
</style>
