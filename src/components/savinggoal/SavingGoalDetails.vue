<template>
  <router-link to="/savinggoal" class="back-arrow">← Tilbake til opprettelse</router-link>
  <h1 class="title">Sparemål Detaljer</h1>

  <div class="saving-goals-container">
    <div v-for="goal in savingGoals" :key="goal.id" class="saving-goal-item">
      <SavingGoalCard :savingGoal="goal" @deleteGoal="handleDelete(goal.id)" @editGoal="handleEdit(goal.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getSavingGoals, deleteSavingGoal } from '@/api/savingGoalHooks';
  import { useUserStore } from '@/stores/userStore';
  import SavingGoalCard from '@/components/savinggoal/SavingGoalCard.vue';

  const savingGoals = ref<{ id: string }[]>([]);

  const route = useRoute();
  const userStore = useUserStore();

  onMounted(async () => {
    const userId = userStore.getUserId;
    if (userId) {
      savingGoals.value = await getSavingGoals(userId);
      console.log(savingGoals.value);
    }
  });

  const handleDelete = async (goalId: string) => {
    try {
      await deleteSavingGoal(Number(goalId)); // Call your API method to delete the goal
    } catch (error) {
      console.error('Feil ved å slette sparemål:', error);
    }
  };

  const handleEdit = (goalId: string) => {
    console.log('Edit goal with id:', goalId);
  };

</script>

  <style scoped>
  .back-arrow {
    font-size: 24px;
    color: #333;
    text-decoration: none;
    padding-bottom: 10px;
    display: block;
    max-width: fit-content;
  }

  .title {
    text-align: center;
    font-size: 25px;
  }

  .saving-goals-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Creates a 3x3 grid layout */
  grid-gap: 20px; /* This is the space between each card */
  justify-content: center;
  align-items: center;
  }

  .saving-goal-item {
    width: 100%; 
    display: flex; 
    justify-content: center;
  }
</style>
