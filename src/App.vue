<script setup>
import { ref } from "vue";
import * as piano from "./piano.js";
import * as trap from "./trap.js";
import SvgName from "./components/icons/svgname.svg?raw";
import "@fortawesome/fontawesome-free/css/all.css";
const TrapKeys = ref([
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
]);
const {
  getAudioPath,
  playSound,
  isBlackKey,
  keyBindings,
  handleKeyUp,
  handleClick,
} = piano;
const {  playTrap, stopSound, noteToFrequency, getNoteColor,oscillator } =
  trap;

/* part how to play  */
const showInfo = ref(false);
const toggleInfo = () => {
  showInfo.value = !showInfo.value;
};
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

    <section id="trap">
      <div class="flex justify-center absolute top-56">
        <div class="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div class="flex flex-wrap justify-center">
            <div
              v-for="trap in TrapKeys"
              :key="trap"
              @mousedown="playTrap(trap)"
              @mouseup="stopSound" 
              :style="{ backgroundColor: getNoteColor(trap) }"
              class="trap-key mb-4 md:w-1/6 lg:w-1/6 xl:w-1/6"
            >
              {{ trap }}
            </div>
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
        class="fa-solid fa-circle-info fixed bottom-0 right-0 fa-2x m-2 cursor-pointer text-gray-500 hover:text-gray-700"
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
          class="text-3xl font-semibold mb-4 text-gray-800"
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
        class="font-l font-light from-stone-500 text-center fixed bottom-0 left-0 w-full"
      >
        @DAIISARA INT203 ClIENT SIDE II
      </p>
    </footer>
  </div>
</template>
<style scoped>
@import "./components/util.css";

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
  font-family: "Protest Riot", sans-serif;
}
.trap-key:active {
  background-color: #ddd;
  border: 2px solid red;
}
.piano-key {
  width: 4.5vw;
  height: 30vh;
  display: inline-block;
  text-align: center;
  line-height: 270px;
  cursor: pointer;
  user-select: none;
  background-color: #ffff;
  color: black;
  font-size: 1vw; /* Responsive font size */
  border: 1px solid #000;
  border-radius: 8px;
}
.black-key {
  width: 3vw;
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
</style>
