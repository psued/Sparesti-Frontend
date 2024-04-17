<template>
  <div class="container">

    <div class="logo-container">
      <img src="/public/pig_logo.png" alt="Pig Logo" class="pig-logo" />
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: 30%"></div>
      </div>
    </div>

    <div class="path-container">
      <img src="/path.webp" alt="Path" id="path-image" />

      <div class="checkpoints">
        <div
          v-for="(checkpoint, index) in checkpoints"
          :key="index"
          :style="{ top: checkpoint.top + 'px', left: checkpoint.left + '%' }"
          :class="['checkpoint', checkpoint.status]"
        ></div>
      </div>
    </div>

    <div class="background-container">
      <img src="/public/landscape.webp" alt="Landscape" id="landscape-image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "ProgressPath",
  data() {
    return {
      checkpoints: [
        { top: 590, left: 35, status: "completed" },
        { top: 452, left: 62, status: "completed" },
        { top: 382, left: 40, status: "in-progress" },
        { top: 295, left: 48, status: "" },
        { top: 217, left: 62, status: "" },
        { top: 112, left: 35, status: "finish-line" },
        // ... other checkpoints
      ],
    };
  },
  computed: {
    lines() {
      return this.checkpoints.slice(1).map((checkpoint, index) => {
        const start = this.checkpoints[index];
        const end = checkpoint;
        return {
          x1: start.left,
          y1: start.top,
          x2: end.left,
          y2: end.top,
        };
      });
    },
    maxTop() {
      return Math.max(...this.checkpoints.map((c) => c.top));
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  height: 100vh;
}

.background-container {
  background-size: cover;
  background-repeat: repeat;
  filter: blur(5px);
  z-index: -1;
  position: absolute;
}

.logo-container {
  position: absolute;
  top: 0;
  left: 0;
}

.pig-logo {
  width: 250px;
  height: auto;
}

.path-container {
  width: 100%;
  height: auto;
  position: relative;
  justify-content: center;
  z-index: 2;
  text-align: center;
  width: 50vh;
  filter: none;
}

#path-image {
  width: -webkit-fill-available;
  height: auto;
}

.progress-container {
  width: 100%;
  justify-content: center;
}

.progress-bar {
  background-color: #ffffff;
  border-radius: 5px;
  height: 25px;
  width: 130vh;
  position: relative;
  margin: 10px;
}

.progress-bar-fill {
  background-color: #4caf50;
  height: 100%;
  border-radius: 5px;
}

.checkpoints {
  top: 0;
  left: 0;
  width: 100%;
}

.checkpoint {
  background-color: #fff;
  border: 2px solid #000000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 3;
}

.checkpoint.completed {
  background-color: #4caf50;
  border-color: #000000;
}

.checkpoint.in-progress {
  background-color: #ffc13b;
  border-color: #000000;
}

.checkpoint.finish-line {
  background: url("/finish-line.jpeg");
  background-size: 1px;
  border-color: #000000;
}

</style>
