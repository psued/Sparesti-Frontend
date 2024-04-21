<template>
	<div class="user-info">
		<div class="user-details">
			<p>
				Name:
				<div class="profile-info-border"> {{ user.name }}</div>
			</p>
			<p>
				Email:
				<div class="profile-info-border"> {{ user.email }}</div>
			</p>
			<p>
				Username:
				<div class="profile-info-border"> {{ user.username }}</div>
			</p>
		</div>
	</div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';
import type { User } from '@/types/User';

const props = defineProps<{
	user: User;
}>();
</script>

<style scoped>

.profile-info-border {
	border: 1px solid ;
	border-radius:5px;
	padding: 5px;
	background-color: white;
}
</style>@/types/User