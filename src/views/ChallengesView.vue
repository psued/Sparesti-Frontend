<template>
  <div id="challengesViewDiv">
    <h1 id="challengesTitle">Challenges</h1>
    <div id="challengesDiv">
      <Challenge class="challenge" v-for="challengeObject in challengeObjects" :challenge-object="challengeObject" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Challenge from '../components/challenges/Challenge.vue'

  const challengeObjects = [
    {
      title: "Example Title",
      id: 123,
      description: "Example Description",
      targetAmount: 250,
      savedAmount: 140,
      mediaUrl: "🤑",
      timeInterval: "Daily",
      difficultyLevel: "Hard",
      expiryDate: new Date(1715353792000),
      completed: false
    },
    {
      title: "Example Title",
      id: 123,
      description: "Example Description",
      targetAmount: 250,
      savedAmount: 140,
      mediaUrl: "🤑",
      timeInterval: "Monthly",
      difficultyLevel: "Hard",
      expiryDate: new Date(1715353792000),
      completed: false
    },
    {
      title: "Example Title",
      id: 123,
      description: "Example Description",
      targetAmount: 250,
      savedAmount: 140,
      mediaUrl: "🤑",
      timeInterval: "Daily",
      difficultyLevel: "Hard",
      expiryDate: new Date(1715353792000),
      completed: false
    },
    {
      title: "Example Title",
      id: 123,
      description: "Example Description",
      targetAmount: 250,
      savedAmount: 140,
      mediaUrl: "🤑",
      timeInterval: "Daily",
      difficultyLevel: "Hard",
      expiryDate: new Date(1715353792000),
      completed: false
    },
    {
      title: "Example Title",
      id: 123,
      description: "Example Description",
      targetAmount: 250,
      savedAmount: 140,
      mediaUrl: "🤑",
      timeInterval: "Daily",
      difficultyLevel: "Hard",
      expiryDate: new Date(1715353792000),
      completed: false
    },
    {
      title: "Example Title",
      id: 123,
      description: "Example Description",
      targetAmount: 250,
      savedAmount: 140,
      mediaUrl: "🤑",
      timeInterval: "Daily",
      difficultyLevel: "Hard",
      expiryDate: new Date(1715353792000),
      completed: false
    },
    {
      title: "Example Title",
      id: 123,
      description: "Example Description",
      targetAmount: 250,
      savedAmount: 140,
      mediaUrl: "🤑",
      timeInterval: "Daily",
      difficultyLevel: "Hard",
      expiryDate: new Date(1715353792000),
      completed: false
    },
    {
      title: "Example Title",
      id: 123,
      description: "Example Description",
      targetAmount: 250,
      savedAmount: 140,
      mediaUrl: "🤑",
      timeInterval: "Daily",
      difficultyLevel: "Hard",
      expiryDate: new Date(1715353792000),
      completed: false
    },
    {
      title: "Example Title",
      id: 123,
      description: "Example Description",
      targetAmount: 250,
      savedAmount: 140,
      mediaUrl: "🤑",
      timeInterval: "Daily",
      difficultyLevel: "Hard",
      expiryDate: new Date(1715353792000),
      completed: false
    }
  ]


</script>

<style scoped>

#challengesViewDiv{
  text-align: center;
  align-items: center;
    justify-content: center;
}

#challengesTitle {
  font-style: italic;
  margin: 2rem;
  font-size: 4rem;
}

#challengesDiv {
  float: left;
}

.challenge {
  display: inline-block;
  margin: 10px;
}
</style>