<template>
  <div class="header">
    <router-link to="/savinggoal" class="back-arrow">← Tilbake til opprettelse</router-link>
    <h1 class="title">Sparemål</h1>
  </div>

  <div class="saving-goals-container">
    <div v-for="goal in savingGoals" :key="goal.id" class="saving-goal-item">
      <SavingGoalCard :savingGoal="goal" @deleteGoal="handleDelete(goal.id)" @editGoal="handleEdit(goal.id)" class="saving-goal-card"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getSavingGoals } from '@/api/savingGoalHooks';
  import { useUserStore } from '@/stores/userStore';
  import SavingGoalCard from '@/components/savinggoal/SavingGoalCard.vue';
  import type { SavingGoal } from '@/types/SavingGoal';

  const savingGoals = ref<SavingGoal[]>([]);

  const route = useRoute();
  const userStore = useUserStore();

  const handleDelete = async (id: string) => {
  };

  const handleEdit = async (id: string) => {
  };

  onMounted(async () => {
    const userId = userStore.getUserId;
    if (userId) {
      savingGoals.value = await getSavingGoals(userId);
      console.log(savingGoals.value);
    }
  });

</script>

  <style scoped>
  .back-arrow {
    font-size: 24px;
    color: #333;
    text-decoration: none;
    padding-bottom: 10px;
    display: block;
    max-width: fit-content;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .back-arrow:hover {
    background-color: #e9e9e9;
    border-radius: 8px;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 20px;
    width: fit-content;
    margin: auto;
  }

  .saving-goals-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    justify-content: center;
    align-items: center;
  }

  .saving-goal-item {
    width: 100%; 
    display: flex; 
    justify-content: center;
  }
</style>
