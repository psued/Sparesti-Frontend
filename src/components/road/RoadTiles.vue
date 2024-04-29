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
    <div class="road-box" ref="roadBox">
      <div v-if="nodes.length > 0" class="road-tile-start">
        <div class="road-start-area road-end-area" id="node-(-1)">Node -1</div>
        <div class="road-start road-end"></div>
      </div>
      <div @click="movePig(node, nodes, index)"  class="road-tile" v-for="(node, index) in nodes" :key="index">
        <img class="road-node" :src="((nodes[index+1] && nodes[index+1].moved) || (!nodes[index+1] && node.challenge.completed)) ? comleteImg : node.image" :class="[node.point , { 'completed-node': node.challenge.completed }]"
          :id="'node-' + index">
        </img>
        <div class="start-area" :class="'start-' + node.point">
          <img v-show="node.challenge.completed && node.moved === false && (nodes[index+1] && nodes[index+1].moved === true || !nodes[index+1])" :class="['walking-pig', 'walking-pig-' + index]"  :src="node.pig" ></img>
          </div>
        <svg class="road-svg" :class="node.direction">
        </svg>
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
import { onMounted, computed, ref, type Ref, nextTick} from "vue";
import { getUserByUsername, getUserInfo } from "@/api/userHooks";
import { getSortedChallengesByUser } from "@/api/challengeHooks";
import { type ChallengesResponse, type Challenge } from "@/types/challengeTypes";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { useLogin } from "@/api/authenticationHooks";

const selectedChallenge = ref<Challenge | null>(null);
const showPopup = ref(false);
const comleteImg = "https://ahaslides.com/wp-content/uploads/2021/12/Year-End-Review-1-1024x576.png";
const popupPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });
let totChallenges = 0;
let roadBox: Ref<HTMLElement | null> = ref(null);


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
  moved: boolean;
  pig: string;
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
const addNode = (ch: any, index: number) => {

  const direction = nodes.value.length % 2 === 0 ? 'road-right-light' : 'road-left-light';
  const point = nodes.value.length % 2 === 0 ? 'road-node-right' : 'road-node-left';
  const image = ch.mediaUrl;
  const name = `Node ${nodes.value.length + 1}`;
  const moved = false;
  const pig = nodes.value.length % 2 === 0 ? 'src/assets/animation/pig-sitting-left.png' : 'src/assets/animation/pig-sitting-right.png';

  // Test data
  if(index === 0 || index === 1){
    ch.completed = true;
    if(index === 1){
      const moved = false;
      nodes.value.unshift({ direction, point, image, name, moved, pig, challenge: ch });
      return;
    }
    const moved = false;
    nodes.value.unshift({ direction, point, image, name, moved, pig, challenge: ch });
    return;
  }


  nodes.value.unshift({ direction, point, image, name, moved, pig, challenge: ch });
};

async function movePig(node: Node, nodes: Node[], index: number) {
  if(totChallenges <= index+1 || !node){
    return;
  }
  if(nodes[index+1].challenge.completed && nodes[index+1].moved === false){
    movePig(nodes[index+1], nodes, index+1)
  }
  if(node.moved === false && node.challenge.completed === true){
    console.log("Moving pig from " + (index+1) + " to " + index);

    nodes[index+1].pig = `src/assets/animation/pig-walking-${nodes[index+1].point}.gif`;
    const pig = document.getElementsByClassName('walking-pig-' + (index+1))[0];
    if(pig){
      if((index+1) % 2 === 0){
        pig.classList.add('animation-pig-left');
      } else {
        pig.classList.add('animation-pig-right');
      }
    } else {
      console.log("Pig not found");
    }
  
    // Wait for the animation to finish
    pig.addEventListener('animationend', () => {
      nodes[index+1].pig = 'src/assets/animation/pig-sitting.png';
      nodes[index+1].moved = true;
    }, { once: true }); // The listener is removed after it has been called once
  }
}

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

    const challengesResponse = await getSortedChallengesByUser();
    console.log(challengesResponse) 
    if(challengesResponse === null){
        console.log("No challenges found");
        return;
    }
    challengesResponse.forEach(challenge => {
        totChallenges += 1;
        addNode(challenge, challengesResponse.indexOf(challenge));
    });


    nextTick(() => {
      if (roadBox.value) {
        roadBox.value.scrollTop = roadBox.value.scrollHeight;
      }
      for (let i = 0; i <= nodes.value.length; i++) {
        if (nodes.value[i+1] && nodes.value[i].challenge.completed) {
          console.log(nodes.value[i])
          movePig(nodes.value[i], nodes.value, i);
          break;
        }
      }
    });
});
</script>


/**
* @style
* @description The style section of the RoadTiles component.
*/
<style scoped>

.animation-pig-left{
  animation: pig-walking-left 3s ease-in-out;
}
.animation-pig-right{
  animation: pig-walking-right 3s ease-in-out;
}

@keyframes pig-walking-left {
  0% {
    transform: translateX(0px) translateY(0px);
  }
  40% {
    transform: translateX(0px) translateY(-135px);
  }
  70% {
    transform: translateX(170px) translateY(-135px);
  }
  100% {
    transform: translateX(170px) translateY(-180px);
  }
}

@keyframes pig-walking-right {
  0% {
    transform: translateX(0px) translateY(0px);
  }
  40% {
    transform: translateX(0px) translateY(-135px);
  }
  70% {
    transform: translateX(-170px) translateY(-135px);
  }
  100% {
    transform: translateX(-170px) translateY(-180px);
  }
}
.start-area{
  position: absolute;
  width: 10px;
  height: 0px;
  margin-top: 105px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  z-index: 900;
}

.start-road-node-right{
  right: 170px;
}
.start-road-node-left{
  left: 170px;
}
.walking-pig{
  width: 40px;
  height: 40px;
  position: absolute;
}

.road-container {
  position: absolute;
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
  border: 3px solid rgba(0,0,0,1);
  border-radius: 4px;
  background-color: #f3f3f3;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-size: cover;
  overflow: hidden;
  object-fit: contain;
}

.road-node-right {
  margin-top: 2px;
  height: 137px;
  width: 94px;
  right: 65px;
}

.road-node-left {
  margin-top: 1.5px;
  height: 129px;
  width: 91px;
  left: 64px;
}

.completed-node {
  border: 2px solid green;
  background-color: rgba(0, 255, 0, 0.5);
}

.road-svg {
  display: flex;
  justify-content: center;
  resize: none;
}

@media screen and (max-width: 481px) {}
</style>