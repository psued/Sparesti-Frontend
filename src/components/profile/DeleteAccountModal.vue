<template>
  <Teleport to="body">
    <div class="modal" v-show="isModalVisible">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-content">
        <h2>Confirm Account Deletion</h2>
        <p>
          If you delete your account, you will permanently lose your profile,
          settings, and data associated with it.
        </p>
        <input
          type="password"
          class="input-password"
          placeholder="Enter your password"
          v-model="password"
        />
        <div class="button-group">
          <button class="cancel-btn" @click="closeModal">Cancel</button>
          <button class="confirm-delete-btn" @click="confirmDelete">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const isModalVisible = ref(true);
const password = ref("");
const emits = defineEmits(["closeModal", "confirmDelete"]);

const closeModal = () => {
  emits("closeModal");
};

const confirmDelete = () => {
  if (password.value) {
    emits("confirmDelete");
    closeModal();
  } else {
    alert("Please enter your password.");
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.modal-content {
  position: relative;
  padding: 20px;
  border-radius: 5px;
  z-index: 10;
  border: 1px solid;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-btn,
.confirm-delete-btn {
  padding: 10px 20px;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.cancel-btn {
  background-color: #ccc;
}

.confirm-delete-btn {
  background-color: #d9534f;
}

.cancel-btn,
.confirm-delete-btn {
  border-radius: 5px;
}
</style>
