<!--
  ButtonComponent
  This component is a reusable button. It can be used anywhere a button is needed in the application.
  The button is styled with a circular background and a foreground circle that contains the button content.
  The button has a click animation that moves the foreground circle slightly downwards.
-->
<template>
  <div @mousedown="buttonClick" @mouseup="buttonClick" class="buttonContainer">
    <div class="bgCircle"/>
    <div :class="{animation1 : buttonClicked}" class="fgCircle">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const buttonClicked = ref(false);
function buttonClick() {
  buttonClicked.value = !buttonClicked.value;
}
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
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
}
.fgCircle {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #F5C116;
  border-radius: 30px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
}

.animation1 {
  animation: button-animation1 100ms;
}

@keyframes button-animation1 {
  from {
    top: 0;
  }
  to {
    top: 5px;
  }
}
</style>