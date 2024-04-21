<template>
  <div class="profile-page-container">
    <section class="user-info-section">
      <div class="profile-pic-container">
        <ProfilePicComponent :userProfilePic="user.pictureUrl" />
        <TotalSavingsComponent :totalSavings="user.totalSavings" />
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
import { ref, onMounted } from 'vue';
import ProfilePicComponent from '@/components/profile/ProfilePicComponent.vue'; 
import UserInfoComponent from '@/components/profile/UserInfoComponent.vue'; 
import TotalSavingsComponent from '@/components/profile/TotalSavingsComponent.vue';


const user = ref<User>({
  name: 'vilde min',
  email: 'vilde@min.com',
  username: 'VildeMin',
  pictureUrl: 'https://cdn.discordapp.com/attachments/702511885370654732/1152222819816579172/c0sc95nulakb1.png?ex=662ba11f&is=66192c1f&hm=937bea25d8566aaeb42ebbd0197fc652a6b55cd71e3ab59334a14ec0287e5b6b&', 
  badges: [] ,
  totalSavings:5000,
});
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
    width: 150px; 
    height: 150px; 
  }
}
</style>
