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


      <div v-if="goal > 0" class="road-edge-point road-end">
        <div class="road-edge-area" id="node-end">
          <img v-if="roadComplete" class="walking-end-pig" :src="endpig"></img>
        </div>
      </div>

      <div class="road-tile" v-for="(road) in roads" :key="road.id">
        <div class="road-amount-text" :class="`road-amount-text-${road.direction}` + ((road.arrived || road.moved) ? ' text-completed' : '')" >{{ road.amount }}</div>
        <img class="road-node" 
            @click="console.log('Clicked on road node ' + road.id + ' with amount ' + road.amount + ' and arrived ' + road.arrived + ' list id ' + roads[road.id].id)"
          :class="['road-node-' + road.direction , { 'road-completed': road.amount <= saved}]" 
          :src="(road.arrived || road.moved) ?  comleteImg : road.emoji" 
        >
        <div v-if="roads[road.id].arrived" 
          class="start-area-pig" 
          :class="'start-area-' + road.direction">
          <img class="walking-pig" :class="'pig-' + road.id" :src="road.pig" ></img>
        </div>
        <svg class="road-svg" :class="'road-' + road.direction + '-light'">{</svg>
      </div>

      <div v-if="goal > 0" class="road-edge-point road-start">
        <div class="road-edge-area" id="node-start">
          <img v-if="!startmoved" class="walking-pig walking-pig-start" :src="startpig">{{ saved + " / " + goal}}</img>
        </div>

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
import { type ChallengesResponse, type Challenge } from "@/types/challengeTypes";
import { useUserStore } from "@/stores/userStore";
import { useLogin } from "@/api/authenticationHooks";


const showPopup = ref(false);
const startpig = ref("src/assets/animation/pig-sitting-right.png");
const endpig = "src/assets/animation/dancing-pig.gif";
const startmoved = ref(false);
const comleteImg = "src/assets/star-circle.svg";
const roadComplete = ref(false);

const popupPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 });

const goal = ref(0);
const saved = ref(0);
const step = ref(0);

interface Road {
  id: number;
  amount: number,
  emoji: string;
  direction: string;
  moved: boolean;
  pig: string;
  arrived: boolean;
}
const roads = ref<Road[]>([]);
const addRoad = (amount: number) => {
  const direction = roads.value.length % 2 === 0 ? 'right' : 'left';
  const moved = false;
  const pig = 'src/assets/animation/pig-sitting-' + direction + '.png';

  roads.value.push({id: roads.value.length, amount, emoji: "something", direction, moved, pig, arrived: false});
};


function moveStart(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("Moving pig from start to " + (roads.value[roads.value.length - 1].id));
    startpig.value = "src/assets/animation/pig-walking-" + (roads.value.length%2 === 0 ? 'right' : 'left') + ".gif";
    const pig = document.getElementsByClassName('walking-pig-start')[0];
    if(pig){
      pig.classList.add('animation-pig-start-' + roads.value[roads.value.length-1].direction);
    }
    pig.addEventListener('animationend', () => {
      pig.classList.remove('animation-pig-start-' + roads.value[roads.value.length-1].direction);
      startmoved.value = true;
      roads.value[roads.value.length - 1].arrived = true;
      resolve(); 
    }, { once: true }); 
  });

}
function movePig(road: Road): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!goal || !road || road.amount > saved.value || roads.value.length === 1) {
      return;
    } else if(road.moved === false && road.amount < saved.value){
      console.log("Moving pig from " + road.id + " to " + (road.id-1));

      road.pig = `src/assets/animation/pig-walking-${roads.value[road.id].direction}.gif`;
      const pig = document.getElementsByClassName('pig-' + (road.id))[0];
      if(pig){
        pig.classList.add('animation-pig-' + road.direction);
      }
      
      pig.addEventListener('animationend', () => {
        road.pig = 'src/assets/animation/pig-sitting.png';
        road.arrived = false;
        road.moved = true;
        pig.classList.remove('animation-pig-' + road.direction);
        roads.value[road.id-1].arrived = true;
        resolve(); 
      }, { once: true }); 
    } 
  });
}
function moveEnd(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("Moving pig from " + roads.value[roads.value.length - 1].id + " to end");
    roads.value[0].pig = `src/assets/animation/pig-walking-${roads.value[0].direction}.gif`;
    const pig = document.getElementsByClassName('pig-0')[0];
    if(pig){
      pig.classList.add('animation-pig-end-' + roads.value[0].direction);
    }
    pig.addEventListener('animationend', () => {
      pig.classList.remove('animation-pig-end-' + roads.value[0].direction);
      roads.value[0].arrived = false;
      roads.value[0].moved = true;
      roadComplete.value = true;
      resolve(); 
    }, { once: true }); 
  });
}

const userStore = useUserStore();
const openPopup = (challenge: Challenge) => {
  showPopup.value = true;
  console.log("Popup opened");

};
const closePopup = () => {
  showPopup.value = false;
}

onMounted(async () => {
  if (!userStore.isLoggedIn()) {
    useLogin();
  }
  goal.value = 1000;
  saved.value = 800;
  step.value = 300;
  const steps = goal.value / step.value;


  for(let i = 1; i < steps; i++){
    const amount = goal.value - (i * step.value);
    addRoad(amount);
  }
  
  
  nextTick(async () => {
    for (let i = roads.value.length; i > 0; i--) {
      if (roads.value[i] && roads.value[i].amount <= saved.value) {
        if (i === roads.value.length - 1) {
          await moveStart();
        }
        if (roads.value[i - 1].amount <= saved.value) {
          await movePig(roads.value[i]);
        }
      } else if (roads.value.length === 1){
        await moveStart();
      }
    }

    if (goal.value <= saved.value) {
        await moveEnd();
    }
  });
});
</script>


/**
* @style
* @description The style section of the RoadTiles component.
*/
<style scoped>

/* Complete Container */
.road-container {
  position: relative;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.road-box {
  position: relative;
  align-items: center;
  justify-content: center;
  min-width: 520px;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* Edges of the road. The start and end point */
.road-edge-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.road-edge-area {
  position: relative;
  border: 2px solid #333333;
  border-radius: 5px;
  margin-top: -2px;
  width: 250px;
  height: 150px;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  font: 24px;
  z-index: -1;
}
.road-start{
  position: relative;
  z-index: 999;
}

/* Road Tiles */
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
.road-amount-text {
  position: absolute;
  margin-top: 95px;
  width: 100px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
  z-index: 900;
}
.road-amount-text-left {
  left: 50%;
  transform: translateX(-50%);
}
.road-amount-text-right {
  right: 50%;
  transform: translateX(50%);
}
.text-completed {
  font-size: 38px;
  color: gold;
  margin-top: 80px;
}
.road-completed {
  border: 2px solid #4b644a;
  background-color: rgba(166, 205, 148, 1)
}
.road-svg {
  display: flex;
  justify-content: center;
  resize: none;
}

/* Pig start position */
.start-area-pig{
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
.start-area-right{
  right: 170px;
}
.start-area-left{
  left: 170px;
}

/* Pig */
.walking-pig{
  width: 40px;
  height: 40px;
  position: absolute;
}
.walking-end-pig{
  width: 80px;
  height: 80px;
  position: absolute;
}

/* Pig animation */
.animation-pig-start-left{
  animation: pig-walking-start-left 3s ease-in-out;
}
.animation-pig-start-right{
  animation: pig-walking-start-right 3s ease-in-out;
}
.animation-pig-left{
  animation: pig-walking-left 3s ease-in-out;
}
.animation-pig-right{
  animation: pig-walking-right 3s ease-in-out;
}
.animation-pig-end-left{
  animation: pig-walking-end-left 3s ease-in-out;
}
.animation-pig-end-right{
  animation: pig-walking-end-right 3s ease-in-out;
}
@keyframes pig-walking-start-right {
  0% {
    transform: translateX(-90px) translateY(0px);
  }
  30% {
    transform: translateX(-90px) translateY(-100px);
  }
  70% {
    transform: translateX(85px) translateY(-100px);
  }
  100% {
    transform: translateX(85px) translateY(-145px);
  }
}
@keyframes pig-walking-start-left {
  0% {
    transform: translateX(90px) translateY(0px);
  }
  30% {
    transform: translateX(90px) translateY(-100px);
  }
  70% {
    transform: translateX(-85px) translateY(-100px);
  }
  100% {
    transform: translateX(-85px) translateY(-145px);
  }
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
@keyframes pig-walking-end-left {
  0% {
    transform: translateX(0px) translateY(0px);
  }
  30% {
    transform: translateX(0px) translateY(-140px);
  }
  70% {
    transform: translateX(85px) translateY(-140px);
  }
  100% {
    transform: translateX(85px) translateY(-180px);
  }
}
@keyframes pig-walking-end-right {
  0% {
    transform: translateX(0px) translateY(0px);
  }
  30% {
    transform: translateX(0px) translateY(-140px);
  }
  70% {
    transform: translateX(-85px) translateY(-140px);
  }
  100% {
    transform: translateX(-85px) translateY(-180px);
  }
}

@media screen and (max-width: 481px) {}
</style>