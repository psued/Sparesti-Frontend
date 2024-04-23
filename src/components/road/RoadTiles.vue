<template>
    <div class="road-container">
        <div class="road-box">
            <div class="road-tile" v-for="(node, index) in nodes" :key="index">
                <div class="road-node" :class="node.point" :id="'node-' + index">{{ node.name }}</div>
                <svg class="road-svg" :class="node.direction"></svg>
            </div>
            <div v-if="nodes.length > 0" class="road-tile-start">
                <div class="road-start-area" id="node-0">Node 0</div>
                <div class="road-start"></div>
            </div>
        </div>
        <button @click="addNode()">Add Node</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Node {
  direction: string;
  point: string;
  name: string;
}

const nodes = ref<Node[]>([]);

const addNode = () => {
  const direction = nodes.value.length % 2 === 0 ? 'road-right-light' : 'road-left-light';
  const point = nodes.value.length % 2 === 0 ? 'road-node-right' : 'road-node-left';
  const name = `Node ${nodes.value.length + 1}`;
  nodes.value.unshift({ direction, point, name });
};
</script>


<style scoped>
    button {
    position: fixed;
    height: 50px;
    width: 100px;
    bottom: 100px;
    }
    .road-container{
        position: fixed;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .road-box {
        padding-top: 90px;
        padding-bottom: 60px;
        position: absolute;
        align-items: center;
        justify-content: center;
        bottom: 0;
        height: 100%;
        min-width: 520px;
        overflow-x: hidden;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        box-shadow: 0px -90px 90px -90px rgba(0, 0, 0, 0.5);
    }
    .road-tile-start {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .road-start {
        position: relative;
        border: 2px solid #333333;
        border-radius: 5px;
        margin-top: -2px;
        width: 250px;
        height: 150px;
        margin-bottom: 50px;
        background-color: #e5e5e5;
        z-index: -100;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: black;
        font: 24px;
    }
    .road-start-area{
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 150px;
        margin-bottom: 50px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 18px;
        color: black;
    }
    .road-node {
        position: absolute;
        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0.2);
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18px;
    }
    .road-node-right {
        margin-top: 6px;
        height: 130px;
        width: 86px;
        right: 69px;
    }
    .road-node-left {
        margin-top: 4px;
        height: 124px;
        width: 84px;
        left: 67px;
    }
    .road-svg {
        display: flex;
        justify-content: center;
        resize: none;
    }
    @media screen and (max-width: 481px){

    }
</style>