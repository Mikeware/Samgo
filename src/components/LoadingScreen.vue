<script setup lang="ts">
import { ref, onMounted } from 'vue'
/*defineProps<{
  msg: string
}>()*/

const bands = ref<HTMLDivElement>();

const introAudio = ref<HTMLAudioElement>();

onMounted(() => {
  introAudio.value?.play();

  setTimeout(() => {
    // Start color cycle
    for (let i = 0; i < 5; i++)
    {
      bands.value?.children[i].classList.remove("paused");
    }
  }, 2500);
});

</script>

<template>
  <div>
    <div class="bands" ref="bands">
      <div class="bar first paused"></div>
      <div class="bar second paused"></div>
      <div class="bar third paused"></div>
      <div class="bar fourth paused"></div>
      <div class="bar fifth paused"></div>
      <audio ref="introAudio">
        <source src="@/assets/gcintro.mp3" type="audio/mpeg">
      </audio>
    </div>
    <img id="gclogo" src="@/assets/gclogo.png"></img>
  </div>
</template>

<style scoped>
div {
  --cycle-time: 0.5s;
  --out-time: 3.5s;
}

#gclogo {
  object-fit: contain;
  max-height: 62vh; /* We really want this to be height: 62vh, but with portrait orientation it gets weird anyway, and we're going to prefer to opt for maintaining aspect ratio w/ contain above */
  max-width: 80vw;
  position: absolute;
  left: 50%;
  top: -10%;

  transform: scale(0.1) translate(-50%, 0%);
  
  animation-name: logoFlyIn, logoFlyOut;
  animation-duration: 2.5s, 400ms;
  animation-fill-mode: forwards, forwards;
  animation-timing-function: ease-in-out, linear;
  animation-delay: 1s, calc(var(--out-time) + 0.3s);
  transform-origin: left top;
}

@keyframes logoFlyIn {
  0% {
    top: -10%;
    transform: scale(0.1) translate(-50%, 0%);
  }
  100% {
    top: 50%;
    transform: scale(1) translate(-50%, -50%); /* Back to Center */
  }
}

@keyframes logoFlyOut {
  0% {
    top: 50%;
    left: 50%
  }
  100% {
    top: 50%;
    left: -50%
  }
}

.bands {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

.paused {
  animation-play-state: running, paused, running;
}

.bar {
  flex: 1;

  animation-name: slideIn, backgroundColorCycle, slideOut;
  animation-duration: 1.5s, calc(var(--cycle-time)), 450ms;
  animation-fill-mode: forwards, forwards, forwards;
  animation-timing-function: ease-out, linear, linear;
  animation-iteration-count: 1, infinite, 1;
  animation-direction: normal, normal, normal;  

  transform: scaleX(0);
  transform-origin: right top;
  justify-content: flex-end;
}

.bar.second, .bar.fourth {
  transform-origin: left top;
  justify-content: flex-start;
}

@keyframes slideIn {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes slideOut {
  0% {
    transform-origin: left top;
    justify-content: flex-start;
    transform: scaleX(1);
  }
  100% {
    transform-origin: left top;
    justify-content: flex-start;
    transform: scaleX(0);
  }
}

.first {
  background-color: #b52327;
  animation-delay: 650ms, calc(-1 * (4.99 * var(--cycle-time) / 5)), calc(var(--out-time) + 550ms);
}

.second {
  background-color: #ef6638;
  animation-delay: 300ms, calc(-1 * (3.75 * var(--cycle-time) / 5)), calc(var(--out-time) + 400ms);
}

.third {
  background-color: #fdbe4f;
  animation-delay: 350ms, calc(-1 * (2.5 * var(--cycle-time) / 5)), calc(var(--out-time) + 650ms);
}

.fourth {
  background-color: #2088a7;
  animation-delay: 525ms, calc(-1 * (1.25 * var(--cycle-time) / 5)), calc(var(--out-time) + 500ms);
}

.fifth {
  background-color: #711931;
  animation-delay: 500ms, calc(-1 * (0 * var(--cycle-time) / 5)), calc(var(--out-time) + 600ms);
}

@keyframes backgroundColorCycle {
  0%   { background: #711931; }
  25%  { background: #2088a7; }
  50%  { background: #fdbe4f; }
  75%  { background: #ef6638; }
  100% { background: #b52327; }
}
</style>
