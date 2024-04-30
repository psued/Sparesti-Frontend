<template>
  <div id="createChallengeContainer">
    <p>Challenge Title</p>
    <input type="text" placeholder="Title"/>

    <p>Challenge Description</p>
    <textarea maxlength="60" id="challengeDescriptionInput" rows="3"></textarea>

    <p>Velg en Emoji</p>

    <SVGButtonComponent class="emojiButton">
      <template v-slot:icon>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.9126 15.9336C10.1709 16.249 11.5985 16.2492 13.0351 15.8642C14.4717 15.4793 15.7079 14.7653 16.64 13.863" stroke="#F09217" stroke-width="1.5" stroke-linecap="round"/>
          <ellipse cx="14.5094" cy="9.77405" rx="1" ry="1.5" transform="rotate(-15 14.5094 9.77405)" fill="#F09217"/>
          <ellipse cx="8.71402" cy="11.3278" rx="1" ry="1.5" transform="rotate(-15 8.71402 11.3278)" fill="#F09217"/>
          <path d="M13 16.0004L13.478 16.9742C13.8393 17.7104 14.7249 18.0198 15.4661 17.6689C16.2223 17.311 16.5394 16.4035 16.1708 15.6524L15.7115 14.7168" stroke="#F09217" stroke-width="1.5"/>
          <path d="M4.92847 4.92663C6.12901 3.72408 7.65248 2.81172 9.41185 2.34029C14.7465 0.910876 20.2299 4.0767 21.6593 9.41136C23.0887 14.746 19.9229 20.2294 14.5882 21.6588C9.25357 23.0882 3.7702 19.9224 2.34078 14.5877C1.86936 12.8284 1.89775 11.0528 2.33892 9.41186" stroke="#F09217" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </template>
    </SVGButtonComponent>

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

.emojiButton {
  width: 100px;
  height: 100px;
  margin: auto;
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