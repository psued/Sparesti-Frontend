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


  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EmojiPickerComponent from "@/components/assets/EmojiPickerComponent.vue";
import RadioButtonsComponent from "@/components/assets/RadioButtonsComponent.vue";

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


function pickEmoji(e: string) {
  emoji.value = e;
}


function pickTimeInterval(interval: string) {
  timeInterval.value = interval;
}

function setChallengeType(type : string) {
  challengeType.value = type;
}
</script>

<style scoped>
#createChallengeContainer {
  margin: 0 20px;
  height: 100%;
}

#challengeDescriptionInput {
  text-align: center;
  resize: none;
  padding: 0 5px;
}
</style>