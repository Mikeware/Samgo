<script setup lang="ts">
import { ref, onMounted } from 'vue'
/*defineProps<{
  msg: string
}>()*/

const introAudio = ref<HTMLAudioElement>();

onMounted(() => {
  introAudio.value?.play();
});

</script>

<template>
  <div>
    <div class="bands">
      <div class="bar first"></div>
      <div class="bar second"></div>
      <div class="bar third"></div>
      <div class="bar fourth"></div>
      <div class="bar fifth"></div>
      <audio ref="introAudio">
        <source src="@/assets/gcintro.mp3" type="audio/mpeg">
      </audio>
    </div>
    <img id="gclogo" src="@/assets/gclogo.png"></img>
  </div>
</template>

<style scoped>
div {
  --out-time: 3.75s;
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
  animation-delay: 1.25s, calc(var(--out-time) + 0.3s);
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

.bar {
  flex: 1;

  animation-name: slideIn, slideOut;
  animation-duration: 1.75s, 450ms;
  animation-fill-mode: forwards, forwards;
  animation-timing-function: ease-out, linear;

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
  animation-delay: 650ms, calc(var(--out-time) + 550ms);
}

.second {
  background-color: #ef6638;
  animation-delay: 300ms, calc(var(--out-time) + 400ms);
}

.third {
  background-color: #fdbe4f;
  animation-delay: 350ms, calc(var(--out-time) + 650ms);
}

.fourth {
  background-color: #2088a7;
  animation-delay: 525ms, calc(var(--out-time) + 500ms);
}

.fifth {
  background-color: #711931;
  animation-delay: 500ms, calc(var(--out-time) + 600ms);
}
</style>
