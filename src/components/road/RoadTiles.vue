/**
* @component RoadTiles
* @description A Vue component that represents a road with nodes.
* @path src/components/road/RoadTiles.vue
*/

/**
* @template
* @description The template section of the RoadTiles component.
*/
<template>
  <div class="road-container">
    <div class="road-box">
      <div v-if="nodes.length > 0" class="road-tile-start">
        <div class="road-start-area road-end-area" id="node-(-1)">Node -1</div>
        <div class="road-start road-end"></div>
      </div>
      <div class="road-tile" v-for="(node, index) in nodes" :key="index">
        <img @click="openPopup(node.challenge)" class="road-node" :src="node.image" :class="node.point"
          :id="'node-' + index"></img>
        <svg class="road-svg" :class="node.direction"></svg>
      </div>
      <div v-if="nodes.length > 0" class="road-tile-start">
        <div class="road-start-area" id="node-0">Node 0</div>
        <div class="road-start"></div>
      </div>
    </div>
  </div>
</template>

/**
* @script
* @description The script section of the RoadTiles component.
*/
<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { getUserByUsername, getUserInfo } from "@/api/userHooks";
import { getChallengesByUser } from "@/api/challengeHooks";
import { type ChallengesResponse, type Challenge } from "@/types/challengeTypes";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { useLogin } from "@/api/authenticationHooks";

const selectedChallenge = ref<Challenge | null>(null);
const showPopup = ref(false);
const popupPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });


/**
 * @interface Node
 * @description Represents a node in the road.
 * @property {string} direction - The direction of the node.
 * @property {string} point - The direction of the point of the node.
 * @property {string} name - The name of the node.
 */
interface Node {
  direction: string;
  point: string;
  image: string;
  name: string;
  challenge: Challenge;
}

/**
 * @constant nodes
 * @description A reactive reference to the array of nodes.
 */
const nodes = ref<Node[]>([]);

/**
 * @function addNode
 * @description Adds a new node/tile to the road.
 */
const addNode = (ch: any) => {

  const direction = nodes.value.length % 2 === 0 ? 'road-right-light' : 'road-left-light';
  const point = nodes.value.length % 2 === 0 ? 'road-node-right' : 'road-node-left';
  const image = ch.mediaUrl;
  const name = `Node ${nodes.value.length + 1}`;
  const challenge = ch;
  nodes.value.unshift({ direction, point, image, name, challenge });
};

const userStore = useUserStore();

const openPopup = (challenge: Challenge) => {
  selectedChallenge.value = challenge;
  showPopup.value = true;
  console.log("Popup opened");
  console.log(challenge);
};

const closePopup = () => {
  selectedChallenge.value = null;
  showPopup.value = false;
}

onMounted(async () => {
  if (!userStore.isLoggedIn()) {
    useLogin();
  }

  const userId = 1; // Change this to the actual user ID
  const challengesResponse = await getChallengesByUser(userId);
  console.log(challengesResponse)
  if (challengesResponse === null) {
    console.log("No challenges found");
    return;
  }
  challengesResponse.forEach(challenge => {
    addNode(challenge);
  });

});
</script>


/**
* @style
* @description The style section of the RoadTiles component.
*/
<style scoped>
button {
  position: fixed;
  height: 50px;
  width: 100px;
  bottom: 100px;
}

.road-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: auto;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  font: 24px;
  z-index: -1;
}

.road-end {
  margin-top: 20px;
  margin-bottom: -1px;
}

.road-start-area {
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

.road-end-area {
  margin-top: 20px;
  margin-bottom: 0;
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
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
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

@media screen and (max-width: 481px) {}
</style>