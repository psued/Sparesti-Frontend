<template>
  <div class="form-container">
    <h2>Snart ferdig</h2>
    <div v-for="(item, index) in products" :key="index" class="product-item">
      <span>{{ item.name }}</span>
      <span>{{ item.frequency }} per {{ item.timeUnit }}</span>
      <span>{{ item.price }}kr</span>
      <button @click="removeProduct(index)">X</button>
    </div>
    <div class="new-product">
      <input v-model="newProduct.name" placeholder="Product name" />
      <input v-model="newProduct.frequency" placeholder="Frequency" />
      <select v-model="newProduct.timeUnit">
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
      <input v-model="newProduct.price" placeholder="Unit price" />
      <button @click="addProduct">Add</button>
    </div>
    <FormButton @click="finishQuestionnaire">Next</FormButton>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import type { Product } from '@/types/questionnaireData';
import FormButton from '@/components/forms/FormButton.vue';
import router from '@/router';

const emit = defineEmits(['update-step']);
const store = useQuestionnaireStore();

const finishQuestionnaire = async () => {
  await store.submitAllData();
  router.push('/');
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
/* Your existing styles... */

.product-item span {
  margin-right: 10px;
}

/* Add styles for your product list and form... */
</style>
@/stores/QuestionnaireStore