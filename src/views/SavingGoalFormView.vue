<template>
  <div class="saving-goal-form">
    <h1>Opprett et sparemål</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="image">Last opp et bilde:</label>
        <input type="file" id="image" @change="handleImageUpload" accept="image/*" />
      </div>

      <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Forhåndsvisning av bilde" />
        </div>

      <div class="form-group">
        <label for="title">Tittel:</label>
        <input type="text" id="title" v-model="savingGoal.title" />
      </div>

      <div class="form-group">
        <label for="description">Beskrivelse:</label>
        <textarea id="description" v-model="savingGoal.description"></textarea>
      </div>

      <div class="form-group">
        <label for="value">Mål for sparing i kr (NOK):</label>
        <input type="number" id="value" v-model.number="savingGoal.value" />
      </div>

      <button type="submit">Lagre mål</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface SavingGoal {
  image: string;
  title: string;
  description: string;
  value: number;
}

const savingGoal = ref<SavingGoal>({ image: '', title: '', description: '', value: 0 });
const imagePreview = ref<string | null>(null);

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      savingGoal.value.image = e.target?.result as string;
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function submitForm() {
  console.log('Saving Goal:', savingGoal.value);
  // Here you would typically send this data to a server
}
</script>

<style scoped>
.saving-goal-form {
  max-width: 600px;
  margin: auto;
  margin-top: 2vh;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="file"], input[type="text"], input[type="number"], textarea {
  width: 100%;
  padding: 8px;
  line-height: 1.5;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.image-preview img {
  width: 30vh;
  height: auto;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  color: white;
  background-color: #8fbf7f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
