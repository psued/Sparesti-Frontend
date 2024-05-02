<template>
  <div class="progressDiv">
    <ChallengeProgressBar :completion-percentage="completionPercentage" />
    <div class="challengeCompletionPercentageContainer">
      <p v-if="challengeType === 'Spare' || challengeType === 'Budsjett'" class="challengeCompletionPercentage">{{Math.floor(completionPercentage)}}%</p>
      <p v-if="challengeType === 'Forbruk'" class="challengeCompletionPercentage">{{savedAmount + "/" + targetAmount}}</p>
    </div>
    <div class="challengeEmojiContainer">
      <p class="challengeEmoji">{{mediaUrl}}</p>
    </div>
    <div class="challengeMoneyContainer">
      <p v-if="challengeType === 'Budsjett'" class="challengeMoney">{{savedAmount}}kr / {{targetAmount}}kr brukt</p>
      <p v-if="challengeType === 'Spare'" class="challengeMoney">{{savedAmount}}kr / {{targetAmount}}kr spart</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ChallengeProgressBar from './ChallengeProgressBarComponent.vue';

  const props = defineProps({
    targetAmount: Number,
    savedAmount: Number,
    mediaUrl: String,
    challengeType: String
  })

  let completionPercentage = 0

  if(props.savedAmount && props.targetAmount){
    completionPercentage = (props.savedAmount / props.targetAmount) * 100
  }
</script>

<style scoped>
.progressDiv {
  position: relative;
  height: 12rem;
}

.challengeEmojiContainer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.challengeCompletionPercentageContainer {
  display: flex;
  position: absolute;
  top: 0.7rem;
  left: 0;
  right: 0;
  margin: auto;
  height: 3.2rem;
  align-items: center;
  justify-content: center;
}

.challengeCompletionPercentage {

  color: #F0F0F0;
  font-size: 2rem;
}

.challengeMoneyContainer {
  display: flex;
  position: absolute;
  bottom: 1.1rem;
  left: 0;
  right: 0;
  margin: auto;
  height: 3.2rem;
  align-items: center;
  justify-content: center;
}

.challengeMoney {
  color: #DFDFDF;
  font-size: 0.7rem;
}

.challengeEmojiContainer > p {
  font-size: 4rem;
}
</style>