<script setup>
import { ref } from 'vue'
import * as piano from './piano.js'
import * as trap from './trap.js'
import SvgName from './components/icons/svgname.svg?raw'
import '@fortawesome/fontawesome-free/css/all.css'
const theKey = ref([])
const checkKey = function (key) {
  if (theKey.value.length < 36) {
    theKey.value += (theKey.value.length > 0 ? ', ' : '') + key
  } else {
    theKey.value = ''
  }
}
const TrapKeys = ref([
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
])
// const blackKeys = ref(['Db', 'Eb', 'Gb', 'Ab', 'Bb'])
const {
  getAudioPath,
  playSound,
  isBlackKey,
  keyBindings,
  handleKeyUp,
  handleClick,
} = piano
const { getNoteColor, playTrap, stopSound, noteToFrequency, trapKeyMap } = trap

// Oscillator type
const selectedOscillatorType = ref('sine') //default value

// change type
const changeOscillatorType = () => {
  trap.setOscillatorType(selectedOscillatorType.value)
}

const handleTrapMouseDown = (trap) => {
  playTrap(trap, selectedOscillatorType)
}

// binding trap to keyboard keys
const handleTrapKeyDown = (event) => {
  const key = event.key.toUpperCase()
  if (trapKeyMap.hasOwnProperty(key)) {
    const trapNote = trapKeyMap[key]
    playTrap(trapNote, selectedOscillatorType)
    checkKey(trapNote)
  }
}

const handleTrapKeyUp = () => {
  stopSound()
}

/* part how to play  */
const showInfo = ref(false)
const toggleInfo = () => {
  showInfo.value = !showInfo.value
}

// Metronome section
const isButtonClickSoundPlaying = ref(false)
const buttonClickAudio = new Audio('/src/assets/metro.mp3')

const toggleMetronome = () => {
  if (isButtonClickSoundPlaying.value) {
    // If the sound is currently playing, stop it
    buttonClickAudio.pause()
    isButtonClickSoundPlaying.value = false
  } else {
    // If the sound is not playing, start it
    buttonClickAudio.currentTime = 0 // Reset the audio to the beginning
    buttonClickAudio.loop = true
    buttonClickAudio.play()
    isButtonClickSoundPlaying.value = true
  }
}

//volume control section
const volume = ref(0.5) // Initial volume level (adjust as needed)

const setVolume = (newVolume) => {
  if (newVolume >= 0 && newVolume <= 1) {
    volume.value = newVolume
  }
  // You can also update the volume level for other audio sources if needed
  // For example, if you're using the buttonClickAudio for the metronome
  buttonClickAudio.volume = volume.value
}
//Toggle mode
const isActive = ref(false)

const toggle = () => {
  isActive.value = !isActive.value
  theKey.value = []
}

// Tutorials Song Test
const mySong = ref([
  'C2',
  'D2',
  'E2',
  'D2',
  'E2',
  'F2',
  'G2',
  'E2',
  'F2',
  'G2',
  'A2',
  'G2',
  'F2',
  'E2',
  'D2',
  'C2',
  'C3',
  'D3',
  'E3',
  'D3',
  'E3',
  'F3',
  'G3',
  'E3',
  'F3',
  'G3',
  'A3',
  'G3',
  'F3',
  'E3',
  'D3',
  'C3',
  'C4',
  'D4',
  'E4',
  'D4',
  'E4',
  'F4',
  'G4',
  'E4',
  'F4',
  'G4',
  'A4',
  'G4',
  'F4',
  'E4',
  'D4',
  'C4',
])
const songIndex = ref(0)
const songMessage = ref(`Press ${mySong.value[0]}`)

const checkSong = (key) => {
  if (key === mySong.value[songIndex.value]) {
    songIndex.value++
    songMessage.value = `Press ${mySong.value[songIndex.value]}`
  }
}

/* ---------------- */
</script>
<template>
  <div>
    <header id="header" class="w-full h-20">
      <div class="svg-image flex justify-center mt-6" v-html="SvgName"></div>
    </header>

    <video autoplay muted loop class="video">
      <source src="./assets/pastelsea.mp4" type="video/mp4" />
      <source src="./assets/pastelsea.mp4" type="video/webm" />
    </video>
    <section>
      <!-- UI for selecting oscillator type -->
      <div v-if="isActive" class="oscillator-mode mb-6 flex justify-center">
        <label for="oscillator-type" class="text-white"
          >Select Oscillator Type:</label
        >
        <select
          v-model="selectedOscillatorType"
          @change="changeOscillatorType"
          class="ml-2 rounded-md bg-white bg-opacity-10 text-white"
        >
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>
    </section>
    <!-- Note pressing showing -->
    <section>
      <div class="flex justify-center text-center">
        <div class="w-1.5/6 bg-white bg-opacity-10 mx-auto p-3">
          <span class="note">
            {{ theKey }}
          </span>
        </div>
      </div>
    </section>
    <div>
      <!-- Switch piano section -->
      <div class="flex items-center justify-center mt-3">
        <span class="text-white" :class="{ active: isActive }"
          >Classic piano</span
        >
        <div
          class="toggle-button"
          :class="{ active: isActive }"
          @click="toggle"
        >
          <div class="toggle-circle"></div>
        </div>

        <span class="text-white">Electronic piano</span>
        <!-- Volume Control Input-->
        <span class="ml-5" v-if="!isActive && !showInfo">
          <span class="flex justify-center text-white">
            Volume: {{ volume }}</span
          >
          <div class="volume-control ml-2 mb-3">
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.1"
              v-model="volume"
              @input="setVolume(volume)"
              class="p-2 rounded-md bg-gray-800 text-white"
            />
          </div>
        </span>
      </div>
    </div>

    <!-- Trap Section -->
    <section
      v-show="isActive"
      id="trap"
      class="trap-section flex justify-center"
      v-if="!showInfo"
    >
      <div class="flex justify-center">
        <div class="trap-container">
          <div
            v-for="trap in TrapKeys"
            :key="trap"
            @click="checkKey(trap)"
            @mousedown="handleTrapMouseDown(trap)"
            @mouseup="stopSound"
            @keydown="handleTrapKeyDown"
            @keyup="handleTrapKeyUp"
            :style="{ backgroundColor: getNoteColor(trap) }"
            :class="{
              'trap-key': true,
            }"
            tabindex="0"
          >
            <!-- Add tabindex to make the div focus on keyboard events -->
            {{ trap }}
          </div>
        </div>
      </div>
    </section>
    <!-- Piano Section -->
    <section
      id="piano"
      class="flex justify-center"
      @keyup="(event) => handleKeyUp(event, volume)"
      tabindex="0"
      v-if="!isActive && !showInfo"
    >
      <div
        v-for="(note, key) in keyBindings"
        :key="key"
        :class="{
          'piano-key': true,
          'black-key': isBlackKey(note),
        }"
        :data-note="note"
        class="rounded"
        @click="() => handleClick(note, volume)"
        @mouseup="checkKey(note)"
        @mousedown="checkSong(note)"
      >
        {{ note }}
      </div>
    </section>

    <!-- Tutorial Song Tection -->
    <!-- <div class="text-center text-white mt-10">
      <h2>Tutorial Song</h2>
      <p>{{ songMessage }}</p>
    </div> -->

    <footer class="flex justify-center p-10">
      <!-- Icon to toggle the visibility of the information section -->
      <i
        @click="toggleInfo"
        class="fa-solid fa-circle-info fixed bottom-3 right-0 fa-2xl m-2 cursor-pointer text-white hover:text-gray-700"
      ></i>

      <!-- Metro Section-->
      <div>
        <button
          @click="toggleMetronome"
          class="fixed bottom-1 right-11 p-1.5 bg-white text-white rounded-full cursor-pointer hover:bg-slate-700"
        >
          <img
            v-if="!isButtonClickSoundPlaying"
            src="./components/icons/metronome.svg"
            alt="Start Metronome"
            style="width: 20px; height: 20px"
          />
          <img
            v-else
            src="./components/icons/metronome.svg"
            alt="Stop Metronome"
            style="width: 20px; height: 20px"
          />
        </button>
      </div>
      <!-- Information section -->
      <div
        v-if="showInfo"
        class="relative max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg"
      >
        <!-- Cross icon to close the information section -->
        <i
          @click="toggleInfo"
          class="fa-solid fa-times-circle absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
        ></i>
        <h1
          class="text-3xl font-semibold mb-4 text-red-400"
          style="font-family: 'Roboto', sans-serif"
        >
          How to Play Piano
        </h1>
        <p class="text-gray-700" style="font-family: 'Roboto', sans-serif"></p>
        <p class="mt-4 text-gray-600">
          Here are some steps to get started with playing the piano:
        </p>
        <ol class="ml-6 list-decimal text-gray-600">
          <li>Find a comfortable seating position at the piano.</li>
          <li>Place your fingers on the keys, with your thumbs on middle C.</li>
          <li>
            Start by playing simple scales and exercises to warm up your
            fingers.
          </li>
          <li>
            Practice playing melodies and chords from beginner piano books or
            online tutorials.
          </li>
          <li>
            Gradually increase the difficulty of the pieces you play as you
            improve.
          </li>
        </ol>
      </div>
      <p
        class="font-l font-light text-white text-center fixed bottom-0 left-0 w-full"
      >
        @DAIISARA INT203 ClIENT SIDE II
      </p>
    </footer>
  </div>
</template>
<style scoped>
@import './components/util.css';
div {
  font-family: 'Protest Riot', sans-serif;
}
.trap-key {
  width: 4.5vw;
  height: 30vh;
  display: inline-block;
  text-align: center;
  line-height: 30vh; /* Center vertically */
  cursor: pointer;
  user-select: none;
  background-color: #ffff;
  color: gray;
  font-size: 1vw; /* Responsive font size */
  border: 1px solid #00000046;
  border-radius: 8px;
  margin: 0 auto; /* Center horizontally */
}
.piano-key:active {
  background-color: #ddd;
  border: 2px solid gray;
}
.piano-key {
  width: 4.5dvw;
  height: 30dvh;
  display: inline-block;
  text-align: center;
  line-height: 500px;
  cursor: pointer;
  user-select: none;
  background-color: #ffff;
  color: gray;
  font-size: 1vw; /* Responsive font size */
  border: 1px solid #00000046;
  border-radius: 8px;
  color: #ffff;
}
.black-key {
  width: 2.5vw;
  z-index: 2;
  line-height: 20px;
  margin: 0 -1.8vw 0 -1.8vw;
  height: 15vh;
  border: 1px solid #000;
  border-radius: 0 0 5px 5px;
  background-color: #363636;
}
.piano-key:hover {
  background-color: lightgray;
}
.trap-section {
  /* Adjust as needed */
  padding: 20px;
}

.trap-container {
  /* Adjust as needed */
  max-width: 1200px;
  width: 100%;
}

.oscillator-mode {
  margin-bottom: 20px;
}
.toggle-button {
  width: 50px;
  height: 25px;
  background-color: orange;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
}

.toggle-circle {
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
}

.toggle-button.active {
  background-color: #7bc043;
}

.toggle-button.active .toggle-circle {
  transform: translateX(25px);
}
</style>

<!-- .trap-key {
  width: calc(100% / 6); /* Adjust the number of keys per row */
  max-width: 100px; /* Adjust as needed */
  height: 100px; /* Adjust as needed */
  display: inline-block;
  text-align: center;
  line-height: 100px; /* Adjust as needed */
  cursor: pointer;
  margin: 10px; /* Adjust as needed */
  user-select: none;
  color: #ffff;
  font-family: 'Protest Riot', sans-serif;
}
@media (max-width: 768px) {
  .trap-key {
    width: calc(100% / 4); /* Adjust the number of keys per row */
    max-width: 80px; /* Adjust as needed */
    height: 80px; /* Adjust as needed */
    line-height: 80px; /* Adjust as needed */
  }
}

@media (max-width: 480px) {
  .trap-key {
    width: calc(100% / 3); /* Adjust the number of keys per row */
    max-width: 60px; /* Adjust as needed */
    height: 60px; /* Adjust as needed */
    line-height: 60px; /* Adjust as needed */
  }
} -->
