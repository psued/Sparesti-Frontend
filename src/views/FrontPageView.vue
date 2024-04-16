<template>
    <div class="container">
      <div class="logo-container">
        <img src="/public/pig_logo.png" alt="Pig Logo" class="pig-logo"/>
      </div>
      
      <div class="progress-bar-container">
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: 20%;"></div> 
        </div>

        <svg class="lines" :style="{ height: maxTop + 'px' }">
          <line v-for="(line, index) in lines" :key="index"
                :x1="line.x1 + '%'" :y1="line.y1 + 'px'"
                :x2="line.x2 + '%'" :y2="line.y2 + 'px'" />
        </svg>

        <div class="checkpoints">
          <div v-for="(checkpoint, index) in checkpoints" :key="index" 
               :style="{ top: checkpoint.top + 'px', left: checkpoint.left + '%'}"
               :class="['checkpoint', checkpoint.status]"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    name: 'ProgressPath',
    data() {
      return {
        checkpoints: [
          { top: 350, left: 10, status: 'completed' },
          { top: 300, left: 30, status: 'completed' },
            { top: 250, left: 55, status: 'in-progress' },
            { top: 200, left: 73, status: '' },
            { top: 150, left: 96, status: '' },
            { top: 100, left: 100, status: '' },
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
        return Math.max(...this.checkpoints.map(c => c.top));
      }
    },
  });
  </script>
  
  <style scoped>
  .container {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }
  
  .logo-container {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
  }
  
  .pig-logo {
    width: 300px;
    height: auto;
  }
  
  .progress-container {
    position: relative;
    width: 100%;
  }
  
  .progress-bar {
    background-color: #ddd;
    border-radius: 5px;
    height: 20px;
    width: 100%;
    position: relative;
  }
  
  .progress-bar-fill {
    background-color: #4caf50;
    height: 100%;
    border-radius: 5px;
  }
  
  .lines line {
    stroke: black; /* Line color */
    stroke-width: 2; /* Line thickness */
  }
  
  .checkpoints {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  
  .checkpoint {
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    position: absolute;
  }
  
  .checkpoint.completed {
    background-color: #4caf50; /* completed color */
    border-color: #4caf50;
  }
  
  .checkpoint.in-progress {
    background-color: #ffeb3b; /* in-progress color */
    border-color: #ffeb3b;
  }
  </style>
  