<template>
  <div class="contact">
    <div class="mail-box">
      <p class="mail">Mail:</p>
      <p class="mail-info">falsktfirma@firma.com</p>
    </div>
    <div class="phone-box">
      <p class="phone">Tlf:</p>
      <p class="phone-info">+47 12 34 56 78</p>
    </div>
    <div class="discord-box">
      <p class="discord">Discord:</p>
      <div class="discord-info-container">
        <a class="discord-info" href="https://discord.gg/7tG4Fw6U"
          >https://discord.gg/7tG4Fw6U</a
        >
      </div>
    </div>
    <div class="wiki-box">
      <p class="wiki">Wiki:</p>
      <div class="link-box">
        <a
          class="wiki-info"
          href="https://gitlab.stud.idi.ntnu.no/team-10-2024/sparesti-frontend/-/wikis/home"
          >Frontend</a
        >
        <a class="slash">/</a>
        <a
          class="wiki-info"
          href="https://gitlab.stud.idi.ntnu.no/team-10-2024/sparesti-backend/-/wikis/home"
        >
          Backend</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.contact {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  width: 40%;
  min-width: 300px;
  font-size: 18px;
  color: var(--text-color);
  background-color: var(--color-badges-owned);
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  gap: 20px;
}

.mail,
.phone,
.discord,
.wiki {
  position: relative;
  margin: 10px 0;
  font-weight: bold;
  text-decoration: none;
  color: var(--text-color);
}
.discord-info-container {
  display: inline-block;
  transition: all 0.3s ease;
}
.discord-info,
.wiki-info {
  color: var(--text-color);
  cursor: pointer;
  border-radius: 5px;
}
.discord-info:hover,
.wiki-info:hover {
  background-color: var(--color-badges-owned-hover);
  transform: scale(1.1);
}
.discord-info-container:hover {
  transform: scale(1.1);
}
.link-box {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.slash {
  color: var(--text-color);
  text-decoration: none;
  cursor: default;
}

.slash:hover {
  background-color: transparent;
}
</style>
