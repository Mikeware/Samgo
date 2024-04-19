<script setup lang="ts">
import { SquareState } from './models/states'
defineProps<{
  phrase: string,
  state: SquareState,
  isLastRow: boolean,
  isLastCol: boolean,
}>()
</script>

<template>
  <div :class="[
      'square',
      isLastRow && 'lastrow',
      isLastCol && 'lastcol',
    ]">
    {{ phrase }}
  </div>
</template>

<style scoped>
div {
  --border-width: 2px;
}

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
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 12px;

  width: 100%;
  height: 100%;
}

.square:not(.lastrow, .lastcol) {
  border-width: 0 var(--border-width) var(--border-width) 0;
  border-style: solid;
  border-color: gray;
}

.lastrow:not(.lastcol) {
  border-width: 0 var(--border-width) 0 0;
  border-style: solid;
  border-color: gray;
}

.lastcol:not(.lastrow) {
  border-width: 0 0 var(--border-width) 0;
  border-style: solid;
  border-color: gray;
}
</style>
