<script setup lang="ts">
import { ref } from 'vue'
import { SquareState, SquareInfo } from './models/states'
import Square from './Square.vue'

const stampSound = ref<HTMLAudioElement>();

const phrases: string[] = [
  // Phrases
  '"GAME SAMER"',
  '"CAM&shy;BRIDGE, MA" MEN&shy;TIONED',
  '"GAME CHANG&shy;ER" [NOT INTRO/<wbr/>OUTRO]',
  '"GOOD NIGHT"',
  '"DROP&shy;OUT"',
  '"BRAVO"',
  '"CON&shy;GRAT&shy;ULA&shy;TIONS"',
  '"OOH"',
  '"HMM"',
  '"WOW"',
  '"I LIKE IT/<wbr/>THAT"',
  '"INTER&shy;ESTING"',

  // Emotion
  'LAUGHS OUT LOUD',
  'KEELS OVER LAUGH&shy;ING',
  'GETS GIDDY',
  'SHOCKED/<wbr/>SUR&shy;PRISED',

  // Stage
  'LEAVES PODIUM',
  'LEAVES PLAYERS UN&shy;ATTEND&shy;ED',
  'TOUCHES HIS PODIUM',
  'GOES BACK&shy;STAGE',
  'TURNS AROUND',

  // Production
  'CALLS UPON STAGE&shy;HAND',
  'BRINGS A RELATIVE',
  'GUEST WHO HAS PLAYED GC',
  'GETS A PHONE CALL',
  'COUNTS DOWN',

  // Game
  'INTRO&shy;DUCES TWIST',
  'INTRO&shy;DUCES A 2ND TWIST',
  'PARO&shy;DIES A GAME SHOW',
  'HAS PLAYERS WAGER',
  'HAS A MINI&shy;GAME',

  // Points
  'RE&shy;MOVES A POINT',
  'AWARDS MORE THAN 1 POINT',
  'AWARDS POINT ASKED FOR',
  'AWARDS BONUS POINT',  
  'MUL&shy;TIPLE PEOPLE GET POINTS',
  'AWARDS A NON-POINT PRIZE',

  // Player Interaction
  'LEARNS SOME&shy;THING NEW',
  'GETS THREAT&shy;ENED BY A PLAYER',    
  'SHARES ANEC&shy;DOTE ABOUT PLAYER',
  'SHARES A PER&shy;SONAL ANEC&shy;DOTE',
  'UPSETS/<wbr/>FRUST&shy;RATES PLAYER',
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
