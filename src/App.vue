<script setup>
import { ref } from 'vue'
const isClick = ref(false)
const theKey = ref([])
const checkKey = function (key) {
  theKey.value += key
}
</script>
<script>
export default {
  data() {
    return {
      audioContext: null,
      oscillator: null,
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
        'B'
      ],
      isButtonClickSoundPlaying: false,
      buttonClickAudio: new Audio('/src/assets/youtube_ymJIXzvDvj4_audio.mp3')
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
    }
  }
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
    {{ theKey }}
    <div class="flex justify-center absolute top-96">
      <div class="w-3/6">
        <div
          v-for="note in pianoKeys"
          :key="note"
          @mousedown="playSound(note)"
          @mouseup="stopSound"
          @click="checkKey(note)"
          class="piano-key mt-5"
        >
          {{ note }}
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.piano-key {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  display: inline-block;
  text-align: center;
  line-height: 150px;
  cursor: pointer;
  margin-right: 20px;
  user-select: none;
}

.piano-key:active {
  background-color: #ddd;
}
</style>
