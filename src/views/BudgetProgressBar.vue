<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: progressWidth }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    value: Number,
    max: Number,
  },
  setup(props) {
    const progressWidth = computed(() => {
      const val = props.value || 43;
      const max = props.max || 100;
      const percentage = max > 0 ? (val / max) * 100 : 0;
      return `${percentage}%`;
    });

    return {
      progressWidth,
    };
  },
});
</script>

<style>
.progress-bar {
  height: 20px;
  width: 100%; 
  background-color: #e0e0e0;
  border: 2px solid #000; 
  border-radius: 7px;
  padding: 2px; 
  box-sizing: border-box; 
}

.progress {
  height: 100%; 
  width: auto; 
  max-width: calc(100% - 4px); 
  background-color: #ffc107;
  border-radius: 5px; 
}

</style>
