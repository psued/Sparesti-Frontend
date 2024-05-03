<!--
   SVGButtonComponent
   This component is a reusable SVG button. It can be used anywhere an SVG button is needed in the application.
   The button is styled with a circular background and a foreground circle that contains the button content.
   The button has a click animation that moves the foreground circle slightly downwards.
   The SVG icon for the button is passed through the 'icon' slot.
 -->
<template>
  <div @mousedown="clicked = true" @mouseup="handleMouseup" @mouseleave="clicked = false" class="buttonContainer">
    <div class="bgCircle"/>
    <div :class="{animation1 : pressed || clicked && !pressed}" class="fgCircle"/>
    <div :class="{animation2 : pressed || clicked && !pressed}" class="innerCircle"/>
    <div :class="{animation2 : pressed || clicked && !pressed}" class="iconContainer">
      <slot name="icon"/>
    </div>
  </div>


</template>

<script setup lang="ts">
import {ref} from "vue";

const clicked = ref(false);

function handleMouseup() {
  setTimeout(() => {
    clicked.value = false;
  }, 100);
}

const props = defineProps({
  pressed: {
    type: Boolean
  }
})
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
  background-color: var(--color-button-challenges-border);
  border-radius: 50%;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
}
.fgCircle {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--color-button-challenges);
  border-radius: 50%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.animation1 {
  animation: button-animation1 100ms;
  animation-fill-mode: forwards;
}

.innerCircle {
  position: absolute;
  width: 90%;
  height: 90%;
  background-color: transparent;
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
  animation-fill-mode: forwards;
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