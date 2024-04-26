<template>
  <div class="buttonContainer">
    <div class="bgCircle"/>
    <div class="fgCircle"/>
    <div class="innerCircle"/>
    <svg class="pluss" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.bgCircle {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #F09217;
  border-radius: 50%;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
}
.fgCircle {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #F5C116;
  border-radius: 50%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.innerCircle {
  position: absolute;
  width: 90%;
  height: 90%;
  background-color: rgba(255, 226, 55, 0.4);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.pluss {
  position: absolute;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

path {
  stroke: white;
}
</style>