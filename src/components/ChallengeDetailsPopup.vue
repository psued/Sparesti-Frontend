<template>
    <div class="popup-container" @click.self="closePopup">
      <div class="popup-content">
        <div class="popup-header">
          <div class="challenge-time">{{ challenge.timeInterval }}</div>
          <div class="time-left">{{ timeLeftInDays }} days left</div>
        </div>
        <img :src="challenge.imageUrl" alt="Challenge Image" class="challenge-image" />
        <div class="challenge-description">{{ challenge.description }}</div>
        <div class="challenge-progress">
          <div class="progress-label">Progress:</div>
          <div class="progress-info">{{ challenge.savedAmount }} / {{ challenge.targetAmount }}</div>
        </div>
        <button class="complete-button">Complete</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, defineProps, defineEmits } from 'vue';
  import { type Challenge } from '@/types/challengeTypes';
  
  interface Props {
    challenge: Challenge;
  }
  
  const props = defineProps<Props>();
  const emit = defineEmits();
  
  // Computed property to calculate time left in days
  const timeLeftInDays = computed(() => {
    const expiryDate = new Date(props.challenge.expiryDate);
    const currentDate = new Date();
    const timeDiff = expiryDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  });
  
  // Emit event to close the popup
  const closePopup = () => {
    emit('close');
  }
  
  </script>
  
  <style scoped>
  .popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .challenge-time {
    font-weight: bold;
  }
  
  .time-left {
    color: gray;
  }
  
  .challenge-image {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .challenge-description {
    margin-bottom: 10px;
  }
  
  .challenge-progress {
    margin-bottom: 10px;
  }
  
  .progress-label {
    font-weight: bold;
  }
  
  .complete-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .complete-button:hover {
    background-color: #45a049;
  }
  
  </style>
  