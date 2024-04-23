<template>
  <div class="form-container">
    <h2>Snart ferdig</h2>
    <div v-for="(item, index) in products" :key="index" class="product-item">
      <span>{{ item.name }}</span>
      <span>{{ item.frequency }}</span>
      <span>{{ item.price }}</span>
      <button @click="(index)">X</button>
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
    <FormButton @click="">Next</FormButton>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import type { Product } from '@/types/QuestionnaireData';
import FormButton from '@/components/forms/FormButton.vue';


const emit = defineEmits(['update-step']);

const products = ref<Product[]>([]);
const newProduct = ref({ name: '', frequency: '', timeUnit: 'day', price: '' });


function addProduct() {
  if (newProduct.value.name && newProduct.value.frequency && newProduct.value.price) {
    products.value.push({ ...newProduct.value });
    newProduct.value = { name: '', frequency: '', timeUnit: 'day', price: '' }; // Reset the form
  }
}


</script>

<style scoped>
/* Your existing styles... */

.product-item span {
  margin-right: 10px;
}

/* Add styles for your product list and form... */
</style>
