<script setup>
import { ref } from "vue";
const isClick = ref(false);
const theKey = ref([]);
const checkKey = function (key) {
  if (theKey.value.length < 18) {
    theKey.value += key;
  } else {
    theKey.value = [];
  }
};
const getNoteColor = (note) => {
  switch (note) {
    case "C":
      return "#F9EFDB";
    case "C#":
      return "#EBD9B4";
    case "D":
      return "#9DBC98";
    case "D#":
      return "#638889";
    case "E":
      return "#D9EDBF";
    case "F":
      return "#FFB996";
    case "F#":
      return "#FFCF81";
    case "G":
      return "#FDFFAB";
    case "G#":
      return "#FDF7E4";
    case "A":
      return "#FAEED1";
    case "A#":
      return "#DED0B6";
    case "B":
      return "#BBAB8C";
  }
};
const getAudioPath = (note) => {
  const path = `./src/piano-mp3/${note}.mp3`;
  console.log("Audio Path:", path);
  return path;
};

// src\piano-mp3\A1.mp3
const playSound = (note) => {
  const audioPath = getAudioPath(note);
  try {
    const audio = new Audio(audioPath);
    audio.play();
    console.log("Audio played successfully");
  } catch (error) {
    console.error("Error playing audio:", error);
  }
};

const isBlackKey = (note) => {
  const blackKeys = ["Bb", "Db", "Eb", "Gb", "Ab"];
  return blackKeys.includes(note.substring(0, 2)); //เช็คตัวว่าตัวดำไหมโดยการใช้include
};

const notes = [
  "A0",
  "Bb0",
  "B0",
  "C1",
  "Db1",
  "D1",
  "Eb1",
  "E1",
  "F1",
  "Gb1",
  "G1",
  "Ab1",
  "A1",
  "Bb1",
  "B1",
  "C2",
  "Db2",
  "D2",
  "Eb2",
  "E2",
  "F2",
  "Gb2",
  "G2",
  "Ab2",
  "A2",
  "Bb2",
  "B2",
  "C3",
  "Db3",
  "D3",
  "Eb3",
  "E3",
  "F3",
  "Gb3",
  "G3",
  "Ab3",
  "A3",
  "Bb3",
  "B3",
  "C4",
  "Db4",
  "D4",
  "Eb4",
  "E4",
  "F4",
  "Gb4",
  "G4",
  "Ab4",
  "A4",
  "Bb4",
  "B4",
  "C5",
  "Db5",
  "D5",
  "Eb5",
  "E5",
  "F5",
  "Gb5",
  "G5",
  "Ab5",
  "A5",
  "Bb5",
  "B5",
  "C6",
  "Db6",
  "D6",
  "Eb6",
  "E6",
  "F6",
  "Gb6",
  "G6",
  "Ab6",
  "A6",
  "Bb6",
  "B6",
  "C7",
  "Db7",
  "D7",
  "Eb7",
  "E7",
  "F7",
  "Gb7",
  "G7",
  "Ab7",
  "A7",
  "Bb7",
  "B7",
  "C8",
];
</script>
<script>
export default {
  data() {
    return {
      audioContext: null,
      oscillator: null,
      pianoKeys: [
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
      ],
      isButtonClickSoundPlaying: false,
      buttonClickAudio: new Audio("/src/assets/youtube_ymJIXzvDvj4_audio.mp3"),
    };
  },
  methods: {
    playSound(note) {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.oscillator = this.audioContext.createOscillator();
      this.oscillator.type = "sine";
      this.oscillator.frequency.setValueAtTime(
        this.noteToFrequency(note),
        this.audioContext.currentTime
      );
      this.oscillator.connect(this.audioContext.destination);
      this.oscillator.start();
    },
    stopSound() {
      if (this.oscillator) {
        this.oscillator.stop(this.audioContext.currentTime);
        this.oscillator.disconnect();
      }
    },
    noteToFrequency(note) {
      const A4Frequency = 440; // Frequency of A4
      const noteDistance =
        this.pianoKeys.indexOf(note) - this.pianoKeys.indexOf("A");
      return A4Frequency * Math.pow(2, noteDistance / 12);
    },
    toggleMetronome() {
      if (this.isButtonClickSoundPlaying) {
        // If the sound is currently playing, stop it
        this.buttonClickAudio.pause();
        this.isButtonClickSoundPlaying = false;
      } else {
        // If the sound is not playing, start it
        this.buttonClickAudio.currentTime = 0; // Reset the audio to the beginning
        this.buttonClickAudio.play();
        this.isButtonClickSoundPlaying = true;
      }
    },
  },
};
</script>
<template>
  <!-- This is header นะจ้า -->
  <div class="bg-sand-shore w-full h-screen bg-cover">
    <div class="flex justify-center">
      <img
        src="./assets/font2.png"
        alt=""
        class="mt-4 ml-5"
        style="width: 150px"
      />
    </div>

    <!-- This is tutorial section Naja -->
    <div
      v-if="isClick"
      class="relative max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg"
      :class="isDark ? 'bg-white' : 'bg-slate-400'"
    >
      <i
        @click="isClick = !isClick"
        class="fa-solid fa-times-circle absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
      ></i>
      <h1
        class="text-3xl font-semibold mb-4 text-gray-500"
        style="font-family: 'Roboto', sans-serif"
      >
        How to play piano
      </h1>
      <p class="text-gray-700" style="font-family: 'Roboto', sans-serif">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. In fugiat
        alias consequuntur repellat est neque beatae aspernatur nemo voluptas,
        officia quam eos? Ut tempora a officiis voluptate velit fugiat tenetur
        possimus consequatur excepturi, nam et labore dicta ipsum nulla cum
        quaerat natus error quam voluptates aut recusandae sint earum suscipit.
        Ea dolor aliquam maiores eius ipsum esse, aspernatur, tempora sit nihil
        quod, dignissimos natus odit et velit id provident recusandae?
      </p>
    </div>
    <i
      @click="isClick = !isClick"
      class="fa-solid fa-circle-info fixed bottom-0 right-0 fa-2x m-2 cursor-pointer text-gray-500 hover:text-gray-700"
    ></i>
    <!-- Note press showing -->
    <div
      :class="isClick ? 'hidden' : ''"
      class="flex justify-center text-center"
      style="margin-top: 5rem"
    >
      <div class="w-1/6 bg-white bg-opacity-10 mx-auto p-5">
        <span class="note">
          {{ theKey }}
        </span>
      </div>
    </div>

    <!-- Metro-->
    <div>
      <button
        @click="toggleMetronome"
        class="fixed bottom-0 right-10 p-2 bg-slate-500 text-white rounded-full cursor-pointer hover:bg-slate-700"
      >
        {{ isButtonClickSoundPlaying ? "Stop Metronome" : "Start Metronome" }}
      </button>
    </div>

    <!-- Piano Section -->
    <div
      :class="isClick ? 'hidden' : ''"
      class="flex justify-center absolute top-56"
    >
      <div class="w-3/6">
        <div
          v-for="note in pianoKeys"
          :key="note"
          @mousedown="playSound(note)"
          @mouseup="stopSound"
          @click="checkKey(note)"
          :style="{ backgroundColor: getNoteColor(note) }"
          class="piano-key mt-4"
        >
          {{ note }}
        </div>
      </div>
    </div>
    <!-- piano noey jaaa-->
    <div id="piano" class="flex justify-center">
      <div
        v-for="(note, index) in notes"
        :key="index"
        :class="{ 'piano-key': true, 'black-key': isBlackKey(note) }"
        @click="playSound(note)"
      >
        {{ note }}
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.piano-key {
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
.note {
  font-family: "Protest Riot", sans-serif;
  color: #ffff;
}

.piano-key:active {
  background-color: #ddd;
  border: 2px solid red;
}
</style>
