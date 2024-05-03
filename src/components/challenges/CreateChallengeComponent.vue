<template>
  <div id="createChallengeContainer">
    <input maxlength="20" v-model="challengeTitle" type="text" placeholder="Tittel" id="challengeTitle"/>

    <div id="contentBlock1">
      <div class="descriptionContainer">
        <p class="inputTitle">Beskrivelse</p>
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

      <div class="createSpare" v-if="challengeType === 'Spare'">
        <div class="optionalsBlock">
          <p class="inputTitle">Sparemål</p>
          <input v-model="targetAmount" type="number" min="0" step="1" placeholder="kr"/>
        </div>
      </div>

      <div class="createForbruk" v-if="challengeType === 'Forbruk'">
        <div class="forbrukBlock">
          <p class="inputTitle">Produktnavn</p>
          <input v-model="productName" type="text" placeholder="Produkt"/>
        </div>
        <div class="forbrukBlock">
          <p class="inputTitle">Kjøpsgrense</p>
          <input v-model="targetAmount" type="number" min="0" step="1" placeholder="Antall"/>
        </div>
      </div>

      <div class="createBudsjett" v-if="challengeType === 'Budsjett'">
        <div>
          <div class="budsjettBlock">
            <p class="inputTitle">Kategori</p>
            <select v-model="tempCategory"  name="category">
              <option v-for="row in budgetRows" :value="row">{{row.name}}</option>
            </select>
          </div>

          <div class="budsjettBlock">
            <p class="inputTitle">Nytt Beløp</p>
            <input v-model="targetAmount" type="number" min="0" :max="tempCategory.maxAmount-1" step="1" placeholder="Antall"/>
          </div>
        </div>
        <p class="budsjettChallengeText" v-if="tempCategory.maxAmount">Det er budsjettert {{ tempCategory.maxAmount }}kr i denne kategorien</p>
      </div>

    </div>

    <ButtonComponent id="finishButton" @click="createChallenge">
      <template v-slot:content>
        <p id="finishText">Lag</p>
      </template>
    </ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import EmojiPickerComponent from "@/components/assets/EmojiPickerComponent.vue";
import RadioButtonsComponent from "@/components/assets/RadioButtonsComponent.vue";
import {
  createSavingChallenge,
  createPurchaseChallenge,
  createConsumptionChallenge,
  addChallengeToUser
} from "@/api/challengeHooks";
import {type ChallengeCreation} from "@/types/challengeTypes";
import {BudgetRow} from "@/types/Budget";
import {getNewestBudget} from "@/api/budgetHooks";

const challengeTitle = ref("");
const challengeDescription = ref("");
const timeInterval = ref("");
const emoji = ref("");
const challengeType = ref("");
const targetAmount = ref(0);
const productName = ref("");
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

const tempCategory = ref<BudgetRow>({
  id: 0,
  name: "",
  usedAmount: 0,
  maxAmount: 0,
  category: "",
  emoji: ""
})

const budgetRows = ref([])
async function fetchChallengeObjects() {
  const budgetResponse = await getNewestBudget();
  for(let i = 0; i < budgetResponse.row.length; i++){
    budgetRows.value.push(budgetResponse.row[i])
  }
}

onMounted(async () => {
  await fetchChallengeObjects();
})


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
input:focus, textarea:focus, select:focus {
  outline: none;
}

input, textarea, select {
  background-color: var(--color-background);
  border: none;
  border-bottom: solid 1px #729960;
}


.inputTitle {
  font-weight: 600;
  margin-bottom: 10px;
  text-align: left;
}

#createChallengeContainer {
  margin: 15px 20px;
}

#challengeTitle {
  text-align: center;
  font-size: 1.5rem;
  width: 240px;
  margin-bottom: 1rem;
}

#contentBlock1 {
  display: flex;
  flex-direction: row;
}

.descriptionContainer {
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 70%;
  height: 100%;
}

#challengeDescriptionInput {
  resize: none;
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

.radioButtonsContainer{
  margin-top: 20px;
}

.radioText {
  font-weight: 600;
  margin-bottom: 10px;
}

.radioButtons{
  width: 100%;
  height: 30px;
  margin-top: 10px;
}

#optionalsContainer {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.createForbruk, .createBudsjett {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.forbrukBlock {
  margin-right:10px;
}

.budsjettBlock {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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