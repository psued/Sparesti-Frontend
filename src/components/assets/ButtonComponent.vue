<!--
  ButtonComponent
  This component is a reusable button. It can be used anywhere a button is needed in the application.
  The button is styled with a circular background and a foreground circle that contains the button content.
  The button has a click animation that moves the foreground circle slightly downwards.
-->
<template>
  <div
    @mousedown="clicked = true"
    @mouseup="handleMouseup"
    @mouseleave="clicked = false"
    class="buttonContainer"
  >
    <div class="bgCircle" />
    <div
      :class="[{ animation1: pressed || (clicked && !pressed) }]"
      class="fgCircle"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const clicked = ref(false);

function handleMouseup() {
  setTimeout(() => {
    clicked.value = false;
  }, 100);
}

const props = defineProps({
  backgroundColor: {
    type: String,
    default: "var(--color-button-challenges-border)",
  },
  foregroundColor: {
    type: String,
    default: "var(--color-button-challenges)",
  },
  pressed: {
    type: Boolean,
  },
});
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
  background-color: v-bind("props.backgroundColor");
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
  background-color: v-bind("props.foregroundColor");
  border-radius: 30px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
}

.animation1 {
  animation: button-animation1 150ms;
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
</style>
