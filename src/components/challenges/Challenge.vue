<template>
  <div class="challengeBox">
    <div class="challengeHeader">
      <div class="timeSpanDiv">
        <p class="timeSpan">Daily</p>
      </div>
      <p class="daysRemaining">17 Days Left</p>
    </div>
    <h2 class="challengeTitle">Grocery Saving</h2>

    <ChallengeProgress></ChallengeProgress>

    <p class="challengeText">Use 10% less money on groceries than you did last month</p>
    <ChallengeCompleteButton></ChallengeCompleteButton>
  </div>
</template>

<script setup lang="ts">
  import ChallengeCompleteButton from '../challenges/ChallengeCompleteButton.vue';
  import ChallengeProgress from '../challenges/ChallengeProgress.vue';
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