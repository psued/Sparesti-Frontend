<template>
  <div class="challengeBox">
    <div class="challengeHeader">
      <div class="timeSpanDiv">
        <p class="timeSpan">{{timeInterval}}</p>
      </div>
      <p class="daysRemaining">{{Math.floor(daysLeft)}} Days Left</p>
    </div>
    <h2 class="challengeTitle">Title</h2>
    <ChallengeProgress :target-amount="props.targetAmount" :saved-amount="props.savedAmount" :media-url="props.mediaUrl" />
    <p class="challengeText">{{description}}</p>
    <ChallengeCompleteButton/>
  </div>
</template>

<script setup lang="ts">
  import ChallengeCompleteButton from '../challenges/ChallengeCompleteButton.vue';
  import ChallengeProgress from '../challenges/ChallengeProgress.vue';

  const props = defineProps({
    id: Number,
    description: String,
    targetAmount: Number,
    savedAmount: Number,
    mediaUrl: String,
    timeInterval: String,
    difficultyLevel: String,
    expiryDate: Date,
    completed: Boolean
  })

  let daysLeft = 0

  if(props.expiryDate){
    let currentDate = new Date()
    daysLeft = (props.expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  }

</script>

<style scoped>

.challengeBox {
  background-color: #A6CD94;
  border: 0.5vw solid #9BC289;
  border-radius: 20px;
  width: 16rem;
  height: 25rem;
}

.challengeHeader {
  margin: 0.5vw 0.5vw;
  display: flex;
  justify-content: space-between;
}

.timeSpanDiv {
  width: max-content;
  background-color: #F5C116;
  border-radius: 40px;
  padding: 0 1.6rem;
  display: inline-block;
  margin-right: auto;
  vertical-align: center;
}

.timeSpan {
  color: #F0F0F0;
  font-weight: 500;
  font-size: 1rem;
}

.daysRemaining {
  display: inline-block;
  color: #F0F0F0;
  font-weight: 400;
  margin-left: auto;
  font-size: 1rem;
}

.challengeTitle {
  margin: 10px;
  color: #4D4D4D;
  font-weight: 500;
}

.challengeText {
  color: #EEEEEE;
  margin: 0.2rem 0.3rem;
}

</style>