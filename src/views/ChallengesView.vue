<template>
  <div id="challengesDiv">
    <h1 id="challengesTitle">Challenges</h1>
    <Challenge></Challenge>
  </div>
</template>

<script setup lang="ts">
import Challenge from '../components/challenges/Challenge.vue'
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