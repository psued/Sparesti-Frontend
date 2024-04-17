<template>
    <div class="sidebar" ref="sidebarRef" :class="{ 'sidebar-open': isOpen }">
        <div class="line" />
        <div class="top-bar-items">
            <div class="sign-out" >
                <i class="icon-sign-out" />
            </div>
                <div class="theme-mode" @click="toggleTheme">
                    <i :class="iconTheme ? 'icon-light-mode' : 'icon-dark-mode'" />
                </div>
            </div>
        <div class="bar-items">
            <router-link :class="isPhone ? 'bar-item-phone phone-button' : 'bar-item-desktop'" to="/">
                <text>Home</text>
            </router-link>
            <router-link class="bar-item-desktop" to="/profile">
                <text>Profile</text>
            </router-link>
            <router-link :class="isPhone ? 'bar-item-phone phone-button' : 'bar-item-desktop'" to="/budget">
                <text>Budget</text>
            </router-link>
            <router-link :class="isPhone ? 'bar-item-phone phone-button' : 'bar-item-desktop'" to="/challenges">
                <text>Challenges</text>
            </router-link>
            <router-link class="bar-item-desktop" :class="isPhone ? '' : 'contact'"  to="/Contact">
                <text>Contact</text>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits} from 'vue';
const isOpen = ref(false);
const isPhone = ref(false);
const iconTheme = ref(false);
const emit = defineEmits();

const getToken = () => {
    return localStorage.getItem('token');
}

const toggleTheme = () => {
    iconTheme.value = !iconTheme.value;
    emit('theme');
}
onMounted(() => {
    const mediaQuery = window.matchMedia('(max-width: 480px)');
    const handleMediaChange = (e: any) => {
        isPhone.value = e.matches;
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    handleMediaChange(mediaQuery);
});
</script>

<style scoped>
.sidebar {
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    background-color: #a6cd94;
    height: 100vh;
    width: 100vw;
}

.top-bar-items{
    position: absolute;
    top: 0;
    margin-top: 15px;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 90px;
    width: 100%;
}

.sign-out{
    height: 120px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-right: 2px solid #4b644a;
    transition: 0.5s; 
}
.sign-out:hover {
    background-color: rgba(255, 0, 0, 0.8);
    color: #f0f0f0;
}

.theme-mode{
    height: 120px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-right: 2px solid #4b644a;
    transition: 0.5s; 
}
.theme-mode:hover {
    background-color: #4b644a;
    color: #f0f0f0;
}


.line {
    margin-top: 120px;
    width: 100%;
    height: 2px;
    background-color: #4b644a;
}

.bar-items {
    font-size: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
}
.bar-item-desktop {
    cursor: pointer;
    color: black;
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: 0.5s;
    text-decoration: none;
}

.bar-item-desktop.contact{
    position: absolute;
    bottom: 0;
}

.bar-item-desktop:hover {
    background-color: #4b644a;
    color: #f0f0f0;
}

@media screen and (min-width: 481px){
    .sidebar {
        width: 50vw;
        min-width: 350px;
    }
}
</style>