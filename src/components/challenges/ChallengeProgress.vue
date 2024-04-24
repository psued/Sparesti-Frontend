<template>
  <div class="progressDiv">
    <ChallengeProgressBar></ChallengeProgressBar>
    <div class="challengeCompletionPercentageContainer">
      <p class="challengeCompletionPercentage">46%</p>
    </div>
    <div class="challengeEmojiContainer">
      <p class="challengeEmoji">💸</p>
    </div>
    <div class="challengeMoneyContainer">
      <p class="challengeMoney">2367kr / 5150kr used</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ChallengeProgressBar from '../challenges/ChallengeProgressBar.vue';
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
  font-size: 5rem;
}
</style>