<template>
  <button :type="type" class="form-button" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
});

const onClick = (event: Event) => {
  if (props.type !== "submit") {
    event.preventDefault();
  }
};
</script>

<style scoped></style>
