<script setup lang="ts">
import BingoCard from '@/components/BingoCard.vue'
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ref, onMounted } from 'vue'

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    ///isLoading.value = false;
  }, 2000);
})
</script>

<template>
  <main>
    <LoadingScreen v-if="isLoading" />
    <BingoCard v-if="!isLoading" />
  </main>
</template>
