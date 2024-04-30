<template>
    <div :class="{
      'saving-goal-card': true,
      'green-border': savingGoal.completed,
      'yellow-border': !savingGoal.completed && savingGoal.savedAmount < savingGoal.targetAmount,
      'red-border': new Date(savingGoal.deadline + 'T00:00:00').getTime() <= new Date(todaysDate + 'T00:00:00').getTime() && savingGoal.savedAmount < savingGoal.targetAmount
    }">
      <div v-if="isEditing">
        <input v-model="editableGoal.name" placeholder="Navn på sparemål" />
        <input v-model="editableGoal.targetAmount" type="number" placeholder="Sparemål i kr" />
        <input v-model="editableGoal.deadline" type="date" placeholder="Frist" />
        <input v-model="editableGoal.mediaUrl" type="url" placeholder="Media URL" />
        <button @click="saveChanges">Save Changes</button>
      </div>
      <div v-else>
        <h2 class="name">{{ savingGoal.name }}</h2>
        <p><strong>Sparemål:</strong> {{ savingGoal.savedAmount }} / {{ savingGoal.targetAmount }} kr</p>
        <p><strong>Frist:</strong> {{ savingGoal.deadline }}</p>
        <div class="image" v-if="savingGoal.mediaUrl?.length && savingGoal.mediaUrl.length > 4">
          <img :src="savingGoal.mediaUrl" alt="Media" class="img">
        </div>
        <div class="emoji-div" v-else>
          <span class="emoji">{{ savingGoal.mediaUrl }}</span>
        </div>
        <p v-if="savingGoal.completed && (savingGoal.savedAmount >= savingGoal.targetAmount)" class="completed">Completed</p>
        <div v-if="editable">
          <div class="delete-icon" @click="confirmDelete">✖</div>
          <div class="edit-icon" @click="startEditing">✎</div>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import type { SavingGoal } from '@/types/SavingGoal';
import { updateSavingGoal, deleteSavingGoal, deleteSavingGoalFromUser } from '@/api/savingGoalHooks';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const props = defineProps({
  savingGoal: {
    type: Object as () => SavingGoal,
    default: () => ({ name: '', targetAmount: 0, savedAmount: '0', deadline: '', mediaUrl: '', completed: false })
  },
  editable: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['deleteGoal', 'updateGoal']);

const isEditing = ref(false);
const editableGoal = ref<SavingGoal>(props.savingGoal);
const todaysDate = new Date().toISOString().split('T')[0];
const userStore = useUserStore();
const userEmail = userStore.getUserName;
const userId = userStore.getUserId;
const router = useRouter();
import { icons } from '@/utils/saving-goal-icons';

const startEditing = () => {
  editableGoal.value = { ...props.savingGoal };
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
    const confirmDelete = confirm('Are you sure you want to delete this saving goal?');
    if (!confirmDelete) return;
    await deleteSavingGoalFromUser(userEmail, Number(props.savingGoal.id));
    try {
      await deleteSavingGoal(Number(props.savingGoal.id));
    } catch (error) {
      console.log("Can't delete saving goal that has users");
    }
    emits('deleteGoal', props.savingGoal.id);
  } catch (error) {
    console.error('Error deleting saving goal:', error);
  }
  router.push(`/saving-goals/user/${userId}`);
};
</script>
  
<style scoped>
.saving-goal-card {
  position: relative;
  max-width: 600px;
  width: 222px;
  height: 365px;
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
  margin-bottom: 10px;
}

.image img {
  max-width: 30vh;
  width: 30vh;
  margin-top: 8px;
  width: -webkit-fill-available;
}

.image {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.emoji-div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.emoji {
  font-size: 9.5rem;
  line-height: normal;
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
  font-size: 24px;
  transition: transform 0.3s ease;
}

.delete-icon:hover, .edit-icon:hover {
  transform: scale(1.5);
  cursor: crosshair;
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

.saving-goal-card.green-border {
  border: 2px solid var(--border-color-green);
}

.saving-goal-card.yellow-border {
  border: 2px solid var(--border-color-yellow);
}

.saving-goal-card.red-border {
  border: 2px solid var(--border-color-red);
}
</style>
  