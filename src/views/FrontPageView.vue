<template>
  <div class="container">

    <div class="logo-container">
      <img src="/pig_logo.png" alt="Pig Logo" class="pig-logo" />
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: 30%"></div>
      </div>
    </div>

    <div class="path-container">
      <img src="/path.webp" alt="Path" id="path-image" />
      <img src="/avatar.png" alt="Avatar" class="avatar" />

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
      <div class="background"></div>
        <div class="clouds">
          <img src="/cloud_1.png" alt="Cloud" class="cloud" />
          <img src="/cloud_2.png" alt="Cloud" class="cloud" />
          <img src="/cloud_3.png" alt="Cloud" class="cloud" />
          <img src="/cloud_4.png" alt="Cloud" class="cloud" />
        </div>
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
      currentCheckpointIndex: 0,
    };
  },
  mounted() {
  this.moveAvatar();
  const clouds = document.querySelectorAll('.cloud');
  clouds.forEach((cloud) => {
    // Assert that cloud is an instance of HTMLElement
    const cloudElement = cloud as HTMLElement;
    const randomWidth = Math.random() * (150 - 50) + 50; // Random width between 50px and 150px
    cloudElement.style.setProperty('--cloud-width', `${randomWidth}px`);
   });
  },
  methods: {
    moveAvatar() {
      // Update avatar's position based on current checkpoint
      const avatar = document.querySelector(".avatar") as HTMLElement;
      if (avatar) {
        const currentCheckpoint = this.checkpoints[this.currentCheckpointIndex];

        // Calculate intermediary coordinates to move vertically first
        const verticalPosition = currentCheckpoint.top;
        const horizontalPosition = currentCheckpoint.left;

        // Update avatar's position vertically
        avatar.style.top = verticalPosition + "px";
        if (this.currentCheckpointIndex === 0) {
          // Reset progress bar
          const progressBarFill = document.querySelector(".progress-bar-fill") as HTMLElement;
          progressBarFill.style.width = "0%";
        } else {
          // Update progress bar
          const progressBarFill = document.querySelector(".progress-bar-fill") as HTMLElement;
          const progress = (this.currentCheckpointIndex / this.checkpoints.length) * 100;
          progressBarFill.style.width = progress + "%";
        }

        // After a short delay, update avatar's position horizontally
        setTimeout(() => {
          avatar.style.left = horizontalPosition + "%";

          // Move to the next checkpoint after both vertical and horizontal movement
          this.currentCheckpointIndex = (this.currentCheckpointIndex + 1) % this.checkpoints.length;

          // Repeat the movement after a delay (e.g., 2 seconds)
          setTimeout(this.moveAvatar, 2000);
        }, 1000); // Adjust the delay according to your preference
      }
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
  z-index: -1;
  position: absolute;
  width: -webkit-fill-available;
  height: 100%;
}

.background {
  background: rgb(45,229,172);
  background: linear-gradient(194deg, rgba(45,229,172,1) 0%, rgba(255,254,134,1) 100%);
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
  left: -10%;
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

.avatar {
  position: absolute;
  width: 50px; /* Adjust width as needed */
  height: auto;
  z-index: 4; /* Ensure pig is above the checkpoints */
  transition: all 2s ease; /* Add smooth transition effect */
}


</style>
