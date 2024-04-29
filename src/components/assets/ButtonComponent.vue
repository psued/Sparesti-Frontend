<template>
  <div class="buttonContainer">
    <div class="bgCircle"/>
    <div class="fgCircle">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.buttonContainer {
  position: relative;
  cursor: pointer;
}

.bgCircle {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #F09217;
  border-radius: 30px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.fgCircle {
  display: flex;
  position: absolute;
  width: 100%;
  height: calc(100% - 5px);
  background-color: #F5C116;
  border-radius: 30px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
}
</style>