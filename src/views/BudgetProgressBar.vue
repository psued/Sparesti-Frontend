<template>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressWidth }"></div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    props: {
      value: Number,
      max: Number
    },
    setup(props) {
        const progressWidth = computed(() => {
        const val = props.value || 0; 
        const max = props.max || 100; 
        const percentage = max > 0 ? (val / max) * 100 : 0; 
        return `${percentage}%`;
        });
      
      return {
        progressWidth
      };
    }
  });
  </script>
  
  <style>
  .progress-bar {
    width: 100%;
    background-color: #e0e0e0;
  }
  
  .progress {
    height: 20px;
    background-color: #ffc107;
  }
  </style>
  