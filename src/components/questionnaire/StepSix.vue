<template>
	<div class="form-container">
		<h2>Nå er du helt ferdig!</h2>
		<div class="form-group">
			<p>Du kan begynne å bruke applikasjonen!</p>
		</div>
		<div class="button-container">
      <FormButton type="button" @click="goBack">Tilbake</FormButton>
      <FormButton type="submit" @click="finishQuestionnaire">Ferdig</FormButton>
    </div>	
	</div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'; 
import { useRouter } from 'vue-router';
import FormButton from '@/components/forms/FormButton.vue';

const router = useRouter();
const emit = defineEmits(["update-step"]);

function goBack() {
  emit("update-step", 5);
}

function finishQuestionnaire() {
	router.push("/");
}
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
}
</style>

