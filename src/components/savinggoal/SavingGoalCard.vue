<template>
  <div class="saving-goal-card">
    <div v-if="isEditing">
      <input v-model="editableGoal.name" placeholder="Navn på sparemål" />
      <input v-model="editableGoal.targetAmount" type="number" placeholder="Sparemål i kr" />
      <input v-model="editableGoal.deadline" type="date" placeholder="Frist" />
      <input v-model="editableGoal.mediaUrl" type="url" placeholder="Media URL" />
      <button @click="saveChanges">Save Changes</button>
    </div>
    <div v-else>
      <h2>{{ savingGoal.name }}</h2>
      <p><strong>Sparemål:</strong> {{ savingGoal.targetAmount }} kr</p>
      <p><strong>Frist:</strong> {{ savingGoal.deadline }}</p>
      <img v-if="savingGoal.mediaUrl" :src="savingGoal.mediaUrl" alt="Media" class="img">
      <p v-if="savingGoal.completed" class="completed">Completed</p>
      <div class="delete-icon" @click="confirmDelete">✖</div>
      <div class="edit-icon" @click="startEditing">✎</div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import type { SavingGoal } from '@/types/SavingGoal';
import { updateSavingGoal, deleteSavingGoal } from '@/api/savingGoalHooks';

const props = defineProps({
  savingGoal: {
    type: Object as () => SavingGoal,
    default: () => ({ name: '', targetAmount: 0, deadline: '', mediaUrl: '', completed: false })
  }
});

const emits = defineEmits(['deleteGoal', 'updateGoal']);

const isEditing = ref(false);
const editableGoal = ref({ ...props.savingGoal }); 

const startEditing = () => {
  isEditing.value = true;
};

const saveChanges = async () => {
  try {
    await updateSavingGoal(Number(props.savingGoal.id), { ...editableGoal.value, mediaUrl: editableGoal.value.mediaUrl || '' });
    emits('updateGoal', editableGoal.value);
    isEditing.value = false;
    window.location.reload();
  } catch (error) {
    console.error('Error updating saving goal:', error);
  }
};

const confirmDelete = async () => {
  try {
    await deleteSavingGoal(Number(props.savingGoal.id));
    emits('deleteGoal', props.savingGoal.id);
  } catch (error) {
    console.error('Error deleting saving goal:', error);
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
  transition: transform 0.3s ease;
}

.saving-goal-card:hover {
  background-color: #f0f0f0;
  box-shadow: 0 0 5px #ccc;
  transform: scale(1.05);
  cursor: pointer;
}

.name {
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

.delete-icon, .edit-icon {
  position: absolute;
  top: 10px;
  cursor: pointer;
  font-size: 24px;
}

.delete-icon {
  right: 10px;
  color: red;
}

.edit-icon {
  right: 50px; 
  color: green;
}

h2 {
  padding-right: 70px; 
}

</style>

  