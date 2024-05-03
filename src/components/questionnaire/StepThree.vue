<template>
  <div class="form-container">
    <h2>Halvveis ferdig!</h2>

    <div class="input-group">
      <label for="annual-income">Hvor mye tjener du i året?</label>
      <input
        type="text"
        id="annual-income"
        v-model="annualIncome"
        placeholder="Angi din årlige inntekt"
        required
        class="text-input"
      />
    </div>

    <div class="input-group">
      <label for="willingness-range">På en skala fra 1 til 5, hvor villig er du til å endre sparevanene?</label>
      <div class="slider-container">
        <input
          type="range"
          id="willingness-range"
          v-model="changeWillingness"
          min="0"
          max="5"
          class="slider"
        />
        <span>{{ changeWillingness }}</span>
      </div>
    </div>
    <div class="button-container">
      <FormButton type="button" @click="goBack">Back</FormButton>
      <FormButton type="submit" @click="goToNextStep">Next</FormButton>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, defineEmits, onMounted } from "vue";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import FormButton from "@/components/forms/FormButton.vue";

const emit = defineEmits(["update-step"]);
const store = useQuestionnaireStore();

const annualIncome = ref(store.stepThreeData.annualIncome);
const changeWillingness = ref(store.stepThreeData.changeWillingness);
const formErrors = ref({
  annualIncome: "",
  changeWillingness: "",
});

function goToNextStep() {
  if (isFormValid()) {
    store.updateStepThreeData({
      annualIncome: annualIncome.value,
      changeWillingness: changeWillingness.value,
    });
    emit("update-step", 4);
  } else {
    alert("Please fill in all fields before proceeding.");
  }
}

function goBack() {
  emit("update-step", 2);
}

function isFormValid() {
  formErrors.value = {
    annualIncome: "",
    changeWillingness: "",
  };

  let isValid = true;
  if (!annualIncome.value && annualIncome.value !== 0) {
    formErrors.value.annualIncome = "Annual income is required";
    isValid = false;
  }
  if (changeWillingness.value === undefined || changeWillingness.value === null) {
    formErrors.value.changeWillingness = "Please indicate your willingness to change.";
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


.input-group {
  width: 100%;
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.text-input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px; 
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider {
  width: calc(100% - 30px);
  margin: 0;
  padding: 0;
  appearance: none;
  border-radius: 5px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #F09217;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
}

.form-button {
  padding: 10px 20px;
}
</style>

@/stores/QuestionnaireStore@/stores/questionnaireStore
