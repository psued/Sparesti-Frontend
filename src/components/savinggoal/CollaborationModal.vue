<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2 id="header">Legg til partnere til sparemål</h2>
      <div class="add-user-section">
        <input type="text" v-model="username" placeholder="Enter username" />
        <button class="add-user-button" @click="addToSavingGoal">
          Legg til
        </button>
      </div>
      <div class="collaborators-section">
        <h3>Partnere</h3>
        <ul>
          <li v-for="collaborator in collaborators" :key="collaborator.id">
            {{ collaborator.userEmail }}
            <button @click="deleteCollaborator(collaborator.userEmail)">
              X
            </button>
          </li>
        </ul>
      </div>
      <button class="collaborate-button" @click="shareSavingGoal">
        Del sparemål!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { getUserByUsername } from "@/api/userHooks";
import {
  addSavingGoalToUser,
  getUsersBySavingGoal,
  deleteSavingGoalFromUser,
  userHasActiveSavingGoal,
} from "@/api/savingGoalHooks";
import { useUserStore } from "@/stores/userStore";

const props = defineProps({
  savingGoalId: Number,
});

const username = ref("");
const collaborators = ref<{ id: number; userEmail: string }[]>([]);
const userStore = useUserStore();
const userEmail = userStore.getUserName;

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update"): void;
}>();

/**
 * Emit the 'close' event.
 */
const close = () => {
  emit("close");
};

const update = () => {
  emit("update");
};

/**
 * Add a user to the saving goal as a collaborator.
 */
const addToSavingGoal = async () => {
  if (
    username.value === "" ||
    username.value === userEmail ||
    collaborators.value.some(
      (collaborator) => collaborator.userEmail === username.value,
    )
  ) {
    alert("Invalid username");
    username.value = "";
  }
  const user = await getUserByUsername();
  if (!user) {
    alert("User not found");
    username.value = "";
    return;
  }

  if (await userHasActiveSavingGoal(username.value)) {
    alert("User already has an active saving goal!");
    username.value = "";
    return;
  }

  await addSavingGoalToUser(username.value, props.savingGoalId ?? 0);

  fetchCollaborators();
  username.value = "";
  update();
  alert("User added to saving goal");
};

/**
 * Fetch the list of collaborators for the saving goal.
 */
const fetchCollaborators = async () => {
  const fetchedCollaborators = await getUsersBySavingGoal(
    props.savingGoalId ?? 0,
  );
  console.log(fetchedCollaborators);
  if (fetchedCollaborators !== null) {
    collaborators.value = fetchedCollaborators
      .filter(
        (collaborator: { userEmail: string }) =>
          collaborator.userEmail !== userEmail,
      ) // Filter out the session username
      .map((collaborator: { id: any; userEmail: any }) => ({
        id: collaborator.id,
        userEmail: collaborator.userEmail,
      }));
  }
  console.log(collaborators.value);
};

/**
 * Share the saving goal by copying its link to the clipboard.
 */
const shareSavingGoal = () => {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      console.log("URL copied to clipboard:", url);
      alert("URL copied to clipboard");
    })
    .catch((error) => {
      console.error("Error copying URL to clipboard:", error);
      alert("Error copying URL to clipboard");
    });
};

/**
 * Delete a collaborator from the saving goal.
 * @param userId - The ID of the user to be deleted.
 */
const deleteCollaborator = async (username: string) => {
  const confirmed = confirm(
    "Are you sure you want to delete this collaborator?",
  );
  if (confirmed) {
    await deleteSavingGoalFromUser(username, props.savingGoalId ?? 0);
    fetchCollaborators();
    alert("Collaborator deleted");
    update();
  }
};

onMounted(() => {
  fetchCollaborators();
});
</script>

<style scoped>
#header {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  background-color: var(--modal-background);
  border: 1px solid #888;
  border-radius: 8px;
  padding: 20px;
  max-width: 80%;
  width: 500px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.add-user-section,
.collaborators-section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.add-user-section input[type="text"] {
  width: calc(100% - 80px);
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.add-user-section button,
.collaborators-section button {
  border: none;
  cursor: pointer;
}

.add-user-section button:hover,
.collaborators-section button:hover {
  background-color: #428642;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.collaborators-section ul {
  padding: 0;
  margin: 0;
}

.collaborators-section li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.collaborators-section li:last-child {
  border-bottom: none;
}

.collaborate-button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
}

.collaborate-button:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.add-user-button {
  border-radius: 5px;
  padding: 10px 10px;
  margin-left: 15px;
}

@media screen and (max-width: 600px) {
  .modal-content {
    width: 90%;
  }
}

@media screen and (max-width: 400px) {
  .modal-content {
    width: 95%;
  }
}
</style>
