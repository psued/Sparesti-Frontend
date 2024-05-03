
<!--
The EmojiPickerComponent is a Vue component that provides an interface
for users to select an emoji. It uses the vue3-emoji-picker package
to display a list of emojis.

Props
emojiProp: This prop is used to display a selected emoji.
           It's a string that represents the selected emoji.

Events
pickEmoji: This event is emitted when an emoji is selected from the picker.
           It passes the selected emoji as a payload.
-->

<template>
  <div ref="excludeRef" id="emojiPickerContainer">
    <SVGButtonComponent @click="emojiPickerIsOpen = true" :pressed="emojiPickerIsOpen" class="emojiButton">
      <template v-slot:icon>
        <svg v-if="!emojiProp" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.9126 15.9336C10.1709 16.249 11.5985 16.2492 13.0351 15.8642C14.4717 15.4793 15.7079 14.7653 16.64 13.863" stroke="var(--color-button-challenges-back)" stroke-width="1.5" stroke-linecap="round"/>
          <ellipse cx="14.5094" cy="9.77405" rx="1" ry="1.5" transform="rotate(-15 14.5094 9.77405)" fill="var(--color-button-challenges-back)"/>
          <ellipse cx="8.71402" cy="11.3278" rx="1" ry="1.5" transform="rotate(-15 8.71402 11.3278)" fill="var(--color-button-challenges-back)"/>
          <path d="M13 16.0004L13.478 16.9742C13.8393 17.7104 14.7249 18.0198 15.4661 17.6689C16.2223 17.311 16.5394 16.4035 16.1708 15.6524L15.7115 14.7168" stroke="var(--color-button-challenges-back)" stroke-width="1.5"/>
          <path d="M4.92847 4.92663C6.12901 3.72408 7.65248 2.81172 9.41185 2.34029C14.7465 0.910876 20.2299 4.0767 21.6593 9.41136C23.0887 14.746 19.9229 20.2294 14.5882 21.6588C9.25357 23.0882 3.7702 19.9224 2.34078 14.5877C1.86936 12.8284 1.89775 11.0528 2.33892 9.41186" stroke="var(--color-button-challenges-back)" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <p v-if="emojiProp">{{emojiProp}}</p>
      </template>
    </SVGButtonComponent>

    <EmojiPicker ref="componentRef" v-if="emojiPickerIsOpen" :native="true" @select="onSelectEmoji" id="emojiPicker"/>
  </div>
</template>

<script setup lang="ts">
import SVGButtonComponent from "@/components/assets/SVGButtonComponent.vue";
import useClickOutside from "@/utils/useClickOutside";
import EmojiPicker from 'vue3-emoji-picker'
import type {EmojiExt} from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import {ref} from "vue";

const props = defineProps(['emojiProp'])
const emit = defineEmits(['pickEmoji'])
const emojiPickerIsOpen = ref(true);

function toggleEmojiPicker() {
  emojiPickerIsOpen.value = !emojiPickerIsOpen.value;
}
function pickEmoji(e: string) {
  emit('pickEmoji', e)
}
function onSelectEmoji(e : EmojiExt) {
  pickEmoji(e.i)
  toggleEmojiPicker()
}

const componentRef = ref()
const excludeRef = ref()
useClickOutside(
    componentRef,
    () => {
      emojiPickerIsOpen.value = false;
    },
    excludeRef
)
</script>

<style scoped>
.emojiButton {
  width: 100%;
  height: 100%;
}

#emojiPicker {
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.emojiButton p {
  position: absolute;
  font-size: 200%;
  left: 50%;
  top: calc(50%);
  transform: translateX(-50%) translateY(-50%);
}
</style>