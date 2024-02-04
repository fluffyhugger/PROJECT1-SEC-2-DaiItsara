<script setup>
import { ref } from 'vue'
const isDark = ref(false)
const isClick = ref(false)
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
  },
}
</script>
<template>
  <div class="bg-sand-shore w-full h-screen bg-cover">
    <!-- <div :class="isDark ? 'bg-white' : 'bg-slate-600'" class="w-full h-screen"> -->
    <div class="flex justify-center">
      <!--bg-gradient-to-b from-gray-400 to-white-500 -->
      <img
        src="./assets/font2.png"
        alt=""
        class="mt-4 ml-5"
        style="width: 150px"
      />
      <!-- <div class="flex-grow"></div>
    <input
      @click="isDark = !isDark"
      type="checkbox"
      class="toggle h-8 mt-4 mr-3"
      checked
    /> -->
    </div>
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
    <div class="flex justify-center absolute top-96">
      <div class="w-3/6">
        <div
          v-for="note in pianoKeys"
          :key="note"
          @mousedown="playSound(note)"
          @mouseup="stopSound"
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
