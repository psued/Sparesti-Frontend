<template>
	<div class="user-info">
		<div class="user-details">
			<p>
				<strong>Name:</strong> {{ user.name }}
			</p>
			<p>
				<strong>Email:</strong> {{ user.email }}
			</p>
			<p>
				<strong>Username:</strong> {{ user.username }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { UserDto } from '@/types';

const props = defineProps<{ user: UserDto }>();
</script>