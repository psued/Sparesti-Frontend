<template>
    <div class="saving-goal-card">
      <h2>{{ savingGoal.name }}</h2>
      <p><strong>Sparemål:</strong> {{ savingGoal.targetAmount }} kr</p>
      <p><strong>Frist:</strong> {{ savingGoal.deadline }}</p>
      <img v-if="savingGoal.mediaUrl" :src="savingGoal.mediaUrl" alt="Media" class="img">
      <p v-if="savingGoal.completed" class="completed">Completed</p>
      <div class="delete-icon" @click="confirmDelete">✖</div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, defineEmits  } from 'vue';
const props = defineProps({
  savingGoal: {
    type: Object,
    default: () => ({ name: '', targetAmount: 0, deadline: '', mediaUrl: '', completed: true})
  }
});
console.log(props.savingGoal);

const emits = defineEmits(['deleteGoal']);

const confirmDelete = () => {
  if (window.confirm('Er du sikker på at du vil slette dette sparemålet?')) {
    emits('deleteGoal', props.savingGoal.id);
    setTimeout(() => window.location.reload(), 500);
  }
};
</script>
  
<style scoped>
.saving-goal-card {
  position: relative;
  max-width: 600px;
  margin: auto;
  margin-top: 2%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  margin-bottom: 5%;
}

.name{
  font-weight: revert;
  text-decoration: underline;
}

.img {
  max-width: 30vh;
  margin-top: 10px;
}
.completed {
  color: lightgreen;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
}

.delete-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: red;
  font-size: 24px;
}
</style>
  