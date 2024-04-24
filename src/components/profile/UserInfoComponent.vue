<template>
  <div class="user-info">
    <div class="user-details">
      <div class="detail">
        <span class="label">Kallenavn:</span>
        <span class="value"><i class="icon-user"></i>{{ user.displayName }}</span>
      </div>
      <div class="detail">
        <span class="label">Email:</span>
        <span class="value"><i class="icon-mail"></i>{{ user.email }}</span>
      </div>
      <div class="detail">
        <span class="label">Navn:</span>
        <span class="value"><i class="icon-user"></i>{{ user.firstName }} {{ user.lastName }}</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';
import "@/assets/icons.css";

const props = defineProps<{
	user: any;
}>();
</script>

<style scoped>
.user-details .detail {
  margin-bottom: 0.5em;
}

.user-details .label {
  font-weight: bold;
}

.user-details .value {
  font-size: 1.5em;
  display: block;
  border-bottom: 1px solid;
  padding-bottom: 0.2em;
}
.icon{
  width: 40em;
  height: 1em;
}
</style>@/types/User