<template>
    <div class="road-container">
        <div class="road-box">
            <svg class="road-svg road-right-light"></svg>
            <svg class="road-svg road-left-light"></svg>
            <svg class="road-svg road-right-light"></svg>
            <svg class="road-svg road-left-light"></svg>
            <svg class="road-svg road-right-light"></svg>
            <svg class="road-svg road-left-light"></svg>
            <svg class="road-svg road-right-light"></svg>
            <svg class="road-svg road-left-light"></svg>
            <svg class="road-svg road-right-light"></svg>
            <svg class="road-svg road-left-light"></svg>
            <svg class="road-svg road-right-light"></svg>
            <svg class="road-svg road-left-light"></svg>
            <svg class="road-svg road-right-light"></svg>
            <svg class="road-svg road-left-light"></svg>
            <svg class="road-svg road-right-light"></svg>
            <svg class="road-svg road-left-light"></svg>
            <svg class="road-svg road-right-light"></svg>
            <svg class="road-svg road-start-light"></svg>
        </div>
        </div>
</template>

<script>

</script>

<style scoped>
.road-container{
    flex-direction: column;
    height: 86vh;
    margin: 90px 0 0 0;
    width: 100%;
    position: fixed;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
}
.road-box {
    position: fixed;
    justify-content: center;
    align-items: center;
    align-self: center;
    position: absolute;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: scroll; /* Use "scroll" to always show scrollbar */
}

.road-svg {
    display: flex;
    justify-content: center;
    height: 160px;
    width: 100%;
    resize: none;
}

@media screen and (min-width: 481px){
    .road-container{
        height: 93vh;
    }
}
</style>