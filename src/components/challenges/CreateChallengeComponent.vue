<template>
  <div id="createChallengeContainer">
    <p>Challenge Title</p>
    <input type="text" placeholder="Title"/>

    <p>Challenge Description</p>
    <textarea maxlength="60" id="challengeDescriptionInput" rows="3"></textarea>

    <p>Velg en Emoji</p>
    <EmojiPickerComponent :emoji-prop="emoji" @pickEmoji="pickEmoji"/>

    <p>Velg et tidsintervall</p>

    <div id="timeIntervalRadio">
      <ButtonComponent @click="clickDaily" :pressed="daily" class="timeIntervalButton">
        <template v-slot:content>
          <p class="timeIntervalText">Daglig</p>
        </template>
      </ButtonComponent>
      <ButtonComponent @click="clickWeekly" :pressed="weekly" class="timeIntervalButton">
        <template v-slot:content>
          <p class="timeIntervalText">Ukentlig</p>
        </template>
      </ButtonComponent>
      <ButtonComponent @click="clickMonthly" :pressed="monthly" class="timeIntervalButton">
        <template v-slot:content>
          <p class="timeIntervalText">Månedlig</p>
        </template>
      </ButtonComponent>
    </div>

    <p>Hva slags type utfordring vil du gjøre?</p>

    <div id="timeIntervalRadio">
      <ButtonComponent @click="clickSave" :pressed="save" class="timeIntervalButton">
        <template v-slot:content>
          <p class="timeIntervalText">Spar</p>
        </template>
      </ButtonComponent>
      <ButtonComponent @click="clickBuy" :pressed="buy" class="timeIntervalButton">
        <template v-slot:content>
          <p class="timeIntervalText">Kjøp</p>
        </template>
      </ButtonComponent>
      <ButtonComponent @click="clickConsumption" :pressed="consumption" class="timeIntervalButton">
        <template v-slot:content>
          <p class="timeIntervalText">Forbruk</p>
        </template>
      </ButtonComponent>
    </div>

    <div v-if="challengeType === 'save'">
      <p>Sett deg et sparemål</p>
      <input type="number" min="0" step="1" placeholder="kr"/>

    </div>

    <div v-if="challengeType === 'buy'">
      <p>Produktnavn</p>
      <input type="text" placeholder="Produkt"/>
      <p>Kjøpsgrense</p>
      <input type="number" min="0" step="1" placeholder="Antall"/>
    </div>

    <div v-if="challengeType === 'consumption'">
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

const emoji = ref("");

function pickEmoji(e) {
  emoji.value = e;
  console.log(emoji.value);
}

const daily = ref(false);
const weekly = ref(false);
const monthly = ref(false);

function clickDaily() {
  daily.value = true;
  weekly.value = false;
  monthly.value = false;
}
function clickWeekly() {
  daily.value = false;
  weekly.value = true;
  monthly.value = false;
}
function clickMonthly() {
  daily.value = false;
  weekly.value = false;
  monthly.value = true;
}

const challengeType = ref("");

const save = ref(false);
const buy = ref(false);
const consumption = ref(false);

function clickSave() {
  save.value = true;
  buy.value = false;
  consumption.value = false;
  challengeType.value = "save";
}
function clickBuy() {
  save.value = false;
  buy.value = true;
  consumption.value = false;
  challengeType.value = "buy";
}
function clickConsumption() {
  save.value = false;
  buy.value = false;
  consumption.value = true;
  challengeType.value = "consumption";
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

#timeIntervalRadio {
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

}

.timeIntervalButton {
  width: 100px;
  height: 30px;
  display: inline-block;
}

.timeIntervalText {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}
</style>