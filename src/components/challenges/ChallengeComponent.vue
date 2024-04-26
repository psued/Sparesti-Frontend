<template>
  <div class="challengeBox">
    <div class="challengeHeader">
      <div class="timeSpanDiv">
        <p class="timeSpan">{{challengeObject.timeInterval}}</p>
      </div>
      <p class="daysRemaining">{{Math.floor(daysLeft)}} Days Left</p>
    </div>
    <h2 class="challengeTitle">{{challengeObject.title}}</h2>
    <ChallengeProgress :target-amount="challengeObject.targetAmount" :saved-amount="challengeObject.savedAmount" :media-url="challengeObject.mediaUrl || ''" />
    <p class="challengeText">{{challengeObject.description}}</p>
    <div class="completeButtonContainer">
      <ChallengeCompleteButton class="completeButton"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChallengeCompleteButton from './ChallengeButtonComponent.vue';
import ChallengeProgress from './ChallengeProgressComponent.vue';
import type { MasterChallenge } from '@/types/challengeTypes';
import { ref } from 'vue';

const props = defineProps({
  challengeObject: {
    type: Object as () => MasterChallenge,
    required: true
  }
});

const daysLeft = ref(0);
if(props.challengeObject){
  if(props.challengeObject.expiryDate){
    let currentDate = new Date()
    let expiryDate = new Date(props.challengeObject.expiryDate)
    daysLeft.value = (expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
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
  margin: 0 0.5vw;
  display: flex;
  justify-content: space-between;
}

.timeSpanDiv {
  background-color: #F5C116;
  border-radius: 40px;
  padding: 0 1rem;
  margin-right: 1rem;
  vertical-align: center;
}

.timeSpan {
  color: #F0F0F0;
  font-weight: 500;
  font-size: 1rem;
}

.daysRemaining {
  color: #F0F0F0;
  font-weight: 400;
  font-size: 1rem;
}

.challengeTitle {
  margin: 10px;
  color: #4D4D4D;
  font-weight: 500;
}

.challengeText {
  color: #EEEEEE;
  margin: 0.6rem 0.3rem;
  white-space: normal;
}
</style>