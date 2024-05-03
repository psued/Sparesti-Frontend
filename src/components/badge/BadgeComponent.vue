<template>
  <div
    class="badge"
    :class="{ unowned: !owned, 'badge-owned': owned }"
    @mouseover="showRarity = true"
    @mouseleave="showRarity = false"
  >
    <div class="badge-image" :class="{ unowned: !owned }">
      <img :src="badge?.imageUrl" :alt="badge?.name" />
    </div>
    <h3 class="badge-name">{{ badge?.name }}</h3>
    <p class="badge-description">{{ badge?.description }}</p>
    <div v-if="showRarity" class="badge-tooltip">
      <p>{{ rarityMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Badge } from "@/types/Badge";
import { ref, watchEffect } from "vue";
import { getBadgeRarity } from "@/api/badgeHooks";

const props = defineProps<{
  badge: Badge | null;
  owned: boolean;
}>();

const showRarity = ref(false);
const rarityMessage = ref("");

watchEffect(async () => {
  if (showRarity.value) {
    if (props.badge) {
      const rarity = await getBadgeRarity(props.badge.id);
      if (rarity !== null) {
        const floatRarity = parseFloat(rarity);
        rarityMessage.value = `${floatRarity.toFixed(0)}% of users own this badge!`;
      }
    }
  }
});
</script>

<style scoped>
.badge-image.unowned {
  filter: grayscale(100%);
}

.badge-link {
  display: block;
  height: 100%;
  text-decoration: none;
  color: black;
  text-align: -webkit-center;
}

.badge-link:hover {
  background: none;
}

.badge-name {
  font-size: 1.2rem;
  text-decoration: underline;
  margin: 0;
  color: var(--color-text);
}

.badge {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: var(--color-badges-base);
  text-align: center;
  max-width: 175px;
  transition: transform 0.3s ease;
  height: 100%;
  padding-bottom: 0px;
  max-height: fit-content;
  min-width: 175px;
}

.badge-owned {
  background-color: var(--color-badges-owned);
}

.badge.badge-owned:hover {
  background-color: var(--color-badges-owned-hover);
}

.badge-description {
  overflow-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text);
}

.badge:hover {
  background-color: var(--color-badges-hover);
  box-shadow: 0 0 5px #ccc;
  transform: scale(1.05);
  cursor: pointer;
}

.badge-image {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 5px;
}

.badge img {
  width: 100%;
  height: 100%;
}

.badge-tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
