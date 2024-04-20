<script setup lang="ts">
import BingoCard from '@/components/BingoCard.vue'
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ref } from 'vue'

const loadState = ref('starting');

function startGame() {
  loadState.value = 'intro';

  setTimeout(() => {
    loadState.value = 'bingo';
  }, 3000);

  setTimeout(() => {
    loadState.value = 'game';
  }, 4500);
}
</script>

<template>
  <main>
    <button class="center" @click="startGame" v-if="loadState == 'starting'">Play Game</button>

    <BingoCard class="full" v-if="loadState == 'bingo' || loadState == 'game'" />

    <Transition name="slide-fade">
      <LoadingScreen v-if="loadState == 'intro' || loadState == 'bingo'"/>
    </Transition>
  </main>
</template>

<style scoped>
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}

.slide-fade-leave-to {
  transform: translateX(-100vw);
  opacity: 0;
}
</style>