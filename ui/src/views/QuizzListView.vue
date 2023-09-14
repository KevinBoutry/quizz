<template>
  <div class="quizz-list-container">
    <div class="select-theme">
      <label for="theme">Theme :</label>
      <Dropdown
        v-model="selectedTheme"
        :options="Theme"
        optionLabel="name"
        placeholder="Select a Theme"
        class="w-full md:w-14rem"
        @change="loadQuizzList"
      />
    </div>
    <div class="quizz-list">
      <div v-for="quizz in quizzList" :key="quizz.id">
        <div
          class="quizz-box"
          :style="`background-image : url('${quizz.thumbnail}' )`"
          @click="goToQuizz(quizz.id)"
        >
          {{ quizz.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown';
import { theme } from '@/state/theme';
import router from '@/router/index.ts';

import { QuizzService } from '@/services/QuizzService.ts';

import { ref } from 'vue';
const { Theme } = theme();

const quizzService: QuizzService = new QuizzService();

const selectedTheme = ref();
const quizzList = ref();

async function loadQuizzList() {
  console.log(selectedTheme.value.name);
  quizzList.value = await quizzService.getByTheme(selectedTheme.value.name);
  console.log(quizzList.value);
}

function goToQuizz(id) {
  router.push(`/quizz/${id}`);
}
</script>

<style lang="scss" scoped>
.quizz-list-container {
  width: 100vw;
  height: 90vh;
  display: flex;
  background-color: #424b54;
  flex-direction: column;
  align-items: center;

  .select-theme {
    color: white;
    margin-top: 10px;
  }
  .quizz-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .quizz-box {
      width: 20vw;
      height: 25vh;
      color: black;
      background-color: white;
      border-radius: 5px;
      border: black solid 2px;
      text-align: center;
      margin: 10px;
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>