<template>
  <div class="saving-goal-form">
    <h1>Opprett et sparemål</h1>
    <form @submit.prevent="submitForm">

      <div class="form-group">
        <label for="upload-type">Velg opplastingstype:</label>
        <select id="upload-type" v-model="uploadType">
          <option value="image">Bilde</option>
          <option value="icon">Ikon</option>
          <option value="emoji">Emoji</option>
        </select>
      </div>

      <div class="form-group" v-if="uploadType === 'image'">
        <label for="image">Last opp et bilde:</label>
        <input type="file" id="image" @change="handleImageUpload" accept="image/*" />
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Forhåndsvisning av bilde" />
        </div>
      </div>

      <div class="form-group" v-if="uploadType === 'icon'">
        <label for="icon">Velg et ikon:</label>
        <select id="icon" v-model="selectedIconUrl">
          <option v-for="icon in icons" :value="icon.url">{{ icon.name }}</option>
        </select>
        <div v-if="selectedIconUrl" class="icon-preview">
          <img :src="selectedIconUrl" alt="Valgt ikon" />
        </div>
      </div>

      <div class="form-group" v-if="uploadType === 'emoji'">
        <label for="emoji">Velg en emoji:</label>
        <input type="text" id="emoji" v-model="emoji" placeholder="🐷 Kopier og lim inn emoji her" />
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
import { ref, reactive } from 'vue';

interface SavingGoal {
  title: string;
  description: string;
  value: number;
}

interface Icon {
  name: string;
  url: string;
}

const uploadType = ref('image');
const savingGoal = reactive<SavingGoal>({ title: '', description: '', value: 0 });
const imagePreview = ref<string | null>(null);
const selectedIconUrl = ref<string | null>(null);
const emoji = ref('');

const icons = reactive<Icon[]>([
  { name: 'Sushi', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/sushi.png' },
  { name: 'Hamburger', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/hamburger.png' },
  { name: 'Øl', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/ol.png' },
  { name: 'Pizza', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/pizza.png' },
  { name: 'Ferie', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/ferie.png' },
  { name: 'Kaffe', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/kaffe.png' },
  { name: 'Cafe', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/cafe.png' },
  { name: 'Champagne', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/champagne.png' },
  { name: 'Dagligvare', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/dagligvare.png' },
  { name: 'Alpene', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/alpene.png' },
  { name: 'Vannskuter', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/vannscooter.png' },
  { name: 'Frankrike', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/frankrike.png' },
  { name: 'USA', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/usa.png' },
  { name: 'Morokko', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/morokko.png' },
  { name: 'Xbox', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/xbox.png' },
  { name: 'PS5', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/ps5.png'},
  { name: 'Popkorn', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/popkorn.png'},
  { name: 'Kino', url: 'https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/kino.png'},
]);

function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function handleIconUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function submitForm() {
  console.log('Saving Goal:', savingGoal);
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

.icon-preview img {
  width: 30vh; 
  height: auto;
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
