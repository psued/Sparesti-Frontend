/**
 * @file Sidebar.vue
 * @description This file contains the implementation of the Sidebar component.
 * The Sidebar component is a navigation component that displays a sidebar with various links and buttons.
 * It includes functionality for toggling the theme mode, toggling the sidebar, and handling media queries for mobile view.
 * The component accepts a prop for the dark mode theme.
 */
<template>
    <!-- Sidebar component -->
    <div class="sidebar" ref="sidebarRef" :class="{ 'sidebar-open': isOpen, 'sidebar-dark': darkMode}">
        <!-- Top bar items -->
        <div class="line" :class="{'line-dark' : darkMode}" />
        <div class="top-bar-items" >
            <!-- Theme mode toggle -->
            <div class="theme-mode" :class="{'theme-mode-dark': darkMode}" @click="toggleTheme" @mouseenter="toggleHoverTheme" @mouseleave="toggleHoverTheme">
                <i :class="[darkMode ? 'icon-light-mode' : (!hoverTheme ? 'icon-dark-mode' : 'icon-dark-mode-hover')]" />
            </div>
        </div>
        <!-- Bar items -->
        <div class="bar-items">
            <!-- Home link -->
            <router-link v-if="!isPhone" class="bar-item-desktop" :class="[{'text-dark' : darkMode}]" @click="toggleBar" to="/">
                <text>Home</text>
            </router-link>
            <!-- Profile link -->
            <router-link class="bar-item-desktop" :class="{'text-dark' : darkMode}" @click="toggleBar" to="/profile">
                <text>Profile</text>
            </router-link>
            <!-- Budget link -->
            <router-link v-if="!isPhone" class="bar-item-desktop" :class="[{'text-dark' : darkMode}]" @click="toggleBar"  to="/budget">
                <text>Budget</text>
            </router-link>
            <!-- Challenges link -->
            <router-link v-if="!isPhone" class="bar-item-desktop" :class="[{'text-dark' : darkMode}]" @click="toggleBar" to="/challenges">
                <text>Challenges</text>
            </router-link>
            <!-- Sign out button -->
            <div  class="bar-item-sign"  :class="[{'text-dark' : darkMode}]" @click="toggleBar" @mouseenter="toggleHoverSign" @mouseleave="toggleHoverSign" >
                <text>Sign out</text>
            </div>
            <!-- Contact link -->
            <router-link class="bar-item-desktop" :class="[isPhone ? '' : 'contact', {'text-dark' : darkMode}]" @click="toggleBar"  to="/contact">
                <text>Contact</text>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, defineProps} from 'vue';

// Reactive variables
const isOpen = ref(false);
const isPhone = ref(false);
const hoverSign = ref(false);
const hoverTheme = ref(false);

// Emit functions
const emit = defineEmits();

// Get token from local storage
const getToken = () => {
    return localStorage.getItem('token');
}

// Toggle theme mode
const toggleTheme = () => {
    emit('theme');
}

// Toggle sidebar
const toggleBar = () => {
    emit('bar');
}

// Toggle hover state for sign out button
const toggleHoverSign = () => {
    hoverSign.value = !hoverSign.value;
}

// Toggle hover state for theme mode toggle
const toggleHoverTheme = () => {
    hoverTheme.value = !hoverTheme.value;
}

// Props with default values
const props = withDefaults(defineProps<{
  darkMode: boolean
}>(), {
  darkMode: false
});

// Handle media query for mobile view
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
/* Styles for the sidebar component */
.sidebar {
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    background-color: #a6cd94 ;
    height: 100vh;
    width: 80vw;
    border-left: 3px solid rgba(0,0,0, 0.5);
}
.sidebar-dark {
    border-left: 2px solid #757bfd;
    background-color: #23244b;
}

/* Styles for the top bar items */
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

/* Styles for the theme mode toggle */
.theme-mode{
    height: 120px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.5s; 
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

/* Styles for the line separator */
.line {
    margin-top: 89px;
    width: 100%;
    height: 2px;
    background-color: #4b644a;
}

.line-dark {
    background-color: #757bfd;
}

/* Styles for the bar items */
.bar-items {
    font-size: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
}

/* Styles for the desktop bar items */
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

/* Styles for the contact bar item */
.bar-item-desktop.contact{
    position: absolute;
    bottom: 0;
}

.bar-item-desktop:hover {
    background-color: #4b644a;
    color: #f0f0f0;
}

/* Styles for the sign out button */
.bar-item-sign {
    cursor: pointer;
    color: #000000;
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
}

.bar-item-sign.text-dark{
    color: #f0f0f0;
}

.bar-item-sign:hover {
    background-color: rgba(255,0,0, 0.8);
    color: #f0f0f0;
}

.bar-item-desktop.text-dark:hover {
    background-color: #757bfd;
    color: #f0f0f0;
}

/* Media query for responsive design */
@media screen and (min-width: 481px){
    .sidebar {
        width: 20vw;
        min-width: 300px;
    }
}
</style>