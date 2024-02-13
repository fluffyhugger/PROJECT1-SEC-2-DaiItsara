<script setup>
import { ref } from 'vue'
const isClick = ref(false)
const theKey = ref([])
const checkKey = function (key) {
  if (theKey.value.length < 18) {
    theKey.value += key
  } else {
    theKey.value = []
  }
}
const getNoteColor = (note) => {
  switch (note) {
    case 'C':
      return '#F9EFDB'
    case 'C#':
      return '#EBD9B4'
    case 'D':
      return '#9DBC98'
    case 'D#':
      return '#638889'
    case 'E':
      return '#D9EDBF'
    case 'F':
      return '#FFB996'
    case 'F#':
      return '#FFCF81'
    case 'G':
      return '#FDFFAB'
    case 'G#':
      return '#FDF7E4'
    case 'A':
      return '#FAEED1'
    case 'A#':
      return '#DED0B6'
    case 'B':
      return '#BBAB8C'
  }
}
const pianoKey = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
  'C2',
  'C#2',
  'D2',
  'D#2',
  'E2',
  'F2',
  'F#2',
  'G2',
  'G#2',
  'A2',
  'A#2',
  'B2',
]
</script>
<script>
export default {
  data() {
    return {
      audioContext: null,
      oscillator: null,
      pianoKeys: [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B',
      ],
      isButtonClickSoundPlaying: false,
      buttonClickAudio: new Audio('/src/assets/youtube_ymJIXzvDvj4_audio.mp3'),
    }
  },
  methods: {
    playSound(note) {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      this.oscillator = this.audioContext.createOscillator()
      this.oscillator.type = 'sine'
      this.oscillator.frequency.setValueAtTime(
        this.noteToFrequency(note),
        this.audioContext.currentTime
      )
      this.oscillator.connect(this.audioContext.destination)
      this.oscillator.start()
    },
    stopSound() {
      if (this.oscillator) {
        this.oscillator.stop(this.audioContext.currentTime)
        this.oscillator.disconnect()
      }
    },
    noteToFrequency(note) {
      const A4Frequency = 440 // Frequency of A4
      const noteDistance =
        this.pianoKeys.indexOf(note) - this.pianoKeys.indexOf('A')
      return A4Frequency * Math.pow(2, noteDistance / 12)
    },
    toggleMetronome() {
      if (this.isButtonClickSoundPlaying) {
        // If the sound is currently playing, stop it
        this.buttonClickAudio.pause()
        this.isButtonClickSoundPlaying = false
      } else {
        // If the sound is not playing, start it
        this.buttonClickAudio.currentTime = 0 // Reset the audio to the beginning
        this.buttonClickAudio.play()
        this.isButtonClickSoundPlaying = true
      }
    },
  },
}
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
        {{ isButtonClickSoundPlaying ? 'Stop Metronome' : 'Start Metronome' }}
      </button>
    </div>

    <!-- Piano Section -->
    <div
      :class="isClick ? 'hidden' : ''"
      class="flex justify-center absolute top-56"
    >
      <div class="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div class="flex flex-wrap justify-center">
          <div
            v-for="trap in pianoKeys"
            :key="trap"
            @mousedown="playSound(trap)"
            @mouseup="stopSound"
            @click="checkKey(trap)"
            :style="{ backgroundColor: getNoteColor(trap) }"
            class="trap-key mb-4 md:w-1/6 lg:w-1/6 xl:w-1/6"
          >
            {{ trap }}
          </div>
        </div>
      </div>
    </div>
    <!-- Piano Section -->
    <div class="absolute bottom-24 left-0 w-full text-center">
      <div
        @click="console.log(piano)"
        v-for="piano in pianoKey"
        :key="piano"
        :class="{ 'piano-key': true, 'piano-key-black': piano.includes('#') }"
      >
        {{ piano }}
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped>
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
.note {
  font-family: 'Protest Riot', sans-serif;
  color: #ffff;
}

.trap-key:active {
  background-color: #ddd;
  border: 2px solid red;
}

.piano-key {
  width: 50px;
  height: 150px;
  display: inline-block;
  text-align: center;
  line-height: 270px;
  cursor: pointer;
  user-select: none;
  background-color: #ffff;
  color: black;
  font-size: 12px;
  border: 1px solid #000;
  border-radius: 8px;
  font-family: 'Protest Riot', sans-serif;
}
.piano-key:active {
  border: 2px solid black;
}
.piano-key-black {
  width: 28px;
  z-index: 1;
  line-height: 20px;
  margin: 0 -10px 0 -10px;
  height: 80px;
  border: 1px solid #000;
  border-radius: 0 0 5px 5px;
  background-color: #363636;
  position: absolute;
  color: #ffff;
}
</style>
