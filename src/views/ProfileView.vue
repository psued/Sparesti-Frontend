<template>
  <div class="profile-page-container">
    <section class="user-info-section">
      <div class="profile-pic-container">
        <ProfilePicComponent :userProfilePic="user.pictureUrl" />
      </div>
      <UserInfoComponent :user="user" />
      <SettingsLinkComponent />
    </section>
    <section class="badges-section">
      <BadgesComponent :badges="user.badges" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProfilePicComponent from '@/components/profile/ProfilePicComponent.vue'; 
import UserInfoComponent from '@/components/profile/UserInfoComponent.vue'; 


</script>

<style scoped>
/* Desktop View */
@media (min-width: 769px) {
  .profile-page-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem; 
  }

  .user-info-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Aligns items to the start of the section */
  }

  .badges-section {
    display: flex;
    flex-direction: column;
  }

  /* Styles to ensure the profile pic and total savings are of the same size */
  .profile-pic-container,
  .total-savings-container {
    width: 10vw;
    height: 10vw;
  }
}
.profile-page-container {
	display: grid;
  justify-content: center;
  padding: 2rem;
}

.profile-pic-container {
  height: 10vw;
  width: 10vw;
  border-radius: 50%;
  overflow: hidden; 
  border: 2px solid #729960; 
}

.user-info-section {
  /* Your styles here */
}

.badges-section {
  /* Your styles here */
}

@media (max-width: 768px) {
  .profile-page-container {
    grid-template-columns: 1fr;
    justify-content: center;
  }

  .profile-pic-container {
    width: 50vw; 
    height: 50vw; 
  }
}
</style>
