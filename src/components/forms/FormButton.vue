<template>
  <button :type="type" class="form-button" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
  }
});

const onClick = (event: Event) => {
  if (props.type !== 'submit') {
      event.preventDefault();
  }
};
</script>

<style scoped>
.form-button {
  border: none;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
