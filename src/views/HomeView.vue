<script setup lang="ts">
import BingoCard from '@/components/BingoCard.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { ref } from 'vue'

const loadState = ref('starting')
const params = new URLSearchParams(window.location.search)
const hasBoard = ref(params.has('board'))

function startGame() {
  // Jump to game directly if loading a board from a shared seed
  if (hasBoard.value) {
    loadState.value = 'game'
    return
  }

  loadState.value = 'intro'

  setTimeout(() => {
    loadState.value = 'bingo'
  }, 3000)

  setTimeout(() => {
    loadState.value = 'game'
  }, 5000)
}
</script>

<template>
  <main>
    <div class="center" v-if="loadState == 'starting'">
      <p v-if="hasBoard">Shared Link! Loaded Board #{{ params.get('board') }}</p>
      <button @click="startGame" type="button">
        <img
          src="@/assets/PlayGamePodium.png"
          :alt="hasBoard ? 'Load Board' : 'Play Game'"
          :title="hasBoard ? 'Load Board' : 'Play Game'"
          draggable="false"
        />
      </button>
      <span>
        <h3>Disclaimer: This Fan Game is Not Associated with Dropout or Game Changer</h3>

        <p>
          This fan game is not affiliated with, endorsed by, or sponsored by Dropout or Game
          Changer. All logos, audio, and other intellectual property rights belong to their
          respective owners. This project was made purely for educational and entertainment purposes
          and does not seek to infringe upon any copyrights or trademarks.
        </p>

        <p>
          For any inquiries or concerns, please reach out to
          <a href="https://x.com/MikewareXGR">Mikeware</a>.
          <a href="https://github.com/Mikeware/Samgo">More info here</a>.
        </p>
      </span>
    </div>

    <BingoCard class="full" v-if="loadState == 'bingo' || loadState == 'game'" />

    <Transition name="slide-fade">
      <LoadingScreen v-if="loadState == 'intro' || loadState == 'bingo'" />
    </Transition>
  </main>
</template>

<style scoped>
button {
  background: transparent;
  border: 3px solid transparent;
  display: block;
  margin: 48px auto;
}

button:hover {
  cursor: pointer;
}

h3 {
  font-weight: bold;
  margin: 0 0 8px 0;
}

p {
  margin: 4px 0;
}

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
