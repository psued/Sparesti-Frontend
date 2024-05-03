<!--
Description
PopupComponent.vue is a reusable Vue component that creates a modal or popup overlay.
It takes a boolean prop isVisible to control its visibility.
When isVisible is true, the popup is shown, and when it is false, the popup is hidden.

Usage
To use the PopupComponent.vue,
import it in the parent component and include it in the template section.
Pass the isVisible prop to control its visibility.
The content of the popup is passed through the default slot.
-->

<template>
  <div :class="{ backdrop: true, flashing: props.flashingBorder }" @click.self="togglePopup" v-if="props.isVisible">
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, defineExpose, watchEffect } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  flashingBorder: {
    type: Boolean,
    default: false // Default value is false if not provided
  }
});
const emit = defineEmits(['togglePopup']);

const togglePopup = () => {
  emit('togglePopup');
};

defineExpose({
  togglePopup
});

/*
The watchEffect function watches the isVisible prop and adds or removes the no-scroll class from the body,
preventing or allowing scrolling when the popup is visible.
It also sets a CSS variable --st to the current scroll position,
which is used to keep the scroll position when the popup is closed.
*/
let scrollTop = 0;
watchEffect(() => {
  if (props.isVisible) {
    scrollTop = document.documentElement.scrollTop;
    document.body.style.setProperty('--st', -scrollTop + "px");
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
    document.documentElement.scrollTop = scrollTop;
  }
});
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: var(--navbarHeight);
  left: 0;
  z-index: 900;
  display: table;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: calc(100vh - var(--navbarHeight));
}

.flashing {
  /* Add flashing border styles here */
  animation: flashBorder 2s infinite alternate;
  border: 3px solid green;
}

@keyframes flashBorder {
  0% {
    border-color: green; /* Initial border color */
  }
  100% {
    border-color: yellow; /* Alternate border color */
  }
}
</style>