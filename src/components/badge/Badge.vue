<template>
  <div class="challenge-container">
    <h1>Medaljer</h1>
    <div class="badges">
      <div class="badges-page">
        <div class="badge-list">
          <router-link
            v-for="badge in badges"
            :key="badge.id"
            :to="{
              name: 'BadgeDetails',
              params: { id: badge.id },
              query: { isOwned: isBadgeOwned(badge).toString() },
            }"
            class="black-link"
          >
            <BadgeComponent :badge="badge" :owned="isBadgeOwned(badge)" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import BadgeComponent from "@/components/badge/BadgeComponent.vue";
import { type Badge, type UserBadge } from "@/types/Badge"; // Importing the Badge interface
import { getAllBadges, getBadgesByUser } from "@/api/badgeHooks";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const badges = ref<Badge[]>([]);
const userBadges = ref<UserBadge[]>([]);
const userStore = useUserStore();
const userId = userStore.getUserId;

onMounted(async () => {
  badges.value = (await getAllBadges()) as Badge[];
  console.log(userId);
  userBadges.value = (await getBadgesByUser()) as unknown as UserBadge[];
});

const isBadgeOwned = (badge: Badge) => {
  return userBadges.value.some(
    (userBadge: UserBadge) => userBadge.badge.id === badge.id,
  );
};
</script>

<style scoped>
.badge-image.unowned {
  filter: grayscale(100%);
}

h1 {
  font-size: 2.5em;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.badges-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 5%;
  margin-top: 20px;
}

.badge-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.black-link {
  color: black;
  padding-bottom: 20px;
}

.black-link:hover {
  text-decoration: none;
  background: none;
}
</style>
