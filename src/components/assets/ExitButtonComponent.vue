<!--
  ExitButtonComponent
  This component is a reusable exit button. It can be used anywhere an exit button is needed in the application.
  The button is styled with a grey circular background and a cross icon.
  The button emits a 'close' event when clicked.
-->
<<template>
  <div class="buttonContainer">
    <div class="bgCircle">
      <svg @click="close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
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
  background-color: #ff4d4d;
  border-radius: 30px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>