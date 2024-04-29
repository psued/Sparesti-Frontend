<template>
    <div class="saving-goal-details">
      <div class="header-container">
        <button class="back-button" @click="navigateToSavingGoalsPage">
          Tilbake til sparemål
        </button>
        <h1 class="header">Sparemål Detaljer</h1>
      </div>
      <div class="saving-goal-info">
        <SavingGoalCard :savingGoal="savingGoal || undefined" />
      </div>
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import SavingGoalCard from "@/components/savinggoal/SavingGoalCard.vue";
  import type { SavingGoal } from "@/types/SavingGoal";
  import { getSavingGoalById } from "@/api/savingGoalHooks";
  import { useUserStore } from "@/stores/userStore";
  
  const savingGoal = ref<SavingGoal | null>(null);
  const route = useRoute();
  const router = useRouter();
  const savingGoalId = Number(route.params.saving_goal_id);
  const userStore = useUserStore();
  const userId = userStore.getUserId;
  
  onMounted(async () => {
    console.log(savingGoalId);
    savingGoal.value = await getSavingGoalById(savingGoalId);
    console.log(savingGoal.value);
  });
  
  const navigateToSavingGoalsPage = () => {
    console.log(userId);
    router.push(`/saving-goals/user/${userId}`);
  };
  </script>
  
  <style scoped>
@media screen and (max-width: 900px){
    .header {
      padding-top: 50px;
    }
}

  .saving-goal-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5%;
  }
  
  .header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
  }
  
  .back-button {
    font-size: 24px;
    color: #333;
    text-decoration: none;
    padding-bottom: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-top: 10px;
    margin-left: 10px;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.2s;
  }
  
  .back-button:hover {
    background-color: #e9e9e9;
    box-shadow: 0 0 5px #ccc;
    transform: scale(1.05);
    cursor: pointer;
  }
  
  .header {
    font-size: 3rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  </style>
  