<template>
  <div id="createChallengeContainer">
    <p>Challenge Title</p>
    <input type="text" placeholder="Title" id="challengeTitle"/>

    <p>Challenge Description</p>
    <textarea maxlength="60" id="challengeDescriptionInput" rows="3"></textarea>

    <p>Velg en Emoji</p>
    <EmojiPickerComponent :emoji-prop="emoji" @pickEmoji="pickEmoji"/>

    <p>Velg et tidsintervall</p>

    <RadioButtonsComponent @radioClick="pickTimeInterval" :radioButtons="['Daily', 'Weekly', 'Monthly']"/>

    <p>Hva slags type utfordring vil du gjøre?</p>

    <RadioButtonsComponent @radioClick="setChallengeType" :radioButtons="['Save', 'Buy', 'Consumption']"/>

    <div v-if="challengeType === 'Save'">
      <p>Sett deg et sparemål</p>
      <input type="number" min="0" step="1" placeholder="kr"/>

    </div>

    <div v-if="challengeType === 'Buy'">
      <p>Produktnavn</p>
      <input type="text" placeholder="Produkt"/>
      <p>Kjøpsgrense</p>
      <input type="number" min="0" step="1" placeholder="Antall"/>
    </div>

    <div v-if="challengeType === 'Consumption'">
      <p>Sett deg et sparemål</p>
      <input type="number" min="0" step="1" placeholder="Title"/>
    </div>


  </div>
</template>

<script setup lang="ts">
import SVGButtonComponent from "@/components/assets/SVGButtonComponent.vue";
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import { ref } from "vue";
import EmojiPickerComponent from "@/components/assets/EmojiPickerComponent.vue";
import RadioButtonsComponent from "@/components/assets/RadioButtonsComponent.vue";

const emoji = ref("");

function pickEmoji(e) {
  emoji.value = e;
  console.log(emoji.value);
}


const timeInterval = ref("");
function pickTimeInterval(interval) {
  timeInterval.value = interval;
  console.log(timeInterval.value);
}

const challengeType = ref("");

function setChallengeType(type) {
  challengeType.value = type;
}
</script>

<style scoped>
#challengeTitle {

}

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