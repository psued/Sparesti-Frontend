<template>
  <div id="challengesDiv">
    <h1 id="challengesTitle">Challenges</h1>
    <Challenge :id="id" :description="description" :target-amount="targetAmount" :saved-amount="savedAmount" :media-url="mediaUrl" :time-interval="timeInterval" :difficulty-level="difficultyLevel" :expiry-date="expiryDate" :completed="completed" />
  </div>
</template>

<script setup lang="ts">
import Challenge from '../components/challenges/Challenge.vue'

  let id = 123
  let description = "hehe"
  let targetAmount = 250
  let savedAmount = 140
  let mediaUrl = "🤑"
  let timeInterval = "Daily"
  let difficultyLevel = "Hard"
  let expiryDate = new Date(1715353792000)
  let completed = false

</script>

<style scoped>

#challengesDiv{
  text-align: center;
  align-items: center;
  margin-top: 100px;
  justify-content: center;
}

#challengesDiv > div {
  margin: auto;
}

#challengesTitle {
  font-style: italic;
  margin: 2rem;
  font-size: 4rem;
}
</style>