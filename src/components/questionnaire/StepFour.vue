<template>
  <div class="form-container">
    <h2>Snart ferdig</h2>
    <div v-for="(item, index) in products" :key="index" class="product-item">
      <span>{{ item.name }}</span>
      <span>{{ item.frequency }}</span>
      <span>{{ item.price }}</span>
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
    <FormButton @click="goToNextStep">Next</FormButton>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import FormButton from '@/components/forms/FormButton.vue';

interface ProductItem {
  name: string;
  frequency: string;
  price: string;
  timeUnit: string;
}


const emit = defineEmits(['update-step']);

const products = ref<ProductItem[]>([]);
const newProduct = ref({ name: '', frequency: '', timeUnit: 'day', price: '' });

function addProduct() {
  if (newProduct.value.name && newProduct.value.frequency && newProduct.value.price) {
    products.value.push({ ...newProduct.value });
    newProduct.value = { name: '', frequency: '', timeUnit: 'day', price: '' }; // Reset the form
  }
}

function removeProduct(index) {
  products.value.splice(index, 1);
}

function saveStepData() {
  const stepData = {
    products: products.value
  };
  localStorage.setItem('stepFourData', JSON.stringify(stepData));
}

function loadStepData() {
  const savedStepData = localStorage.getItem('stepFourData');
  if (savedStepData) {
    const stepData = JSON.parse(savedStepData);
    // ... load your other step data
    products.value = stepData.products || [];
  }
}

function goToNextStep() {
  if (isFormValid()) {
    saveStepData();
    emit('update-step', 4); 
  } else {
    alert('Please fill in all fields before proceeding.');
  }
}

onMounted(loadStepData);
</script>

<style scoped>
/* Your existing styles... */

.product-item span {
  margin-right: 10px;
}

/* Add styles for your product list and form... */
</style>
