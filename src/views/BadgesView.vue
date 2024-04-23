<template>
    <div class="challenge-container">
      <h1>Din Utfordrings Prosess</h1>
      <div class="badges">
        <div
          v-for="badge in badges"
          :key="badge.id"
          class="badge"
          :class="{ 'highlighted': badge.highlighted }"
        >
          <img :src="badge.imageUrl" :alt="badge.title" />
          <p>{{ badge.title }}</p>
          <small>{{ badge.description }}</small>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Badge {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    highlighted: boolean;
  }
  
  const badges = ref<Badge[]>([
    {
      id: 1,
      title: 'Kaffe Elskeren',
      description: 'Spar 100 kr på kaffe i uken.',
      imageUrl: 'badge_coffee.png',
      highlighted: false
    },
    {
      id: 2,
      title: 'Energi Drikk',
      description: 'Spar 100 kr på energidrikk i løpet av uken.',
      imageUrl: 'badge_red_bull.png',
      highlighted: true
    },
    {
      id: 3,
      title: '3 Utfordringer Fullført',
      description: 'Fullfør 3 utfordringer i løpet av uken.',
      imageUrl: '3-challenges.png',
      highlighted: true
    },
    {
      id: 4,
      title: '10 Utfordringer Fullført',
      description: 'Fullfør 10 utfordringer i løpet av uken.',
      imageUrl: '10-challenges.png',
      highlighted: false
    },
    {
      id: 5,
      title: '15 Utfordringer Fullført',
      description: 'Fullfør 15 utfordringer i løpet av uken.',
      imageUrl: '15-challenges.png',
      highlighted: false
    },
    {
      id: 6,
      title: 'Mester i Sparing!',
      description: 'Spart innenfor ukentlig budsjett',
      imageUrl: 'badge_pig.png',
      highlighted: false
    }
  ]);
  </script>
  
  <style scoped>
  .challenge-container {
    text-align: center;
  }
  
  .badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .badge {
    width: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    text-align: center;
  }
  
  .badge img {
    width: 100%;
  }
  
  .badge.highlighted {
    border-color: rgb(9, 169, 9);
  }

  </style>
  