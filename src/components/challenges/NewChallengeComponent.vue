<template>
  <div class="backdrop" @click.self="handleClose">
    <div class="popup">
      <slot>default content (if no slot passed in)</slot>
      <div class="actions">
        <slot name="links"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.popup {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 400px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  height: 70vh;
}

.backdrop {
  display: table;
  position: fixed;
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: calc(100vh - 90px); /* Subtract the height of the navbar */
  bottom: 0;
}
.popup h1 {
  color: #03cfb4;
  border: none;
  padding: 0;
}
.popup p {
  font-style: normal;
}
.popup .actions {
  text-align: center;
  margin: 30px 0 10px 0;
  color: #333;
}
.popup .actions a {
  color: #333;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  text-decoration: none;
  margin: 10px;
}

</style>