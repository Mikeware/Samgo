<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import { SquareState } from './models/states'
const props = defineProps<{
  phrase: string,
  state: SquareState,
  isLastRow: boolean,
  isLastCol: boolean,
  isMiddleSquare: boolean,
}>()

const stamp = ref<HTMLDivElement>();

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

watch(
    () => props.state,
    () => {
        if (props.state == SquareState.STAMPED)
        {
            nextTick(() => {
                stamp.value?.classList.add('rot' + (randomInt(-3, 3) * 5));
            });
        }
        else if (stamp.value != null)
        {
            // Remove whatever random rotation class name we added
            for (let i = stamp.value.classList.length - 1; i >= 0; i--) {
                const className = stamp.value.classList[i];
                if (className.startsWith('rot')) {
                    stamp.value?.classList.remove(className)
                }
            }            
        }
    }
)
</script>

<template>
  <div :class="[
            'square',
            isLastRow && 'lastrow',
            isLastCol && 'lastcol',
            isMiddleSquare && 'invert'
        ]">
    <div>
      <span v-html="phrase"></span>
    </div>
    <div ref="stamp" class="stamp" v-if="state == SquareState.STAMPED">
      <img src="@/assets/stamp.png" alt="Stamped" draggable="false">
    </div>
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

  > div > span {
    display: inline-block;
    max-width: 8ch;
    word-wrap: normal !important;
    word-break: keep-all !important;
  }
}

.square {
  font-family: "Santana Black", Arial, Helvetica, sans-serif;
  font-size: 14px;
  white-space: normal;
  overflow-wrap: normal;
  word-wrap: normal;
  word-break: break-word;
  hyphens: manual;

  user-select: none;

  background-color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 12px;

  width: 100%;
  height: 100%;
}

.stamp {
  display: block;
  position: absolute;

  img {
    width: auto;
    height: 18vh;
  }
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

.rot-15 {
  transform: rotate(-15deg);
}

.rot-10 {
  transform: rotate(-10deg);
}

.rot-5 {
  transform: rotate(-5deg);
}

.rot5 {
  transform: rotate(5deg);
}

.rot10 {
  transform: rotate(10deg);
}

.rot15 {
  transform: rotate(15deg);
}
</style>
