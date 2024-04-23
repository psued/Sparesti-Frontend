<template>
  <div class="challenge-container">
    <h1>Dine Medaljer</h1>
    <div class="badges">
      <div class="badges-page">
        <div class="badge-list">
          <router-link v-for="badge in badges" :key="badge.id" :to="{ name: 'BadgeDetails', params: { id: badge.id }}" class="black-link">
            <BadgeComponent :badge="badge" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BadgeComponent from '@/components/badge/Badge.vue';
import { type Badge } from '@/types/Badge';
import { getAllBadges } from '@/api/badgeHooks';
import { useRouter } from 'vue-router';

const badges = ref<Badge[]>([]);
const router = useRouter();

onMounted(async () => {
  badges.value = await getAllBadges() as Badge[];
});
</script>


<style scoped>
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