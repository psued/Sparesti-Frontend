<template>
	<div class="form-container">
		<h2>Nå er du helt ferdig!</h2>
		<div class="form-group">
			<p>Nå kan du starte å spare som en sparesti lmao</p>
				
		</div>
		<FormButton type="submit" @click="goToNextStep">Finish</FormButton>
	</div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted } from 'vue'; 
import { useRouter } from 'vue-router';

const goToNextStep = () => {
	const router = useRouter();
	router.push('/');
}