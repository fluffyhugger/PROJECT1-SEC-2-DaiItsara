<script setup>
import { ref } from 'vue'
const isDark = ref(false)
const isClick = ref(false)
</script>

<template>
  <div :class="isDark ? 'bg-white' : 'bg-slate-600'" class="w-full h-screen">
    <div class="flex bg-gradient-to-b from-gray-400 to-white-500">
      <img
        src="./assets/Logo.png"
        alt=""
        class="w-16 h-14 mt-1 rotate-60 ml-5"
      />
      <img src="./assets/font.png" alt="" class="w-16 h-10 mt-4 ml-5" />
      <div class="flex-grow"></div>
      <input
        @click="isDark = !isDark"
        type="checkbox"
        class="toggle h-8 mt-4 mr-3"
        checked
      />
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
  </div>
</template>

<style scoped></style>
