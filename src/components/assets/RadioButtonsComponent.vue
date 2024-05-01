<!--
RadioButtonsComponent is a Vue component that creates a set of radio buttons.
The component is designed to be reusable and customizable,
allowing you to specify the labels for the radio buttons and handle the click events.

To use the RadioButtonsComponent, you need to import it and then use it in your template.
You can pass an array of labels to the radioButtons prop.
You can also listen to the radioClick event to handle the click event of the radio buttons.

Props
radioButtons:
This is an array that contains the labels for each radio button.
The labels are displayed on the buttons.

Events
radioClick:
This event is emitted when a radio button is clicked.
The label of the clicked button is passed as a payload with the event.
-->

<template>
  <div id="timeIntervalRadio">
    <ButtonComponent @click="emitAnswer(radioButton)" :pressed="radioButton === pressedButton" v-for="radioButton in radioButtons" class="timeIntervalButton">
      <template v-slot:content>
        <p class="timeIntervalText">{{radioButton}}</p>
      </template>
    </ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/assets/ButtonComponent.vue";
import {ref} from "vue";

const pressedButton = ref("");

const props = defineProps({
  radioButtons: {
    type: Array
  }
})

const emit = defineEmits(['radioClick'])

function emitAnswer(radioButton) {
  pressedButton.value = radioButton;
  emit('radioClick', radioButton)
}

</script>

<style scoped>
#timeIntervalRadio {
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

}

.timeIntervalButton {
  width: 100px;
  height: 30px;
  display: inline-block;
}

.timeIntervalText {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}
</style>