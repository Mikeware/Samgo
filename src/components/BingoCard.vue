<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { SquareState, SquareInfo } from './models/states'
import Square from './Square.vue'

import ConfettiExplosion from "vue-confetti-explosion";

const won = ref(false);
const stampSound = ref<HTMLAudioElement>();
const winningSound = ref<HTMLAudioElement>();

const phrases: string[] = [
  // Phrases
  '"GAME SAMER"',
  '"CAM&shy;BRIDGE, MA" MEN&shy;TIONED',
  '"GAME CHANG&shy;ER" [NOT INTRO/<wbr/>OUTRO]',
  '"GOOD NIGHT"',
  '"DROP&shy;OUT"',
  '"BRAVO"',
  '"CON&shy;GRAT&shy;U&shy;LA&shy;TIONS"',
  '"OOH"',
  '"HMM"',
  '"WOW"',
  '"I LIKE IT/<wbr/>THAT"',
  '"IN&shy;TER&shy;EST&shy;ING"',

  // Emotion
  'LAUGHS OUT LOUD',
  'KEELS OVER LAUGH&shy;ING',
  'GETS GIDDY',
  'IN&shy;TRI&shy;GUED',
  'SHOCKED/<wbr/>SUR&shy;PRISED',

  // Stage
  'LEAVES PODIUM',
  'PLAYERS UN&shy;AT&shy;TEND&shy;ED',
  'TOUCHES HIS PODIUM',
  'GOES BACK&shy;STAGE',
  'TURNS AROUND',

  // Production
  'CALLS STAGE&shy;HAND',
  'BRINGS REL&shy;A&shy;TIVE',
  'PRIOR PLAYER AS GUEST',
  'USES PHONE',
  'COUNTS DOWN',

  // Game
  'IN&shy;TRO&shy;DUCES TWIST',
  'IN&shy;TRO&shy;DUCES A 2ND TWIST',
  'PAR&shy;O&shy;DIES A GAME SHOW',
  'HAS PLAYERS WAGER',
  'HAS A MINI&shy;GAME',

  // Points
  'RE&shy;MOVES A POINT',
  'AWARDS MORE THAN 1 POINT',
  'NE&shy;GO&shy;TI&shy;AT&shy;ED POINT',
  'AWARDS BONUS POINT',
  'MUL&shy;TI&shy;PLE PEOPLE GET POINTS',
  'AWARDS A NON-POINT PRIZE',

  // Player Interaction
  'LEARNS SOME&shy;THING NEW',
  'THREAT&shy;ENED BY PLAYER',
  'TOUCH&shy;ED BY A PLAYER',
  'SHARES ANEC&shy;DOTE ABOUT PLAYER',
  'SHARES PER&shy;SON&shy;AL ANEC&shy;DOTE',
  'UP&shy;SETS/<wbr/>FRUST&shy;RATES PLAYER',
]

function getRandomElementFromArray(array: string[]): string {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array.splice(randomIndex, 1)[0];
}

const board = ref(
  Array.from({ length: 5 }, () => 
    Array.from({ length: 5 }, () => new SquareInfo(getRandomElementFromArray(phrases), SquareState.UNSTAMPED))
  )
)

board.value[2][2] = new SquareInfo('"I\'VE BEEN HERE THE WHOLE TIME"', SquareState.UNSTAMPED)

function stampSquare(square: SquareInfo) {
  square.state = square.state == SquareState.STAMPED ? SquareState.UNSTAMPED : SquareState.STAMPED

  if (square.state == SquareState.STAMPED)
  {
    stampSound.value?.play();
  }

  // check for bingos
  let winning = false;
  let vertical = Array.from({ length: 5}, () => 0);
  let diagonals = Array.from({ length: 2}, () => 0);
  for (let row = 0; row < 5; row++) {
    let horizontal = 0;

    for (let col = 0; col < 5; col++) {
      if (board.value[row][col].state == SquareState.STAMPED) {
        vertical[col]++;
        horizontal++;

        // TL -> BR
        if (row == col) {
          diagonals[0]++;
        }
        // TR -> BL
        if (4 - row == col) {
          diagonals[1]++;
        }
      }
    }

    // Did this row have a bingo?
    if (horizontal == 5) {
      winning = true;
      break;
    }
  }

  // Check if we had any columns
  for (let col = 0; col < 5; col++) {
    if (vertical[col] == 5) {
      winning = true;
      break;
    }
  }

  // Check diagonals
  if (diagonals[0] == 5 || diagonals[1] == 5)
  {
    winning = true;
  }

  if (winning) {
    won.value = false;
    nextTick(() => {
      won.value = true;
      winningSound.value?.play();
    })
  }
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
        <Square :phrase="square.phrase" :state="square.state" 
                :is-last-row="rowindex == 4" :is-last-col="index == 4"
                :is-middle-square="rowindex == 2 && index == 2"
                @click="stampSquare(square)"/>
      </div>
    </div>
    <audio ref="stampSound">
      <source src="@/assets/stamp.mp3" type="audio/mpeg">
    </audio>
    <audio ref="winningSound">
      <source src="@/assets/winner.mp3" type="audio/mpeg">
    </audio>
    <ConfettiExplosion v-if="won"
                       class="confetti"
                       :particleCount="200" :force="0.2" :duration="3500"
                       :colors="['#b5737e', '#82a070', '#d14a3a', '#c4a56a', '#c28f54', '#89a0bb', '#a26a92']"/>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Keep on Truckin";
  src: local("Keep on Truckin"), url(@/assets/fonts/keept___.ttf) format("truetype");
}

.card {
  background-color: #711931;
  border-radius: 24px;

  overflow: visible;
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

.confetti {
  position: absolute !important;
  display: block;
  left: 50%;
  top: 10%;
  width: 100vw;
  height: 100vh;
}

/*@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}*/
</style>
