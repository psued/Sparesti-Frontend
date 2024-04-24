<template>
  <div class="form-container">
    <h2>Halvveis ferdig!</h2>
    
    <label for="annual-income">Hvor mye tjener du i året?</label>
    <input
      type="range"
      id="annual-income"
      v-model="annualIncome"
			min="0"
			max="1000000"
      required
    />
    
    <label for="willingness-range">På en skala fra 1 til 5, hvor villig er du til å endre sparevanene?</label>
    <input
      type="range"
      id="willingness-range"
      v-model="changeWillingness"
      min="1"
      max="5"
    />
    <span>{{ changeWillingness }}</span>
    
    <FormButton type="submit" @click="goToNextStep">Next</FormButton>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import { useQuestionnaireStore } from '@/stores/questionnaireStore'
import FormButton from '@/components/forms/FormButton.vue';

const emit = defineEmits(['update-step']);
const store = useQuestionnaireStore();

const annualIncome = ref(store.stepThreeData.annualIncome);
const changeWillingness = ref(store.stepThreeData.changeWillingness);
const formErrors = ref({
  annualIncome: '',
  changeWillingness: ''
});

function goToNextStep() {
  if (isFormValid()) {
    store.updateStepThreeData({
      annualIncome: annualIncome.value,
      changeWillingness: changeWillingness.value
    });
    emit('update-step', 4);
  } else {
    alert('Please fill in all fields before proceeding.');
  }
}

function isFormValid() {
  formErrors.value = {
    annualIncome: '',
    changeWillingness: ''
  };

  let isValid = true;
  if (!annualIncome.value) {
    formErrors.value.annualIncome = 'Annual income is required';
    isValid = false;
  }
  if (!changeWillingness.value) {
    formErrors.value.changeWillingness = 'Change willingness is required';
    isValid = false;
  }
  return isValid;
}



onMounted(() => {
  annualIncome.value = store.stepThreeData.annualIncome;
  changeWillingness.value = store.stepThreeData.changeWillingness;
});
</script>

<style scoped>
.form-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>@/stores/QuestionnaireStore@/stores/questionnaireStore