<!--
   SVGButtonComponent
   This component is a reusable SVG button. It can be used anywhere an SVG button is needed in the application.
   The button is styled with a circular background and a foreground circle that contains the button content.
   The button has a click animation that moves the foreground circle slightly downwards.
   The SVG icon for the button is passed through the 'icon' slot.
 -->
<template>
  <div @mousedown="buttonClick" @mouseup="buttonClick" class="buttonContainer">
    <div class="bgCircle"/>
    <div :class="{animation1 : buttonClicked}" class="fgCircle"/>
    <div :class="{animation2 : buttonClicked}" class="innerCircle"/>
    <div :class="{animation2 : buttonClicked}" class="iconContainer">
      <slot name="icon"/>
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

.animation1 {
  animation: button-animation1 100ms;
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

.iconContainer {
  position: absolute;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.animation2 {
  animation: button-animation2 100ms;
}

@keyframes button-animation1 {
  from {
  top: 0;
  }
  to {
    top: 5px;
  }
}

@keyframes button-animation2 {
  from {
    top: 50%;
  }
  to {
    top: calc(50% + 5px);
  }
}
</style>