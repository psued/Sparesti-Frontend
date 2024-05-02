<template>
  <div class="badge-details">
    <div class="header-container">
      <button class="back-button" @click="navigateToBadgesPage">
        Medaljer
      </button>
      <h1 class="header">Medalje Detaljer</h1>
    </div>
    <div class="badge-info">
      <BadgeComponent :badge="badge" :owned="isOwned" />
      <div v-if="usersWithBadge?.length">
        <h2 class="header2">Brukere med denne medaljen:</h2>
        <div
          v-for="(userResponse, index) in usersWithBadge"
          :key="index"
          class="user-card"
        >
          <img
            v-if="userResponse.user.profilePictureUrl"
            :src="userResponse.user.profilePictureUrl"
            alt="Profile Picture"
          />
          <img v-else src="/default-profile-pic.png" alt="Profile Picture" />
          <div>
            <p class="card-text">{{ userResponse.user.email }}</p>
            <p class="card-text">
              Mottatt: {{ formatDate(userResponse.dateEarned) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BadgeComponent from "@/components/badge/BadgeComponent.vue";
import type { Badge } from "@/types/Badge";
import { getBadgeById, getAllUsersWithGivenBadge } from "@/api/badgeHooks";
import type { UserBadgeResponse } from "@/types/UserBadgeResponse";
import { formatDate } from "@/utils/dateUtils";

const badge = ref<Badge | null>(null);
const route = useRoute();
const router = useRouter();
const badgeId = Number(route.params.id);
const usersWithBadge = ref<UserBadgeResponse[] | null>(null);
const isOwned = route.query.isOwned === "true";

onMounted(async () => {
  badge.value = await getBadgeById(badgeId);
  usersWithBadge.value = await getAllUsersWithGivenBadge(badgeId);
});

const navigateToBadgesPage = () => {
  router.push("/badges");
};
</script>

<style scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
  }
  
.back-button {
  font-size: 24px;
  color: #333;
  text-decoration: none;
  padding-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 10px;
  margin-left: 10px;
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.2s;
}

.back-button:hover {
  background-color: #e9e9e9;
  box-shadow: 0 0 5px #ccc;
  transform: scale(1.05);
  cursor: pointer;
}

.header {
  font-size: 3rem;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 70px;
}

.header2 {
  text-align: center;
  font-size: 2em;
  margin-top: 10px;
  margin-bottom: 10px;
}

.badge-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 5%;
}

.user-card {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.3s ease;
}

.user-card img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #ccc;
  transition: border-radius 0.5s ease;
}

.user-card:hover {
  background-color: #f0f0f0;
  box-shadow: 0 0 5px #ccc;
  transform: scale(1.05);
  cursor: pointer;
}

.user-card:hover img {
  border-radius: 8px;
}

.card-text {
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  font-size: 1.2em;
  border-left: 1px solid #ccc;
  padding-left: 10px;
  color: black;
}

.badge-info {
  text-align: -webkit-center;
}
</style>
