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
#gclogo {
  object-fit: contain;
  max-height: 62vh; /* We really want this to be height: 62vh, but with portrait orientation it gets weird anyway, and we're going to prefer to opt for maintaining aspect ratio w/ contain above */
  max-width: 80vw;
  position: absolute;
  left: 50%;
  top: -10%;

  transform: scale(0.1) translate(-50%, 0%);
  
  animation-name: logoFlyIn;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-delay: 1.4s;
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

.bands {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

.bar {
  flex: 1;

  animation-name: slideIn;
  animation-duration: 1.75s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;

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

.first {
  background-color: #b52327;
  animation-delay: 650ms;
}

.second {
  background-color: #ef6638;
  animation-delay: 300ms;
}

.third {
  background-color: #fdbe4f;
  animation-delay: 350ms;
}

.fourth {
  background-color: #2088a7;
  animation-delay: 525ms;
}

.fifth {
  background-color: #711931;
  animation-delay: 500ms;
}
</style>
