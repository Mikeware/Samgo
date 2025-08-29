<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SquareState, SquareInfo } from './models/states'
const props = defineProps<{
  board: SquareInfo[][]
}>()

const shareCode = ref()

onMounted(() => {
  shareCode.value = window.location.origin + '/?board='

  // Generate board code by adding 2-digit HEX value to represent each phrase index
  for (let i = 0; i < 25; i++) {
    shareCode.value += props.board[Math.floor(i / 5)][i % 5].index
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()
  }

  shareCode.value += '&stamps='

  // Generate stamp encoding from board state with each stamp being a single bit of a 7-digit HEX value
  let stampBits = 0
  for (let i = 0; i < 25; i++) {
    if (props.board[Math.floor(i / 5)][i % 5].state === SquareState.STAMPED) {
      stampBits |= 1 << i
    }
  }
  shareCode.value += stampBits.toString(16).padStart(7, '0').toUpperCase()
})

function copyCodeToClipboard() {
  navigator.clipboard.writeText(shareCode.value)
}
</script>

<template>
  <div class="share-dialog">
    <h3>Congratulations!</h3>
    <button @click="$emit('close')" class="flat-button close-button">
      <!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16">
        <path
          d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"
        />
      </svg>
    </button>
    <p>Share this link with friends to show off your winning board!</p>
    <div class="share-link-row">
      <input
        type="text"
        :value="shareCode"
        @click="copyCodeToClipboard()"
        readonly
        class="share-link-input"
      />
      <button @click="copyCodeToClipboard()" type="button" class="flat-button">
        <!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
          <path
            d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.share-dialog {
  position: fixed !important;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  border-radius: 0 1.5em 1.5em 0;
  background: white;
  padding: 1.5em;
  position: relative;
  margin: 1em 0;
  /* Create stepped border using box-shadow */
  box-shadow:
    0 0 0 6px #711931,
    0 0 0 12px #2088a7,
    0 0 0 18px #ef6638,
    0 0 0 24px #fdbe4f,
    0 0 0 30px #b52327;
}

/* Flex row for input and button */
.share-link-row {
  display: flex;
  align-items: center;
  gap: 0.75em;
  margin-top: 1em;
  margin-bottom: 1em;
}

.share-link-input {
  flex: 1;
  border: none;
  background: #f7f7f7;
  padding: 0.5em 0.75em;
  border-radius: 8px;
  font-size: 1em;
  color: #333;
  outline: none;
  min-width: 0;
}

/* https://getcssscan.com/css-buttons-examples */
.flat-button {
  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 8px 8px 4px 8px;
  text-align: center;
  transition: all 200ms;
  vertical-align: middle;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

/* Align to top-right of div */
.close-button {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
}
</style>
