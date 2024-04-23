<template>
	<div class="step-one">
		<button @click="emitUpdateStep(2)">Next</button>
	</div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['update-step']);

function emitUpdateStep(step: number) {
	emit('update-step', step);
}
</script>