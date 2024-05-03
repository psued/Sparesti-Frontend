<template>
  <div class="input-wrapper">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: [String, Number],
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped>
.input-wrapper input {
  border: none;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  width: 100%;
  max-width: 300px;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #007bff;
}
</style>
