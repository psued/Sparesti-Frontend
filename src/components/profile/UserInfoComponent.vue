<template>
  <div class="user-info">
    <div class="user-details">
      <div class="detail">
        <span class="label">Epost:</span>
        <div class="value-container">
          <i v-show="!isEditing" class="icon-mail"></i>
          <div v-show="!isEditing" class="value">{{ user.email }}</div>
        </div>
      </div>
      <div class="detail">
        <span class="label-name">Kallenavn:</span>
        <div class="value-container">
          <i v-show="!isEditing" class="icon-user"></i>
          <div v-show="!isEditing" class="value">{{ user.displayName }}</div>
          <input
            v-show="isEditing"
            type="text"
            v-model="user.displayName"
            class="input"
          />
        </div>
      </div>
      <div class="detail">
        <span class="label-name">Navn:</span>
        <div class="value-container">
          <i v-show="!isEditing" class="icon-user"></i>
          <div v-show="!isEditing" class="value">
            {{ user.firstName }} {{ user.lastName }}
          </div>
          <div v-show="isEditing" class="input-group">
            <input type="text" v-model="user.firstName" class="input" />
            <input type="text" v-model="user.lastName" class="input" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps<{
  user: any;
  isEditing: boolean;
}>();

const editName = ref(props.user.displayName);
const editEmail = ref(props.user.email);
const editFirstName = ref(props.user.firstName);
</script>

<style scoped>
.label-name {
  font-weight: bold;
}
.user-details .detail {
  margin-bottom: 1em;
}

.user-details .label {
  font-weight: bold;
  display: block;
}

.value-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
}

.icon {
  min-width: 1.5em;
  margin-right: 0.5em;
}

.value,
.input,
.input-group {
  display: block;
  padding-bottom: 0.3em;
  font-size: 25px;
}

.input,
.input-group {
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.input-group {
  display: flex;
  gap: 0.5em;
}

input.input {
  padding: 0.2em 0;
}
</style>

@/types/User
