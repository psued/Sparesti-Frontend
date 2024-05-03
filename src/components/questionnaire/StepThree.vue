<!--
  This is the third step of the questionnaire.
  It asks the user about their annual income and willingness to change their saving habits.
  The user can input their annual income and use a slider to indicate their willingness to change.
-->
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
      <div v-if="formErrors.annualIncome" class="error">
        {{ formErrors.annualIncome }}
      </div>
    </div>

    <div class="input-group">
      <label for="willingness-range"
        >På en skala fra 0 til 5, hvor villig er du til å endre
        sparevanene?</label
      >
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

function isFormValid() {
  formErrors.value.annualIncome = validateAnnualIncome(annualIncome.value);
  formErrors.value.changeWillingness =
    changeWillingness.value === undefined || changeWillingness.value === null
      ? "Please indicate your willingness to change."
      : "";

  return !formErrors.value.annualIncome && !formErrors.value.changeWillingness;
}

function validateAnnualIncome(income: any) {
  // Check if the income is empty
  if (!income && income !== 0) {
    return "Årlig inntekt er påkrevd.";
  }

  // Check for invalid characters
  if (/[^0-9.]/.test(income)) {
    return "Inntekten kan bare inneholde tall.";
  }

  // Convert string to a floating-point number
  const numIncome = parseFloat(income);
  if (isNaN(numIncome) || numIncome < 0) {
    return "Går du i minus?";
  }
  return "";
}

function goToNextStep() {
  if (isFormValid()) {
    store.updateStepThreeData({
      annualIncome: annualIncome.value,
      changeWillingness: changeWillingness.value,
    });
    emit("update-step", 4);
  }
}

function goBack() {
  emit("update-step", 2);
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
  background: #f09217;
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

.error {
  color: #e57373;
}
</style>
@/stores/QuestionnaireStore
