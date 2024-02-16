<script setup>
import { ref } from 'vue'
import * as piano from './piano.js'
import * as trap from './trap.js'
import SvgName from './components/icons/svgname.svg?raw'
import '@fortawesome/fontawesome-free/css/all.css'
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
  'B'
])
const blackKeys = ref(['Db', 'Eb', 'Gb', 'Ab', 'Bb'])
const {
  getAudioPath,
  playSound,
  isBlackKey,
  keyBindings,
  handleKeyUp,
  handleClick
} = piano
const { getNoteColor, playTrap, stopSound, noteToFrequency } = trap

// Oscillator type
const selectedOscillatorType = ref('sine') //default value

// change type
const changeOscillatorType = () => {
  trap.setOscillatorType(selectedOscillatorType.value)
}

const handleTrapMouseDown = (trap) => {
  playTrap(trap, selectedOscillatorType)
}

/* part how to play  */
const showInfo = ref(false)
const toggleInfo = () => {
  showInfo.value = !showInfo.value
}
// BG section
const backgrounds = [
  import('@/assets/pastelsea.mp4'),
  import('@/assets/disc.mp4'),
  import('@/assets/green.mp4')
]
const selectedBackgroundIndex = ref(0)

const changeBackground = async (index) => {
  selectedBackgroundIndex.value = index
  const video = await backgrounds[index]
  document.getElementById('background-video').src = video.default
}

/* ---------------- */
</script>
<template>
  <div>
    <video autoplay muted loop id="background-video">
      <source :src="backgrounds[selectedBackgroundIndex]" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <header id="header" class="w-full h-20">
      <div class="svg-image flex justify-center mt-6" v-html="SvgName"></div>
    </header>

    <div class="background-selector">
      <label for="background-select" class="text-white"
        >Select Background:</label
      >
      <select
        v-model="selectedBackgroundIndex"
        id="background-select"
        class="p-2 rounded-md bg-gray-800 text-white"
      >
        <option
          v-for="(background, index) in backgrounds"
          :key="index"
          :value="index"
        >
          Background {{ index + 1 }}
        </option>
      </select>
    </div>

    <section id="trap" class="trap-section">
      <!-- UI for selecting oscillator type -->
      <div class="oscillator-mode mb-6 flex justify-center">
        <label for="oscillator-type" class="text-white"
          >Select Oscillator Type:</label
        >
        <select
          v-model="selectedOscillatorType"
          @change="changeOscillatorType"
          class="p-2 rounded-md bg-gray-800 text-white"
        >
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>

      <div class="flex justify-center">
        <div class="trap-container">
          <div
            v-for="trap in TrapKeys"
            :key="trap"
            @mousedown="handleTrapMouseDown(trap)"
            @mouseup="stopSound"
            :style="{ backgroundColor: getNoteColor(trap) }"
            :class="{ 'piano-key': true }"
          >
            {{ trap }}
          </div>
        </div>
      </div>
    </section>
    <section
      id="piano"
      class="flex justify-center"
      @keyup="handleKeyUp"
      tabindex="0"
    >
      <div
        v-for="(note, key) in keyBindings"
        :key="key"
        :class="{ 'piano-key': true, 'black-key': isBlackKey(note) }"
        :data-note="note"
        class="rounded"
        @click="handleClick(note)"
      >
        {{ note }}
      </div>
    </section>

    <footer class="flex justify-center p-10">
      <!-- Icon to toggle the visibility of the information section -->
      <i
        @click="toggleInfo"
        class="fa-solid fa-circle-info fixed bottom-0 right-0 fa-2x m-2 cursor-pointer text-white hover:text-gray-700"
      ></i>

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

.trap-key {
  width: 100px;
  height: 100px;
  display: inline-block;
  text-align: center;
  line-height: 150px;
  cursor: pointer;
  margin-right: 20px;
  user-select: none;
  color: #ffff;
  font-family: 'Protest Riot', sans-serif;
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

.trap-key {
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

.oscillator-mode {
  margin-bottom: 20px;
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
}

#background-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
}
</style>
