<template>
    <div class="saving-goal-details">
      <div class="header-container">
        <button class="back-button" @click="navigateToSavingGoalsPage">
          Tilbake til Sparemål
        </button>
        <h1 class="header">Sparemål Detaljer</h1>
        <button class="add-button" @click="showCollaborateModal">
          Legg til Brukere
        </button>
      </div>
      <div class="saving-goal-info">
        <SavingGoalCard :savingGoal="savingGoal || undefined" :editable="true" />
      </div>
      <div v-if="usersWithSavingGoal?.length">
      <h2 class="header2">Brukere med dette sparemålet:</h2>
      <div
        v-for="(user, index) in usersWithSavingGoal"
        :key="index"
        class="user-card"
      >
        <img
          v-if="user.profilePictureUrl"
          :src="user.profilePictureUrl"
          alt="Profile Picture"
        />
        <img v-else src="/default-profile-pic.png" alt="Profile Picture" />
        <div>
          <p class="card-text">{{ user.userEmail }}</p>
            <p class="card-text">Siste bidrag: {{ formatDate(user.lastContributed ?? '') }}</p>
          <p class="card-text">Beløp bidratt: {{ user.contributionAmount }}kr</p>
        </div>
      </div>
      </div>
      <CollaborationModal
        v-if="showCollaborate"
        :savingGoalId="savingGoalId"
        @close="closeCollaborateModal"
        @update="onUpdate"
        />
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import SavingGoalCard from "@/components/savinggoal/SavingGoalCard.vue";
  import CollaborationModal from "@/components/savinggoal/CollaborationModal.vue";
  import { type SavingGoal, type SavingGoalDetails } from "@/types/SavingGoal";
  import { getSavingGoalById, getUsersBySavingGoal } from "@/api/savingGoalHooks";
  import { useUserStore } from "@/stores/userStore";
  import { formatDate } from "@/utils/dateUtils";
  
  const savingGoal = ref<SavingGoal | null>(null);
  const route = useRoute();
  const router = useRouter();
  const savingGoalId = Number(route.params.saving_goal_id);
  const userStore = useUserStore();
  const userId = userStore.getUserId;
  const showCollaborate = ref(false);
  const usersWithSavingGoal = ref<SavingGoalDetails[] | null>(null);
  
  onMounted(async () => {
    savingGoal.value = await getSavingGoalById(savingGoalId);
    usersWithSavingGoal.value = await getUsersBySavingGoal(savingGoalId);
  });
  
  const navigateToSavingGoalsPage = () => {
    console.log(userId);
    router.push(`/saving-goals/user/${userId}`);
  };

  const onUpdate = async () => {
    usersWithSavingGoal.value = await getUsersBySavingGoal(savingGoalId);
  };

  const showCollaborateModal = () => {
    showCollaborate.value = true
  }

  const closeCollaborateModal = () => {
    showCollaborate.value = false
  }
  </script>

  
  <style scoped>
   .back-button {
    margin-left: 10px;
  }

  .add-button {
    margin-right: 10px;
  }

  @media screen and (max-width: 900px) {
    .header-container {
      display: grid;
      grid-template-columns: 1fr; /* Single column layout on smaller screens */
      width: 100%;
      justify-items: center;
      margin-bottom: 20px;
      grid-template-areas:
        "return"
        "add-user"
        "header";
    }

    .back-button {
      margin-left: 0px;
      grid-area: return;
    }

    .header {
      grid-area: header;
    }

    .add-button {
      margin-right: 0px;
      grid-area: add-user;
    }
  }

  @media screen and (min-width: 901px) {
    .header-container {
      display: grid;
      grid-template-columns: auto 1fr auto; /* Three columns layout on larger screens */
      grid-template-areas: "return header add-user";
      align-items: center; /* Center vertically */
      width: 100%;
      margin-bottom: 20px;
    }

    .back-button {
      grid-area: return;
    }

    .header {
      grid-area: header;
      justify-self: center; /* Center horizontally */
    }

    .add-button {
      grid-area: add-user;
      justify-self: end; /* Align to the end of the container horizontally */
    }
  }

  .saving-goal-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5%;
  }

  .header {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 20px;
    width: fit-content;
    margin: auto;
  }

  .header2 {
    text-align: center;
    font-size: 2em;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .back-button,
  .add-button {
    font-size: 24px;
    color: #333;
    text-decoration: none;
    padding-bottom: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-top: 10px;
    padding: 10px;
    transition: transform 0.2s;
    width: fit-content;
  }

  .back-button:hover,
  .add-button:hover {
    background-color: #e9e9e9;
    box-shadow: 0 0 5px #ccc;
    transform: scale(1.05);
    cursor: pointer;
  }

  .user-card {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border: 2px solid var(--border-color-green);
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.3s ease;
}

.user-card img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #ccc;
  transition: border-radius 0.5s ease;
}

.user-card:hover {
  background-color: #f0f0f0;
  box-shadow: 0 0 5px #ccc;
  transform: scale(1.05);
  cursor: pointer;
}

.user-card:hover img {
  border-radius: 8px;
}

.card-text {
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  font-size: 1.2em;
  border-left: 1px solid #ccc;
  padding-left: 10px;
  color: black;
}

/* Second to Second to last user - yellow border */
.user-card:nth-child(n+3):nth-last-child(n+2) {
  border-color: var(--border-color-yellow);
}

/* Last user - red border */
.user-card:last-child {
  border-color: var(--border-color-red);
}
</style>