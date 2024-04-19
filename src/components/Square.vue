<script setup lang="ts">
import { SquareState } from './models/states'
defineProps<{
  phrase: string,
  state: SquareState,
}>()
</script>

<template>
  <div class="square">
    {{ phrase }}
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Santana Black";
  src: local("Santana Black"), url(@/assets/fonts/Santana-Black.ttf) format("truetype");
}

.square {
  font-family: "Santana Black", Arial, Helvetica, sans-serif;
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  hyphens: auto;

  background-color: white;
  border: 1px solid gray;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 12px;

  width: 100%;
  height: 100%; 
}
</style>
