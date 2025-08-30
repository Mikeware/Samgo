<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { SquareState, SquareInfo } from './models/states'
import CardSquare from './CardSquare.vue'
import ShareDialog from './ShareDialog.vue'

import ConfettiExplosion from 'vue-confetti-explosion'

const won = ref(false)
const showShareDialog = ref(false)
const stampSound = ref<HTMLAudioElement>()
const winningSound = ref<HTMLAudioElement>()

// &shy; used to indicate within-word breaks for tiny screens (basically 5-6 letters per line is when breaks need to happen)
// <wbr/> used to indicate bigger line break parts (usually in conjunction w/ '/')
// &apos; for single-quote within quoted phrase
// Commented ## after some lines is square on in-universe Samgo card from S7E11 Samalamadingdong
// Counting from top-left across, then down restarting at left each line. 1-25
// IMPORTANT: As of 8/29/2025, new entries need to go at end for indexing of state share to match across updates
// MAX 255 entries (as each index in share state represented by 2-digit Hex Number)
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
  '"IN ORDER<wbr/> SO THAT"', // #4
  '"I CAN&apos;T BE&shy;LIEVE THIS"', //10
  '"TRUE"', // #17
  'USES SIM&shy;ILE OR META&shy;PHOR', // #18
  '"LET&apos;S ZOOM OUT"/<wbr/>"LET&apos;S THINK ABOUT THIS"', // #19
  '"HO. LY. SHIT."', // #20
  '"MUR&shy;DER&shy;ERS&apos; ROW"', // #22

  // Emotion
  'LAUGHS OUT LOUD',
  'KEELS OVER LAUGH&shy;ING',
  'GETS GIDDY',
  'IN&shy;TRI&shy;GUED',
  'SHOCK&shy;ED/<wbr/>SUR&shy;PRISED',
  'PULLS/<wbr/>SCRAT&shy;CHES BEARD', // #1
  'IS SPE&shy;ECH&shy;LESS', // #2
  'HUGS SOME&shy;ONE', // #3
  'HIGH FIVES SOME&shy;ONE', // #6
  'SAYS SOME&shy;THING SELF-DE&shy;PRE&shy;CAT&shy;ING', // #23
  'SCREAMS/<wbr/>YELLS', // #25

  // Stage/Action
  'LEAVES PODIUM',
  'PLAYERS UN&shy;AT&shy;TEND&shy;ED',
  'TOUCHES HIS PODIUM',
  'GOES BACK&shy;STAGE',
  'TURNS AROUND',
  'DRINKS SOME&shy;THING', // #7 Removed YELLOW to Generalize
  'RUBS EYES OR TEMP&shy;LES', // #8
  'FANS SELF/<wbr/>AD&shy;JUSTS COLLAR', // #12
  'POINTS AND LAUGHS AT THE SAME TIME', // #14
  'CLEARS THROAT', // #16
  'DOES THE LOOK&shy;ING-AT-HANDS THING', // #21

  // Production
  'CALLS STAGE&shy;HAND', // #5 Generalized (TRIES TO GET INFORMATION OUT OF CREW MEMBER)
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
  'REF&shy;ER&shy;ENCE TO PRE&shy;VIOUS GG EPI&shy;SODE', // #9 Generalized -IDENTIFIES

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
  'BREAKS FOURTH WALL' // #24
]

const centerPhrases: string[] = [
  '"I&apos;VE BEEN HERE THE WHOLE TIME"',
  'SMACKS BUTT WITH BOTH HANDS AND SAYS "MEOW"'
]

const params = new URLSearchParams(window.location.search)
const encodedBoard = params.get('board')
const encodedStamps = params.get('stamps')

function getRandomElementFromArray(array: string[]): string {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array.splice(randomIndex, 1)[0]
}

const board = ref(generateBoard(encodedBoard, encodedStamps))

function generateBoard(encodedBoard: string | null, encodedStamps: string | null): SquareInfo[][] {
  // Initialize empty board
  let board = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => new SquareInfo('', -1, SquareState.UNSTAMPED))
  )

  if (encodedBoard) {
    // Encoded Board is a string of 50 hex digits, each pair of 2 represents an index value from 0-255 into the phrases array
    for (let i = 0; i < 25; i++) {
      const hex = encodedBoard[i * 2] + encodedBoard[i * 2 + 1]
      const index = parseInt(hex, 16)
      if (i == 12) {
        // 13th square grabs from center phrases
        board[Math.floor(i / 5)][i % 5] = new SquareInfo(
          centerPhrases[index],
          index,
          SquareState.UNSTAMPED
        )
      } else {
        board[Math.floor(i / 5)][i % 5] = new SquareInfo(
          phrases[index],
          index,
          SquareState.UNSTAMPED
        )
      }
    }

    // If we're loading an encoded board then mark that we've already won so we can't stamp.
    won.value = true

    // Clear URL bar so refreshing starts a new game
    history.replaceState(null, '', window.location.pathname)
  } else {
    // Need a copy so we don't grab the same phrase, but also need to index back into the original array
    let copyPhrases = [...phrases]

    board = Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => {
        const phrase = getRandomElementFromArray(copyPhrases)
        return new SquareInfo(phrase, phrases.indexOf(phrase), SquareState.UNSTAMPED)
      })
    )

    board[2][2] = new SquareInfo(centerPhrases[0], 0, SquareState.UNSTAMPED)

    // Square #13 - SAMALAMADINGDONG RANDOM CHANCE 5%
    if (Math.random() < 0.05) {
      board[2][2] = new SquareInfo(centerPhrases[1], 1, SquareState.UNSTAMPED)
    }
  }

  if (encodedStamps) {
    // Encoded Stamps is a string of 7 hex digits representing 28 bits in total, 25 used (5x5 board).
    // Each bit is mapped to each position on the board, bit is 1 if stamped.
    // First square is top-left, then going across, then next row, etc...
    const totalBits = parseInt(encodedStamps, 16)
    for (let i = 0; i < 25; i++) {
      const mask = 1 << i
      if ((totalBits & mask) !== 0) {
        board[Math.floor(i / 5)][i % 5].state = SquareState.STAMPED
      }
    }
  }

  return board
}

function stampSquare(square: SquareInfo) {
  // Stop stamping when won
  if (won.value) return

  square.state = square.state == SquareState.STAMPED ? SquareState.UNSTAMPED : SquareState.STAMPED

  if (square.state == SquareState.STAMPED) {
    stampSound.value?.play()
  }

  // check for bingos
  let vertical = Array.from({ length: 5 }, () => 0)
  let diagonals = Array.from({ length: 2 }, () => 0)
  let winType: 'row' | 'col' | 'diag1' | 'diag2' | null = null
  let winIndex = -1

  for (let row = 0; row < 5; row++) {
    let horizontal = 0

    for (let col = 0; col < 5; col++) {
      if (board.value[row][col].state == SquareState.STAMPED) {
        vertical[col]++
        horizontal++

        // TL -> BR
        if (row == col) {
          diagonals[0]++
        }
        // TR -> BL
        if (4 - row == col) {
          diagonals[1]++
        }
      }
    }

    // Did this row have a bingo?
    if (horizontal == 5) {
      winType = 'row'
      winIndex = row
      break
    }
  }

  // Check if we had any columns
  if (!winType) {
    for (let col = 0; col < 5; col++) {
      if (vertical[col] == 5) {
        winType = 'col'
        winIndex = col
        break
      }
    }
  }

  // Check diagonals
  if (!winType && diagonals[0] == 5) {
    winType = 'diag1'
  }

  if (!winType && diagonals[1] == 5) {
    winType = 'diag2'
  }

  if (winType) {
    // Set wiggle on winning squares
    if (winType === 'row') {
      for (let col = 0; col < 5; col++) {
        board.value[winIndex][col].wiggle = true
      }
    } else if (winType === 'col') {
      for (let row = 0; row < 5; row++) {
        board.value[row][winIndex].wiggle = true
      }
    } else if (winType === 'diag1') {
      for (let i = 0; i < 5; i++) {
        board.value[i][i].wiggle = true
      }
    } else if (winType === 'diag2') {
      for (let i = 0; i < 5; i++) {
        board.value[i][4 - i].wiggle = true
      }
    }

    // Trigger confetti, play sound, and show share dialog
    won.value = false
    nextTick(() => {
      won.value = true
      winningSound.value?.play()
      setTimeout(() => {
        showShareDialog.value = true
      }, 2250)
    })
  }
}
</script>

<template>
  <div class="bingo-page" id="boardcapture">
    <!-- Backdrop & Share Dialog -->
    <Transition name="fade">
      <div v-if="showShareDialog" class="backdrop" @click="showShareDialog = false"></div>
    </Transition>
    <div class="bingo-card">
      <div class="letters row">
        <div><span>S</span></div>
        <div><span>A</span></div>
        <div><span>M</span></div>
        <div><span>G</span></div>
        <div><span>O</span></div>
      </div>
      <!-- Bingo Tile -->
      <div v-for="(row, rowindex) in board" class="row" :key="rowindex">
        <div
          v-for="(square, index) in row"
          :key="index"
          :class="[
            index == 0 && rowindex == 0 && 'topleft',
            index == 4 && rowindex == 0 && 'topright',
            index == 0 && rowindex == 4 && 'bottomleft',
            index == 4 && rowindex == 4 && 'bottomright'
          ]"
        >
          <CardSquare
            :phrase="square.phrase"
            :state="square.state"
            :is-last-row="rowindex == 4"
            :is-last-col="index == 4"
            :is-middle-square="rowindex == 2 && index == 2"
            :wiggle="square.wiggle"
            @click="stampSquare(square)"
          />
        </div>
      </div>
      <audio ref="stampSound">
        <source src="@/assets/stamp.mp3" type="audio/mpeg" />
      </audio>
      <audio ref="winningSound">
        <source src="@/assets/winner.mp3" type="audio/mpeg" />
      </audio>
      <ConfettiExplosion
        v-if="won"
        class="confetti"
        :particleCount="200"
        :force="0.2"
        :duration="3500"
        :colors="['#b5737e', '#82a070', '#d14a3a', '#c4a56a', '#c28f54', '#89a0bb', '#a26a92']"
      />
    </div>
    <ShareDialog v-if="showShareDialog" @close="showShareDialog = false" :board="board" />
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Keep on Truckin';
  src:
    local('Keep on Truckin'),
    url(@/assets/fonts/keept___.ttf) format('truetype');
}

.bingo-page {
  overflow: hidden;
}

.bingo-card {
  background-color: #f0af21;
  border-radius: 24px;

  overflow: visible;
  display: grid;
  grid-template-rows: repeat(6, 1fr);

  box-sizing: border-box;
  height: 100%;
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
  font-family: 'Keep on Truckin', 'Times New Roman', Times, serif;
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

/* Backdrop styling */
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}*/
</style>
