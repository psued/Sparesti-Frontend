<template>
  <div class="challenge-container">
    <h1>Din Utfordrings Prosess</h1>
    <div class="badges">
      <div class="badges-page">
        <div class="badge-list">
          <BadgeComponent v-for="badge in badges" :key="badge.id" :badge="badge" />
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

const badges = ref<Badge[]>([]);

onMounted(async () => {
  badges.value = await getAllBadges() as Badge[];
});
</script>

<style scoped>
.badges-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.badge-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>