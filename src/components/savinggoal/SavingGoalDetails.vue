<template>
  <div class="header">
    <router-link to="/saving-goal/create" class="back-arrow">← Tilbake til opprettelse</router-link>
    <h1 class="title">Sparemål</h1>
  </div>

  <div class="saving-goals-container">
    <div v-for="goal in savingGoals" :key="goal.id.toString()" class="saving-goal-item">
      <SavingGoalCard :savingGoal="goal" :editable="false" @deleteGoal="handleDelete(Number(goal.id))" @editGoal="handleEdit(Number(goal.id))" class="saving-goal-card" @click="handleRedirect(Number(goal.id))"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getSavingGoals } from '@/api/savingGoalHooks';
  import SavingGoalCard from '@/components/savinggoal/SavingGoalCard.vue';
  import type { SavingGoal } from '@/types/SavingGoal';
  import { useRouter } from 'vue-router';

  const savingGoals = ref<SavingGoal[]>([]);
  const router = useRouter();

  const handleDelete = async (id: Number) => {
  };

  const handleEdit = async (id: Number) => {
  };

  onMounted(async () => {
    savingGoals.value = await getSavingGoals();
      console.log(savingGoals.value);
  });

  const handleRedirect = (id : number) => {
    router.push(`/saving-goal/details/${id}`);
  };

</script>

  <style scoped>
  @media screen and (max-width: 900px){
    .header {
      padding-top: 70px;
    }
  }

  .back-arrow {
    font-size: 24px;
    color: #333;
    text-decoration: none;
    padding-bottom: 10px;
    display: block;
    max-width: fit-content;
    background-color: #f9f9f9;
    border-radius: 8px;
    position: absolute;
    margin-top: 10px;
    margin-left: 10px;
    padding: 10px;
    top: 0;
    left: 0;
  }

  .back-arrow:hover {
    background-color: #e9e9e9;
    border-radius: 8px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
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
