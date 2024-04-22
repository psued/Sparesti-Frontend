<template>
  <div class="user-info">
    <div class="user-details">
      <div class="detail">
        <span class="label">Name:</span>
        <span class="value">{{ user.name }}</span>
      </div>
      <div class="detail">
        <span class="label">Email:</span>
        <span class="value">{{ user.email }}</span>
      </div>
      <div class="detail">
        <span class="label">Username:</span>
        <span class="value">{{ user.username }}</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';
import type { User } from '@/types/User';
import "@/assets/icons.css";

const props = defineProps<{
	user: User;
}>();
</script>

<style scoped>
.user-info {
}

.user-details .detail {
  margin-bottom: 0.5em;
}

.user-details .label {
  font-weight: bold;
}

.user-details .value {
  display: block;
  border-bottom: 1px solid;
  padding-bottom: 0.2em;
}
</style>@/types/User