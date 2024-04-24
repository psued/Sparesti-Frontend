<template>
  <div class="profile-pic">
    <img :src="userProfilePic" alt="User's Profile" class="profile-pic" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  userProfilePic: string;
}>();
</script>

<style scoped>
.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
