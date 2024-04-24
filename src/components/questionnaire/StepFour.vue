<template>
  <div class="form-container">
    <h2>Snart ferdig</h2>
    <div class="product-container">
      <div v-for="(item, index) in products" :key="index" class="product-item">
        <span>{{ item.name }}</span>
        <span>{{ item.frequency }} per {{ item.timeUnit }}</span>
        <span>{{ item.price }}kr</span>
        <button @click="removeProduct(index)">X</button>
      </div>
    </div>
    <div class="new-product">
      <input v-model="newProduct.name" placeholder="Product name" />
      <input v-model="newProduct.frequency" placeholder="Frequency" />
      <select v-model="newProduct.timeUnit">
        <option value="day">Dag</option>
        <option value="week">Uke</option>
        <option value="month">Måned</option>
      </select>
      <input v-model="newProduct.price" placeholder="Unit price" />
      <button @click="addProduct">Add</button>
    </div>
    <FormButton @click="finishQuestionnaire">Ferdig</FormButton>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import type { Product } from '@/types/QuestionnaireData';
import FormButton from '@/components/forms/FormButton.vue';
import router from '@/router';
import { submitUserInfo } from '@/api/userHooks';

const emit = defineEmits(['update-step']);
const store = useQuestionnaireStore();

const finishQuestionnaire = async () => {
  console.log('Final Data to Submit:', store.fullData);
  
  try {
    await store.submitAllData();
  } catch (error) {
    console.error('Error finishing questionnaire:', error);
  }
};

const products = ref<Product[]>(store.stepFourData.products);
const newProduct = ref({ name: '', frequency: '', timeUnit: 'day', price: '' });

watch(products, (newProducts) => {
  store.updateStepFourData({ products: newProducts });
}, { deep: true });

function addProduct() {
  if (newProduct.value.name && newProduct.value.frequency && newProduct.value.price) {
    products.value.push({
      name: newProduct.value.name,
      frequency: newProduct.value.frequency,
      timeUnit: newProduct.value.timeUnit,
      price: newProduct.value.price
    });
    newProduct.value = { name: '', frequency: '', timeUnit: 'day', price: '' };
  }
}

function removeProduct(index: number) {
  products.value.splice(index, 1);
}

function goToNextStep() {
  emit('update-step', 5);
}

onMounted(() => {
  products.value = [...store.stepFourData.products];
});
</script>

<style scoped>
.form-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.product-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}
</style>
@/stores/QuestionnaireStore