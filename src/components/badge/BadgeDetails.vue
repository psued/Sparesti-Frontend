<template>
    <div class="badge-details">
      <h1>Badge Details</h1>
      <div class="badge-info">
        <BadgeComponent :badge="badge" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import BadgeComponent from '@/components/badge/Badge.vue';
  import { type Badge } from '@/types/Badge';
  import { getBadgeById } from '@/api/badgeHooks';
  
  const badge = ref<Badge | null>(null);
  const route = useRoute();
  
  onMounted(async () => {
    const badgeId = Number(route.params.id);
    badge.value = await getBadgeById(badgeId);
  });
  </script>
  
  <style scoped>
  .badge-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  </style>
  