<template>
  <div class="user-info">
    <div class="user-details">
      <div class="detail">
        <span class="label">Kallenavn:</span>
        <span class="value">
          <i class="icon-user"></i>
          <span v-show="!editMode">{{ user.displayName }}</span>
          <input type="text" v-model="editName" v-show="editMode" />
          <button @click="toggleEditMode">
            {{ editMode ? "Lagre" : "Rediger" }}
          </button>
        </span>
      </div>
      <div class="detail">
        <span class="label">Email:</span>
        <span class="value"><i class="icon-mail"></i>{{ user.email }}</span>
      </div>
      <div class="detail">
        <span class="label">Navn:</span>
        <span class="value"
          ><i class="icon-user"></i>{{ user.firstName }}
          {{ user.lastName }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from "vue";
import "@/assets/icons.css";
import { updateUserInfo } from "@/api/userHooks";

const props = defineProps<{
  user: any;
}>();

const editMode = ref(false);
const editName = ref(props.user.displayName);
const displayName = computed(() => {
  return editMode.value ? editName.value : props.user.displayName;
});

function toggleEditMode(): void {
  if (editMode.value) {
    updateUserInfo({ displayName: editName.value })
      .then(() => {
        props.user.displayName = editName.value;
      })
      .catch((error) => {
        console.error("Failed to update user info:", error);
      });
  }
  editMode.value = !editMode.value;
}
</script>

<style scoped>
.user-details .detail {
  margin-bottom: 0.5em;
}

.user-details .label {
  font-weight: bold;
}

.user-details .value {
  font-size: 1.5em;
  display: block;
  border-bottom: 1px solid;
  padding-bottom: 0.2em;
}
.icon {
  width: 40em;
  height: 1em;
}
.edit-button {
  margin-left: auto;
}
</style>
@/types/User
