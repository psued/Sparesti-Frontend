<template>

    <div class ="budget-container">
      <div class="budget-overview" @click="showDetails">
        <div class="budget-summary">
          <h2>Monthly Budget</h2>

          <p>{{ budget }} kr of {{ totalBudget }} kr</p>

          <span>{{ daysLeft }} Days Left</span>

          <progress-bar :value="budget" :max="totalBudget"></progress-bar>
        </div>
      </div>

      <div class="container">
      <div class="background-container">
        <div class="background"></div>
          <div class="clouds">
            <img src="/cloud_1.png" alt="Cloud" class="cloud" />
            <img src="/cloud_2.png" alt="Cloud" class="cloud" />
            <img src="/cloud_3.png" alt="Cloud" class="cloud" />
            <img src="/cloud_4.png" alt="Cloud" class="cloud" />
          </div>
      </div>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import BudgetProgressBar from "./BudgetProgressBar.vue";
  
  export default defineComponent({
    components: {
      'progress-bar': BudgetProgressBar,
    },

    props: {
    budget: {
      type: Number,
      default: () => Math.floor(Math.random() * 10000), 
    },
    totalBudget: {
      type: Number,
      default: () => 10000, 
    },
    remainingBudget: {
      type: Number,
      default: () => 6969,
    },
    daysLeft: {
      type: Number,
      default: () => Math.floor(Math.random() * 30), 
    },
  },

    mounted() {
      console.log(this.budget, this.totalBudget, this.remainingBudget, this.daysLeft);
      const clouds = document.querySelectorAll(".cloud");
      clouds.forEach((cloud) => {
      // Assert that cloud is an instance of HTMLElement
      const cloudElement = cloud as HTMLElement;
      const randomWidth = Math.random() * (150 - 50) + 50; // Random width between 50px and 150px
      cloudElement.style.setProperty("--cloud-width", `${randomWidth}px`);
      });
    },

    methods: {
      showDetails() {
        this.$emit("showDetails");
      },
  },
  });
  </script>

  <style scoped>
  .budget-overview {
  background-color: #a6cd94;
  border-style: solid;
  border-radius: 10px;
  margin: -1px;
  height: 17vh;
  width: -webkit-fill-available;
  }

  .budget-summary h2 {
  position: relative;
  display: inline-block; 
  }

  .budget-summary h2::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px; 
  width: 100%; 
  height: 3px; 
  background-color: #000; 
  }

  .budget-summary p, span {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right; 
    color: #EEEEEE;
    padding: 3px;
  }

  .container {
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  height: 100vh;
  z-index: 1;
  margin-top: 5px;
}

.background-container {
  background-size: cover;
  background-repeat: repeat;
  z-index: -1;
  position: absolute;
  width: -webkit-fill-available;
  height: 100%;
  left: 0;
  overflow: hidden;
}

.background {
  background: rgb(45, 229, 172);
  background: linear-gradient(
    194deg,
    rgba(45, 229, 172, 1) 0%,
    rgba(255, 254, 134, 1) 100%
  );
  width: -webkit-fill-available;
  height: -webkit-fill-available;
}

.cloud {
  position: absolute;
  width: var(--cloud-width, 130px);  
  height: auto;
  animation: floatClouds linear infinite;
  opacity: 0.8;
  display: none;
  left: -15%;
}

@keyframes floatClouds {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
}

.cloud:nth-child(1) {
  animation-duration: 50s;
  animation-delay: 0s;
  top: 15%;
  display: block;
}
.cloud:nth-child(2) {
  animation-duration: 60s;
  animation-delay: 5s;
  top: 30%;
  display: block;
}
.cloud:nth-child(3) {
  animation-duration: 30s;
  animation-delay: 10s;
  top: 45%;
  display: block;
}

.cloud:nth-child(4) {
  animation-duration: 40s;
  animation-delay: 13s;
  top: 65%;
  display: block;
}
</style>
  