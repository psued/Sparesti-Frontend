<template>
  <div class="form-container">
    <h2>Vi trenger Litt mer info</h2>
    <p>Legg til produkter du vil bruke mindre på</p>
    <div class="product-list">
      <!-- Product Header -->
      <div class="product-header">
        <span>Navn</span>
        <span>Mengde</span>
        <span>Enhets pris</span>
      </div>
      <!-- Product Items -->
      <div v-for="(item, index) in products" :key="index" class="product-item">
        <span>{{ item.name }}</span>
        <span>{{ item.frequency }} per {{ item.timeUnit }}</span>
        <span>{{ item.price }}kr</span>
        <button @click="removeProduct(index)">X</button>
      </div>
    </div>
    <!-- New Product Form -->
    <div class="new-product">
      <input v-model="newProduct.name" placeholder="Product name" class="new-product-input" />
      <div class="frequency-wrapper">
        <input v-model="newProduct.frequency" placeholder="Frequency" class="frequency-input" />
        <select v-model="newProduct.timeUnit" class="timeunit-select">
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      <div class="price-wrapper">
        <input v-model="newProduct.price" placeholder="Unit price" class="price-input" />
        <span>kr</span>
      </div>
      <button @click="addProduct" class="add-button">Add</button>
    </div>
    <div class="button-container">
      <FormButton type="button" @click="goBack">Tilbake</FormButton>
      <FormButton type="submit" @click="finishQuestionnaire">Submit informasjon</FormButton>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted, watch } from "vue";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import { submitUserInfo, updateAccounts } from "@/api/userHooks";
import FormButton from "@/components/forms/FormButton.vue";
import { useUserStore } from "@/stores/userStore";

const store = useQuestionnaireStore();
const userStore = useUserStore();
const isLoading = ref(false);
const error = ref(null);
const emit = defineEmits(["update-step"]);

const products = ref(store.stepFourData.products);
const newProduct = ref({ name: "", frequency: "", timeUnit: "day", price: "" });

const checkingAccount = ref(store.stepTwoData.checkingAccount.replace(/\s/g, ''));
const savingsAccount = ref(store.stepTwoData.savingsAccount.replace(/\s/g, ''));

watch(products, (newProducts) => {
  store.updateStepFourData({ products: newProducts });
}, { deep: true });

function addProduct() {
  if (newProduct.value.name && newProduct.value.frequency && newProduct.value.price) {
    products.value.push({
      ...newProduct.value,
      price: parseFloat(newProduct.value.price) 
    });
    newProduct.value = { name: "", frequency: "", timeUnit: "day", price: "" };
  }
}

function removeProduct(index) {
  products.value.splice(index, 1);
}

const finishQuestionnaire = async () => {
  isLoading.value = true;
  const userInfo = {
    ...store.getAllData(),
    userId: userStore.getUserId,
    checkingAccount: checkingAccount.value,
    savingsAccount: savingsAccount.value
  };

  try {
    console.log("Submitting questionnaire data:", userInfo);
    await submitUserInfo(userInfo);
    console.log("Questionnaire data submitted successfully!");
    await updateAccounts(checkingAccount.value, savingsAccount.value);
    console.log("Account numbers updated successfully!");
    emit("update-step", 5);
  } catch (err) {
    console.error("Failed during the process:", err);
    error.value = err.message || "Failed to complete all updates.";
  } finally {
    isLoading.value = false;
  }
};

function goBack() {
  emit("update-step", 3);
}

onMounted(() => {
  products.value = [...store.stepFourData.products];
});
</script>


<style scoped>
.product-list {
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 1rem;
  width: 100%;
  max-height: calc(50px * 5);
  overflow-y: auto;
  text-align: left; 
}

/* Header for the product list */
.product-header {
  display: flex;
  justify-content: space-between;
  text-align: left;  /* Align text to the left */
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
  position: sticky;
  z-index: 1;
  position: sticky;
  top: 0;
}

/* Individual product items */
.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.product-item:last-child {
  border-bottom: none;
}

.product-item span {
  flex: 1; 
  text-align: center;
}

.product-item button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  text-align: center;
}

.new-product-form {
  padding: 10px;
  border-radius: 8px;
  display: flex;
}

.new-product-form input,
.new-product-form select {
  padding: 10px;
  margin-bottom: 10px; /* Space between inputs */
}

.add-button {
  border: none;
  border-radius: 5px;
  padding: 7px 15px;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
  
}

.form-container h2 {
  margin-bottom: 1rem;
}

.form-container p {
  margin-bottom: 2rem;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
}
.product-header span,
.product-item span {
  display: inline-block;
  text-align: center;
}

.product-header span:nth-child(1),
.product-item span:nth-child(1) {
  flex: 3;
}

.product-header span:nth-child(2),
.product-item span:nth-child(2),
.product-header span:nth-child(3),
.product-item span:nth-child(3) {
  flex: 2; 
}

.product-header span:nth-child(4),
.product-item span:nth-child(4) {
  flex: 1;
}

</style>
@/stores/QuestionnaireStore
