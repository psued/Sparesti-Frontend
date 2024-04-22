<template>
	<div class="questionnaire-container">
		<button @click="goBack" v-if="currentStep > 1">Back</button>
		<component :is="currentComponent" @update-step="updateStep" :key="currentStep" />
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import StepOne from '@/components/questionnaire/StepOne.vue';
import StepTwo from '@/components/questionnaire/StepTwo.vue';
import StepThree from '@/components/questionnaire/StepThree.vue';
import StepFour from '@/components/questionnaire/StepFour.vue';
import StepFive from '@/components/questionnaire/StepFive.vue';

const components = [StepOne, StepTwo, StepThree, StepFour, StepFive];
const currentStep = ref(1);

const currentComponent = computed(() => {
return components[currentStep.value - 1];
});

const updateStep = (step: number) => {
currentStep.value = step;
};

const goBack = () => {
if (currentStep.value > 1) {
    currentStep.value--;
}
};

watch(currentStep, (newStep, oldStep) => {
  history.replaceState({ step: newStep }, `Step ${newStep}`, `?step=${newStep}`);
});

// Handle browser back button navigation
window.onpopstate = (event: PopStateEvent) => {
  if (event.state?.step) {
    currentStep.value = event.state.step as number;
  }
};
</script>
