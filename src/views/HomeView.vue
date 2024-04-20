<script setup lang="ts">
import BingoCard from '@/components/BingoCard.vue'
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ref } from 'vue'

const isStarting = ref(false);
const isLoading = ref(true);
const isBingo = ref(false);

function startGame() {
  isStarting.value = true;

  setTimeout(() => {
    // Load bingo behind animation a bit earlier, before animation ends.
    isBingo.value = true;
  }, 2000);

  setTimeout(() => {
    isLoading.value = false;
  }, 4500);
}
</script>

<template>
  <main>
    <button class="center" @click="startGame" v-if="!isStarting">Play Game</button>
    <LoadingScreen v-if="isLoading && isStarting"/>
    <BingoCard v-if="isBingo" />
  </main>
</template>