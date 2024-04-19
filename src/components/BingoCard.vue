<script setup lang="ts">
import { ref } from 'vue'
import { SquareState } from './models/states'
import Square from './Square.vue'
/*defineProps<{
  msg: string
}>()*/

const phrases: string[] = [
  '"GAME SAMER"',
  '"CAMBRIDGE, MA" MENTIONED',
  '"GAME CHANGER"',
  '"GOOD NIGHT"',
  '"DROPOUT"',
  '"BRAVO"',
  '"CONGRATULATIONS"',
  '"I LIKE IT/THAT"',
  '"INTERESTING"',
  'INTRODUCES TWIST',
  'INTRODUCES A 2ND TWIST',
  'LAUGHS OUT LOUD',
  'KEELS OVER LAUGHING',
  'LEAVES PODIUM',
  'REMOVES A POINT',
  'ADDS MULTIPLE POINTS',
  'GIVES MULTIPLE PEOPLE A POINT',
  'PARODIES A GAME SHOW',
  'GETS THREATENED BY A PLAYER',
  'TALKS TO SOMEONE BACKSTAGE',
  'BRINGS A RELATIVE',
  'LEARNS SOMETHING NEW',
  'SHARES ANECDOTE ABOUT PLAYER',
  'SHARES A PERSONAL ANECDOTE',
  'COUNTS DOWN',
  'AWARDS A NON-POINT PRIZE',
  'UPSETS/FRUSTRATES PLAYER',
  'TURNS AROUND',
  'AWARDS POINT ASKED FOR',
  'GETS A PHONE CALL',
  'BRINGS ON A GUEST WHO HAS PLAYED GC',
  'LEAVES PLAYERS UNATTENDED',
  'GETS GIDDY',
  'TOUCHES HIS PODIUM',
  'HAS PLAYERS WAGER',
]

const board = ref(
  Array.from({ length: 5 }, () => 
    Array.from({ length: 5 }, () => ({
      phrase: phrases[Math.floor(Math.random() * phrases.length)],
      state: SquareState.UNSTAMPED
    }))
  )
)

board.value[2][2] = {
  phrase: '"I\'VE BEEN HERE THE WHOLE TIME"',
  state: SquareState.FREE
}
</script>

<template>
  <div class="card">
    <div class="letters row">
        <div><span>S</span></div>
        <div><span>A</span></div>
        <div><span>M</span></div>
        <div><span>G</span></div>
        <div><span>O</span></div>
    </div>
    <!-- Bingo Tile -->
    <div v-for="(row, rowindex) in board" class="row">
      <div v-for="(square, index) in row"
           :class="[
              index == 0 && rowindex == 0 && 'topleft',
              index == 4 && rowindex == 0 && 'topright',
              index == 0 && rowindex == 4 && 'bottomleft',
              index == 4 && rowindex == 4 && 'bottomright',
           ]">
        <Square :phrase="square.phrase" :state="square.state" :is-last-row="rowindex == 4" :is-last-col="index == 4"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Keep on Truckin";
  src: local("Keep on Truckin"), url(@/assets/fonts/keept___.ttf) format("truetype");
}

.card {
  background-color: #f76564;
  border-radius: 24px;

  display: grid;
  grid-template-rows: repeat(6, 1fr);

  box-sizing: border-box;
  /*--height: min(640px, calc(var(--vh, 100vh) - 310px));
  height: var(--height);
  width: min(480px, calc(var(--height) / 6 * 5));*/

  margin: 0px auto;
  padding: 12px 0;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0 12px;
}

.topleft {
  border-radius: 24px 0 0 0;
  overflow: hidden;
}

.topright {
  border-radius: 0 24px 0 0;
  overflow: hidden;
}

.bottomleft {
  border-radius: 0 0 0 24px;
  overflow: hidden;
}

.bottomright {
  border-radius: 0 0 24px 0;
  overflow: hidden;
}

.letters {
  font-family: "Keep on Truckin", 'Times New Roman', Times, serif;
  font-weight: bold;
  font-size: 64px;

  color: white;

  > div {
    float: left;
    margin: 0 12px 0 12px;
    text-align: center;
  }
}

/*@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}*/
</style>
