<template>
  <div id="createChallengeContainer">
    <input maxlength="20" v-model="challengeTitle" type="text" placeholder="Tittel" id="challengeTitle"/>

    <div id="test">
      <div class="challengeContent1">
        <p class="formText">Beskrivelse</p>
        <textarea placeholder="Beskrivelse" v-model="challengeDescription" maxlength="60" id="challengeDescriptionInput" rows="3"></textarea>
      </div>

      <div class="emojiContainer">
        <p class="radioText">Emoji</p>
        <EmojiPickerComponent :emoji-prop="emoji" @pickEmoji="pickEmoji" id="challengeEmojiPicker"/>
      </div>
    </div>

    <div class="radioButtonsContainer">
      <p class="radioText">Hva slags type utfordring vil du gjøre?</p>
      <RadioButtonsComponent class="radioButtons" @radioClick="setChallengeType" :radioButtons="['Spare', 'Forbruk', 'Budsjett']"/>
    </div>

    <div class="radioButtonsContainer" v-if="challengeType === 'Spare' || challengeType === 'Forbruk'">
      <p class="radioText">Velg et tidsintervall</p>
      <RadioButtonsComponent class="radioButtons" @radioClick="pickTimeInterval" :radioButtons="['Daily', 'Weekly', 'Monthly']"/>
    </div>

    <div id="optionalsContainer">

      <div class="optionalsInfo" v-if="challengeType === 'Spare'">
        <div class="optionalsBlock">
          <p class="formText">Sparemål</p>
          <input v-model="targetAmount" type="number" min="1" step="1" placeholder="kr"/>
        </div>
      </div>

      <div class="optionalsInfo" v-if="challengeType === 'Forbruk'">
        <div class="optionalsBlock">
          <p class="formText">Produktnavn</p>
          <input v-model="productName" type="text" placeholder="Produkt"/>
        </div>
        <div class="optionalsBlock">
          <p class="formText">Kjøpsgrense</p>
          <input v-model="quantityLimit" type="number" min="1" step="1" placeholder="Antall"/>
        </div>
        <div class="optionalsBlock">
          <p class="formText">Produkt pris</p>
          <input v-model="productPrice" type="number" min="1" step="1" placeholder="Produkt pris (i kr)"/>
        </div>
      </div>

      <div class="optionalsInfo" v-if="challengeType === 'Budsjett'">
        <div class="optionalsBlock">
          <p class="formText">Kategori</p>
          <input v-model="category" type="number" min="0" step="1" placeholder="Kategori"/>
        </div>
        <div class="optionalsBlock">
          <p class="formText">Reduksjon</p>
          <input v-model="reductionAmount" type="number" min="1" step="1" placeholder="Antall"/>
        </div>
      </div>
    </div>

    <ButtonComponent id="finishButton" @click="createChallenge">
      <template v-slot:content>
        <p id="finishText">Ferdig</p>
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
const emoji = ref("");
const challengeType = ref("");
const targetAmount = ref(0);
const productName = ref("");
const productPrice = ref(0);
const quantityLimit = ref(0);
const category = ref("");
const reductionAmount = ref(0);
const createdChallenge = ref<ChallengeCreation | null>(null);
const difficultyLevel = ref("");

function pickEmoji(e: string) {
  emoji.value = e;
}

function pickTimeInterval(interval: string) {
  timeInterval.value = interval;
}

function setChallengeType(type : string) {
  challengeType.value = type;
}

async function createChallenge() {

  if (timeInterval.value === "Daily") {
    difficultyLevel.value = "EASY";
  } else if (timeInterval.value === "Weekly") {
    difficultyLevel.value = "MEDIUM";
  } else if (timeInterval.value === "Monthly") {
    difficultyLevel.value = "HARD";
  }

  try {
    if (challengeType.value === 'Spare') {
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
    } else if (challengeType.value === 'Forbruk') {
      createdChallenge.value = await createPurchaseChallenge({
        title: challengeTitle.value,
        description: challengeDescription.value,
        timeInterval: timeInterval.value.toUpperCase(),
        difficultyLevel: difficultyLevel.value.toUpperCase(),
        mediaUrl: emoji.value,
        productName: productName.value,
        productPrice: productPrice.value,
        targetAmount: quantityLimit.value
      });
      addChallengeToUser(Number(createdChallenge.value.id));
      createdChallenge.value = null;
    } else if (challengeType.value === 'Budsjett') {
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
#test {
  display: flex;
  flex-direction: row;
}
.challengeContent1 {
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 70%;
  height: 100%;
}

.emojiContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 100%;
}

#challengeEmojiPicker {
  width: 45px;
  height: 45px;
}

#createChallengeContainer {
  margin: 15px 20px;
}

#challengeDescriptionInput {
  resize: none;
}

.radioButtonsContainer{
  margin-top: 20px;
}

#challengeTitle {
  text-align: center;
  font-size: 1.5rem;
  width: 240px;
  margin-bottom: 1rem;
}
input:focus, textarea:focus {
  outline: none;
}

input, textarea {
  background-color: var(--color-background);
  border: none;
  border-bottom: solid 1px #729960;
}

.radioText {
  font-weight: 600;
  margin-bottom: 10px;
}

.formText {
  font-weight: 600;
  margin-bottom: 10px;
  text-align: left;
}


.radioButtons{
  width: 100%;
  height: 30px;
  margin-top: 10px;
}

#optionalsContainer {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.optionalsInfo {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.optionalsBlock {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
}

#finishButton {
  position: absolute;
  width: 100px;
  height: 30px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

#finishText {
  font-weight: 700;
  font-size: 1rem;
  color: white;
}
</style>