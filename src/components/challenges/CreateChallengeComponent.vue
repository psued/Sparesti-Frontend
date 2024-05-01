<template>
  <div id="createChallengeContainer">
    <p>Challenge Title</p>
    <input v-model="challengeTitle" type="text" placeholder="Title" id="challengeTitle"/>

    <p>Challenge Description</p>
    <textarea v-model="challengeDescription" maxlength="60" id="challengeDescriptionInput" rows="3"></textarea>

    <p>Velg en Emoji</p>
    <EmojiPickerComponent :emoji-prop="emoji" @pickEmoji="pickEmoji"/>

    <p>Velg et tidsintervall</p>

    <RadioButtonsComponent @radioClick="pickTimeInterval" :radioButtons="['Daily', 'Weekly', 'Monthly']"/>

    <p>Velg vanskelighetsgrad</p>

    <RadioButtonsComponent @radioClick="pickDifficultyLevel" :radioButtons="['Easy', 'Medium', 'Hard']"/>

    <p>Hva slags type utfordring vil du gjøre?</p>

    <RadioButtonsComponent @radioClick="setChallengeType" :radioButtons="['Save', 'Buy', 'Consumption']"/>

    <div v-if="challengeType === 'Save'">
      <p>Sett deg et sparemål</p>
      <input v-model="targetAmount" type="number" min="0" step="1" placeholder="kr"/>
    </div>

    <div v-if="challengeType === 'Buy'">
      <p>Produktnavn</p>
      <input v-model="productName" type="text" placeholder="Produkt"/>
      <p>Kjøpsgrense</p>
      <input v-model="quantityLimit" type="number" min="0" step="1" placeholder="Antall"/>
    </div>

    <div v-if="challengeType === 'Consumption'">
      <p>Velg en kategori</p>
      <input v-model="category" type="number" min="0" step="1" placeholder="Kategori"/>
      <p>Hvor mye mindre ønsker du å bruke?</p>
      <input v-model="reductionAmount" type="number" min="0" step="1" placeholder="Antall"/>
    </div>

    <ButtonComponent class="button" @click="createChallenge">
      <template v-slot:content>
        <h2>Create</h2>
      </template>
      <template v-slot:click>
        <h2>Create</h2>
      </template>
    </ButtonComponent>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import EmojiPickerComponent from "@/components/assets/EmojiPickerComponent.vue";
import RadioButtonsComponent from "@/components/assets/RadioButtonsComponent.vue";
import { createSavingChallenge, createPurchaseChallenge, createConsumptionChallenge, addChallengeToUser } from "@/api/challengeHooks";
import { type ChallengeCreation } from "@/types/challengeTypes";

const challengeTitle = ref("");
const challengeDescription = ref("");
const timeInterval = ref("");
const difficultyLevel = ref("");
const emoji = ref("");
const challengeType = ref("");
const targetAmount = ref(0);
const productName = ref("");
const quantityLimit = ref(0);
const category = ref("");
const reductionAmount = ref(0);
const createdChallenge = ref<ChallengeCreation | null>(null);

function pickEmoji(e: string) {
  emoji.value = e;
}

function pickTimeInterval(interval: string) {
  timeInterval.value = interval;
}

function pickDifficultyLevel(level: string) {
  difficultyLevel.value = level;
}

function setChallengeType(type : string) {
  challengeType.value = type;
}

async function createChallenge() {
  try {
    if (challengeType.value === 'Save') {
      createdChallenge.value = await createSavingChallenge({
        title: challengeTitle.value,
        description: challengeDescription.value,
        timeInterval: timeInterval.value.toUpperCase(),
        difficultyLevel: difficultyLevel.value.toUpperCase(),
        mediaUrl: emoji.value,
        targetAmount: targetAmount.value
      });
      addChallengeToUser(Number(createdChallenge.value.id));
      createdChallenge.value = null;
    } else if (challengeType.value === 'Buy') {
      createdChallenge.value = await createPurchaseChallenge({
        title: challengeTitle.value,
        description: challengeDescription.value,
        timeInterval: timeInterval.value.toUpperCase(),
        difficultyLevel: difficultyLevel.value.toUpperCase(),
        mediaUrl: emoji.value,
        productName: productName.value,
        targetAmount: quantityLimit.value
      });
      addChallengeToUser(Number(createdChallenge.value.id));
      createdChallenge.value = null;
    } else if (challengeType.value === 'Consumption') {
      createdChallenge.value = await createConsumptionChallenge({
        title: challengeTitle.value,
        description: challengeDescription.value,
        targetAmount: targetAmount.value,
        timeInterval: timeInterval.value.toUpperCase(),
        difficultyLevel: difficultyLevel.value.toUpperCase(),
        mediaUrl: emoji.value,
        productCategory: category.value,
        reductionPercentage: reductionAmount.value
      });
      addChallengeToUser(Number(createdChallenge.value.id));
      createdChallenge.value = null;
    } else {
      throw new Error("Invalid challenge type");
    }
    // Reset the form fields after successful creation
    alert("Challenge created successfully!");
    resetForm();
  } catch (error) {
    console.error("Error creating challenge:", error);
  }
}

function resetForm() {
  challengeTitle.value = "";
  challengeDescription.value = "";
  timeInterval.value = "";
  emoji.value = "";
  challengeType.value = "";
  targetAmount.value = 0;
  productName.value = "";
  quantityLimit.value = 0;
  category.value = "";
  reductionAmount.value = 0;
}
</script>

<style scoped>
#createChallengeContainer {
  margin: 0 20px;
  height: 90%;
}

#challengeDescriptionInput {
  text-align: center;
  resize: none;
  padding: 0 5px;
}

.button {
  color: white;
  margin: 2rem auto;
  cursor: pointer;
  width: 200px;
  height: 50px;
}

p {
  margin-top: 1rem;
}
</style>