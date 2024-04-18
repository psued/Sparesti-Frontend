<template>
    <div class="sidebar" ref="sidebarRef" :class="{ 'sidebar-open': isOpen, 'sidebar-dark': darkMode}">
        <div class="line" :class="{'line-dark' : darkMode}" />
        <div class="top-bar-items" >
            <div class="sign-out"  :class="{'sign-out-dark': darkMode}" @click="toggleBar" @mouseenter="toggleHoverSign" @mouseleave="toggleHoverSign" >
                <i :class="darkMode ?  'icon-sign-out-dark' : (!hoverSign ? 'icon-sign-out' : 'icon-sign-out-dark')"  />
            </div>
            <div class="theme-mode" :class="{'theme-mode-dark': darkMode}" @click="toggleTheme" @mouseenter="toggleHoverTheme" @mouseleave="toggleHoverTheme">
                <i :class="[darkMode ? 'icon-light-mode' : (!hoverTheme ? 'icon-dark-mode' : 'icon-dark-mode-hover')]" />
            </div>
        </div>
        <div class="bar-items">
            <router-link v-if=(!isPhone) class="bar-item-desktop" :class="[{'text-dark' : darkMode}]" @click="toggleBar" to="/">
                <text>Home</text>
            </router-link>
            <router-link class="bar-item-desktop" :class="{'text-dark' : darkMode}" @click="toggleBar" to="/profile">
                <text>Profile</text>
            </router-link>
            <router-link v-if=(!isPhone) class="bar-item-desktop" :class="[{'text-dark' : darkMode}]" @click="toggleBar"  to="/budget">
                <text>Budget</text>
            </router-link>
            <router-link v-if=(!isPhone) class="bar-item-desktop" :class="[{'text-dark' : darkMode}]" @click="toggleBar" to="/challenges">
                <text>Challenges</text>
            </router-link>
            <router-link class="bar-item-desktop" :class="[isPhone ? '' : 'contact', {'text-dark' : darkMode}]" @click="toggleBar"  to="/contact">
                <text>Contact</text>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, defineProps} from 'vue';
const isOpen = ref(false);
const isPhone = ref(false);
const emit = defineEmits();
const hoverSign = ref(false);
const hoverTheme = ref(false);

const getToken = () => {
    return localStorage.getItem('token');
}

const toggleTheme = () => {
    emit('theme');
}
const toggleBar = () => {
    emit('bar');
}

const toggleHoverSign = () => {
    hoverSign.value = !hoverSign.value;
}

const toggleHoverTheme = () => {
    hoverTheme.value = !hoverTheme.value;
}

const props = withDefaults(defineProps<{
  darkMode: boolean
}>(), {
  darkMode: false
});

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
    background-color: #a6cd94 ;
    height: 100vh;
    width: 100vw;
    border-left: 2px solid #4b644a;
}
.sidebar-dark {
    border-left: 2px solid #757bfd;
    background-color: #23244b;
}

.top-bar-items{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 90px;
    width: 100%;
    overflow: hidden;
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
.sign-out-dark{
    border-right: 2px solid #757bfd;
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

.theme-mode-dark{
    border-right: 2px solid #757bfd;

}

.theme-mode:hover {
    background-color: #4b644a;
    .icon-dark-mode{
        stroke: #f0f0f0;
    }
    color: #f0f0f0;
}

.theme-mode-dark:hover{
    background: #757bfd;
}


.line {
    margin-top: 89px;
    width: 100%;
    height: 2px;
    background-color: #4b644a;
}
.line-dark {
    background-color: #757bfd;
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
.text-dark{
    color: white;
}

.bar-item-desktop.contact{
    position: absolute;
    bottom: 0;
}

.bar-item-desktop:hover {
    background-color: #4b644a;
    color: #f0f0f0;
}

.bar-item-desktop.text-dark:hover {
    background-color: #757bfd;
    color: #f0f0f0;
}

@media screen and (min-width: 481px){
    .sidebar {
        width: 40vw;
        min-width: 350px;
    }
}
</style>