<template>
  <div class="header">
    <ButtonComponent class="button" @click="createSavingGoal()">
      <template v-slot:content>
          <h2>Lag nytt sparemål</h2>
        </template>
    </ButtonComponent>
    <div>
      <h1 class="title">Sparemål</h1>
    </div>
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
  import ButtonComponent from '@/components/assets/ButtonComponent.vue';

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

  const createSavingGoal = () => {
    router.push('/saving-goal/create');
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

  .saving-goal-card {
    background-color: var(--color-badges-owned);
  }

  .saving-goal-card:hover {
    background-color: var(--color-badges-owned-hover);
  }

  .saving-goal-item {
    width: 100%; 
    display: flex; 
    justify-content: center;
  }

  .button {
    margin: 1rem auto;
    cursor: pointer;
    width: 200px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 10px;
  }
@media screen and (max-width: 900px){
    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .button{
      position: relative;
      left: 0;
    }
  }
</style>
