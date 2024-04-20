<script setup lang="ts">
import { SquareState } from './models/states'
defineProps<{
  phrase: string,
  state: SquareState,
  isLastRow: boolean,
  isLastCol: boolean,
  isMiddleSquare: boolean,
}>()
</script>

<template>
  <div :class="[
      'square',
      isLastRow && 'lastrow',
      isLastCol && 'lastcol',
      isMiddleSquare && 'invert',
    ]">
    <span>{{ phrase }}</span>
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

.invert {
  color: white;
  font-size: 8px !important;  

  background-image: url('@/assets/star.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  span {
    max-width: 15ch;
    word-wrap: normal !important;
    word-break: keep-all !important;
  }
}

.square {
  font-family: "Santana Black", Arial, Helvetica, sans-serif;
  font-size: 14px;
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
