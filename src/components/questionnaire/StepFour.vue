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
        <span>{{ item.amount }}</span>
        <span>{{ item.price }}kr</span>
        <button @click="removeProduct(index)">X</button>
      </div>
    </div>
    <!-- New Product Form -->
    <div class="new-product">
      <input v-model="newProduct.name" placeholder="Product name" class="new-product-input" />
      <input v-model.number="newProduct.amount" type="number" placeholder="Amount" class="new-product-input" />
      <div class="frequency-wrapper">
        <select v-model="newProduct.frequency" class="timeunit-select">
          <option value="daily">Daglig</option>
          <option value="weekly">Ukentlig</option>
          <option value="monthly">Månedlig</option>
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
      <FormButton type="submit" @click="finishQuestionnaire">Neste</FormButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, watch } from "vue";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import { submitUserInfo, updateUserInfo, updateAccounts } from "@/api/userHooks";
import FormButton from "@/components/forms/FormButton.vue";
import { useUserStore } from "@/stores/userStore";

const store = useQuestionnaireStore();
const userStore = useUserStore();
const isLoading = ref(false);
const error = ref(null);
const emit = defineEmits(["update-step"]);

const products = ref(store.stepFourData.products);
const newProduct = ref({ name: "", frequency: "daily",amount: 0, price: "" });

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
    newProduct.value = { name: "", frequency: "", price: "" };
  }
}

function removeProduct(index) {
  products.value.splice(index, 1);
}

const finishQuestionnaire = async () => {
  isLoading.value = true;
  const checkingAccountNumber = parseInt(checkingAccount.value, 10);
  const savingsAccountNumber = parseInt(savingsAccount.value, 10);
  const userInfo = {
    ...store.getAllData(),
    checkingAccount: checkingAccount.value,
    savingsAccount: savingsAccount.value,
    budgetingProducts: products.value.map(product => ({
      name: product.name,
      frequency: product.frequency.toUpperCase(), 
      amount: parseFloat(product.amount), 
      unitPrice: parseFloat(product.price),
    }))
  };

  try {
    console.log("User info exists:", userStore.userInfoExists);
    if (userStore.userInfoExists) {
      console.log("Updating user info...");
      await updateUserInfo(userInfo);
      console.log("User info updated successfully!");
    } else {
      console.log("Submitting new user info...");
      await submitUserInfo(userInfo);
      userStore.userInfoExists = true; 
      console.log("User info submitted successfully!");
    }

    await updateAccounts(checkingAccount.value, savingsAccount.value);
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

.product-header {
  display: flex;
  justify-content: space-between;
  text-align: left;
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
  flex: 1;
}

.product-header span:nth-child(2),
.product-item span:nth-child(2),
.product-header span:nth-child(3),
.product-item span:nth-child(3) {
  flex: 2; 
}
</style>
@/stores/QuestionnaireStore
