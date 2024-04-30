<template>
  <div :class="{
    'saving-goal-card': true,
    'green-border': savingGoal.completed,
    'yellow-border': !savingGoal.completed && savingGoal.savedAmount < savingGoal.targetAmount,
    'red-border': new Date(savingGoal.deadline + 'T00:00:00').getTime() <= new Date(todaysDate + 'T00:00:00').getTime() && savingGoal.savedAmount < savingGoal.targetAmount
  }">
    <div v-if="isEditing" class="editing-area">
      <input v-model="editableGoal.name" class="editing-input" placeholder="Navn på sparemål" />
      <input v-model="editableGoal.targetAmount" class="editing-input" type="number" placeholder="Sparemål i kr" />
      <input v-model="editableGoal.deadline" class="editing-input" type="date" placeholder="Frist" />
      <div class="form-group">
        <label for="edit-upload-type">Velg opplastingstype:</label>
        <select id="edit-upload-type" v-model="editUploadType">
          <option value="image">Bilde</option>
          <option value="icon">Ikon</option>
          <option value="emoji">Emoji</option>
        </select>
      </div>
      <!-- Render appropriate input based on selected upload type -->
      <div v-if="editUploadType === 'image'" class="form-group">
        <input type="file" @change="handleImageUpload" accept="image/*" />
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Forhåndsvisning av bilde" />
        </div>
      </div>
      <div v-else-if="editUploadType === 'icon'" class="form-group">
        <select v-model="selectedIconUrl">
          <option v-for="icon in icons" :value="icon.url">{{ icon.name }}</option>
        </select>
        <div v-if="selectedIconUrl" class="icon-preview">
          <img :src="selectedIconUrl" alt="Valgt ikon" />
        </div>
      </div>
      <div v-else-if="editUploadType === 'emoji'" class="form-group">
        <Picker :data="emojiIndex" set="twitter" @select="handleEmojiSelect" :fallback="customEmojiFallback" />
        <div class="emoji" v-if="emoji">{{ emoji }}</div>
      </div>
      <button @click="saveChanges" class="editing-button">Save Changes</button>
      <button @click="isEditing = false" class="editing-button">Cancel</button>
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
        <div v-if="editable" class="delete-icon" @click="confirmDelete">✖</div>
        <div v-if="author" class="edit-icon" @click="startEditing">✎</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import type { SavingGoal } from '@/types/SavingGoal';
import { updateSavingGoal, deleteSavingGoal, deleteSavingGoalFromUser } from '@/api/savingGoalHooks';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { icons } from '@/utils/saving-goal-icons';

const props = defineProps({
  savingGoal: {
    type: Object as () => SavingGoal,
    default: () => ({ name: '', targetAmount: 0, savedAmount: '0', deadline: '', mediaUrl: '', completed: false })
  },
  author :{
    type: Boolean,
    default: false
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
const imagePreview = ref<string | null>(null);
const selectedIconUrl = ref<string | null>(null);

// Initialize editUploadType with the default value from props.savingGoal.mediaUrl
const editUploadType = ref(props.savingGoal.mediaUrl ? 'image' : '');

const startEditing = () => {
  editableGoal.value = { ...props.savingGoal };
  isEditing.value = true;
};

const emoji = ref("");
  let emojiIndex = new EmojiIndex(data);

const handleEmojiSelect = (selectedEmoji: { native: string; }) => {
  emoji.value = selectedEmoji.native;
};

const customEmojiFallback = (emoji: { short_names: any[]; }) => {
  return `:${emoji.short_names[0]}:`;
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
    const confirmDelete = confirm('Er du sikker på at du vil fjerne deg selv fra dette sparemålet?');
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

function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}
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

.editing-area {
  margin-bottom: 20px;
}

.editing-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.editing-input:focus {
  outline: none;
  border-color: dodgerblue;
}

.editing-button {
  background-color: dodgerblue;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}

.editing-button:hover {
  background-color: #007bff;
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
  