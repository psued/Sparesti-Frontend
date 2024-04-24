<template>
  <div class="challengeBox">
    <div class="challengeHeader">
      <div class="timeSpanDiv">
        <p class="timeSpan">{{props.challengeObject.timeInterval}}</p>
      </div>
      <p class="daysRemaining">{{Math.floor(daysLeft)}} Days Left</p>
    </div>
    <h2 class="challengeTitle">Title</h2>
    <ChallengeProgress :target-amount="props.challengeObject.targetAmount" :saved-amount="props.challengeObject.savedAmount" :media-url="props.challengeObject.mediaUrl" />
    <p class="challengeText">{{props.challengeObject.description}}</p>
    <ChallengeCompleteButton/>
  </div>
</template>

<script setup lang="ts">
  import ChallengeCompleteButton from '../challenges/ChallengeCompleteButton.vue';
  import ChallengeProgress from '../challenges/ChallengeProgress.vue';

  const props = defineProps({
    challengeObject: {
      type: Object,
      default: () => ({
        challengeObject: {
          title: "Default Title",
          id: 1,
          description: "Default Description",
          targetAmount: 1,
          savedAmount: 1,
          mediaUrl: "Default",
          timeInterval: "Default",
          difficultyLevel: "Default",
          expiryDate: new Date(),
          completed: false
        }
      })
    }
  })

  console.log(props.challengeObject)

  let daysLeft = 0
  if(props.challengeObject){
    if(props.challengeObject.expiryDate){
      let currentDate = new Date()
      daysLeft = (props.challengeObject.expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    }
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