<template>
  <div class="challengeBox">
    <div class="challengeHeader">
      <div class="timeSpanDiv">
        <p class="timeSpan">{{challengeObject.timeInterval}}</p>
      </div>
      <div :class="{daysRemainingDiv : challengeExpired}">
        <p class="daysRemaining">{{timeLeftText}}</p>
      </div>
    </div>
    <h2 class="challengeTitle">{{challengeObject.title}}</h2>
    <ChallengeProgress :challenge-type="challengeType" :target-amount="challengeObject.targetAmount" :saved-amount="challengeObject.usedAmount" :media-url="challengeObject.mediaUrl || ''" />
    <p class="challengeText">{{challengeObject.description + challengeType}}</p>


    <div class="completeButtonContainer">
      <ButtonComponent :foreground-color="'#83FF83'" :background-color="'#2ABF2A'" v-if="completed" class="completeButton" @click="updateCompleted()">
        <template v-slot:content>
          <p class="completeText">Fullfør!</p>
        </template>
      </ButtonComponent>

      <ButtonComponent v-if="!completed && challengeExpired" class="removeButton">
        <template v-slot:content>
          <p class="removeText">Fjern Utfordring</p>
        </template>
      </ButtonComponent>

      <ButtonComponent @click="toggleAddPopup" v-if="challengeType === 'Spare' && !completed && !challengeExpired" class="addButton">
        <template v-slot:content>
          <p>Legg til Penger</p>
        </template>
      </ButtonComponent>

      <ButtonComponent @click="toggleAddPopup" v-if="challengeType === 'Forbruk' && !completed && !challengeExpired" class="addButton">
        <template v-slot:content>
          <p>Legg til Produkt</p>
        </template>
      </ButtonComponent>
    </div>

    <PopupComponent @togglePopup="toggleAddPopup" :is-visible="addPopupIsVisible">
      <template v-slot:content>
        <div class="addPopup">

          <div v-if="challengeType === 'Forbruk'">
            <p>Are you sure you want to add a product?</p>
            <div class="popupButtonsDiv">
              <ButtonComponent class="popupButton" @click="addPopupIsVisible = false">
                <template v-slot:content>
                  <p>Avbryt</p>
                </template>
              </ButtonComponent>
              <ButtonComponent class="popupButton" @click="addToChallenge('purchase')">
                <template v-slot:content>
                  <p>Bekreft</p>
                </template>
              </ButtonComponent>
            </div>
          </div>

          <div v-if="challengeType === 'Spare'">
            <p>How much money would you like to add?</p>
            <input min="1" :max="challengeObject.targetAmount - challengeObject.usedAmount" type="number">
            <div class="popupButtonsDiv">
              <ButtonComponent class="popupButton" @click="addPopupIsVisible = false">
                <template v-slot:content>
                  <p>Avbryt</p>
                </template>
              </ButtonComponent>
              <ButtonComponent class="popupButton" @click="addToChallenge('saving')">
                <template v-slot:content>
                  <p>Bekreft</p>
                </template>
              </ButtonComponent>
            </div>
          </div>

        </div>
      </template>
    </PopupComponent>
  </div>
</template>

<script setup lang="ts">
import ChallengeProgress from './ChallengeProgressComponent.vue';
import type { MasterChallenge } from '@/types/challengeTypes';
import { computed, ref } from 'vue';
import { addAmountToChallenge, updateCompletedChallenge } from '@/api/challengeHooks';
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import PopupComponent from "@/components/assets/PopupComponent.vue";
import { set } from '@vueuse/core';

const addPopupIsVisible = ref(false);
function toggleAddPopup(){
  addPopupIsVisible.value = !addPopupIsVisible.value;
}

const props = defineProps({
  challengeObject: {
    type: Object as () => MasterChallenge,
    required: true
  }
});

const challengeType = ref("");

if(props.challengeObject.productName){
  challengeType.value = "Forbruk";
} else if(props.challengeObject.productCategory){
  challengeType.value = "Budsjett";
} else {
  challengeType.value = "Spare";
}

const challengeExpired = ((new Date(props.challengeObject.expiryDate)).getTime()) < ((new Date()).getTime());

const completed = computed(() => {
  if(challengeType.value === "Spare"){
    return props.challengeObject.usedAmount >= props.challengeObject.targetAmount
  } else {
    return props.challengeObject.usedAmount <= props.challengeObject.targetAmount && challengeExpired;
  }
});

const timeLeftText = computed(() => {
  let timeLeft = new Date(props.challengeObject.expiryDate).getTime() - new Date().getTime();
  let daysLeft = timeLeft / (1000 * 60 * 60 * 24);
    if(challengeExpired){
    return "Expired";
  } else if(daysLeft < 1){
      let hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
      let minutesLeft = Math.floor((timeLeft - (hoursLeft * 1000 * 60 * 60)) / (1000 * 60));
      let secondsLeft = Math.floor((timeLeft - (hoursLeft * 1000 * 60 * 60) - (minutesLeft * 1000 * 60)) / 1000);

    return hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s";
  } else {
    return Math.floor(daysLeft) + " Days Left";
  }
});

const updateCompleted = async () => {
  try {
    await updateCompletedChallenge(Number(props.challengeObject.id));
    console.log("Challenge completed successfully.");
    alert("Challenge completed successfully!");
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    console.error("Failed to complete challenge:", error);
  }
}

const addToChallenge = async (challengeInput: string) => {
  try {
    const inputElement = document.querySelector('input[type="number"]');
    let amountToAdd = inputElement ? Number((inputElement as HTMLInputElement).value) : 0;
    if (challengeInput === "purchase") {
      amountToAdd = 1;
    }
    if (!amountToAdd || amountToAdd <= 0 || (amountToAdd > props.challengeObject.targetAmount - props.challengeObject.usedAmount)) {
      alert("Invalid amount");
      console.error("Invalid amount");
      return;
    }
    await addAmountToChallenge(challengeInput, Number(props.challengeObject.id), amountToAdd);
    console.log("Amount added to challenge successfully.");
    addPopupIsVisible.value = false;
    alert("Lagt til beløp til utfordring!");
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    console.error("Failed to add amount to challenge:", error);
  }
}
</script>

<style scoped>

.challengeBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
  background-color: #A6CD94;
  border: 0.5vw solid #9BC289;
  border-radius: 20px;
  padding: 1rem 0;
}

.challengeHeader {
  display: flex;
  justify-content: space-between;
  margin: 0 0.5rem;
}

.timeSpanDiv {
  background-color: #F5C116;
  border-radius: 40px;
  padding: 0 1rem;
  vertical-align: center;
}

.timeSpan {
  color: #F0F0F0;
  font-weight: 500;
  font-size: 1rem;
}

.daysRemainingDiv {
  float: right;
  background-color: #ff4d4d;
  border-radius: 40px;
  padding: 0 1rem;
  vertical-align: center;
}

.daysRemaining {
  color: #F0F0F0;
  font-weight: 500;
  font-size: 1rem;
}

.challengeTitle {
  margin: 10px;
  color: #4D4D4D;
  font-weight: 500;
  overflow-wrap: anywhere;
}

.challengeText {
  color: #EEEEEE;
  margin: 0.6rem 0.3rem;
  white-space: normal;
}

.completeButtonContainer{
  height: 30px;
}

.completeButton{
  width: 100px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.completeText {
  color: #12D612;
  font-size: 1rem;
  font-weight: 700;
}

.removeButton {
  width: 150px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.removeText {
  color: #8f0d0d;
  font-size: 1rem;
  font-weight: 700;
}

.addButton {
  width: 150px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.addPopup {
  position: absolute;
  width: 200px;
  height: max-content;
  background-color: #A6CD94;
  border: 0.5vw solid #9BC289;
  border-radius: 20px;
  padding: 1rem 0;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.popupButton {
  width: 70px;
  height: 30px;
  margin: 0 0.5rem;
}

.popupButtonsDiv {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>