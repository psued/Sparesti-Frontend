<template>
  <div class="authentication-container">
    <div class="static-content">
      <p>
        Welcome to SpareSti! <br />Application to make your wallet happier.
        <br />Free to use, money back guarantee.
      </p>
    </div>
    <div class="dynamic-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.authentication-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.dynamic-content {
}

.static-content {
  font-size: 1.5rem;
  text-align: left;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .authentication-container {
    grid-template-columns: 1fr; /* Makes it a single column layout */
  }

  .static-content {
    display: none; /* Hides the static content */
  }

  .dynamic-content {
    display: flex;
    justify-content: center;
  }
}
</style>
