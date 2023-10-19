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
          :style="`background-image : url('${imageDataUrl(
            quizz.thumbnail.data
          )}' ); color : #${quizz.textColor}`"
          @click="goToQuizz(quizz.id)"
        >
          {{ quizz.name }}
          <Rating
            class="quizz-rating"
            v-if="quizz.rating"
            v-model="quizz.rating"
            readonly
            :cancel="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown';
import Rating from 'primevue/rating';
import { theme } from '@/state/theme';
import router from '@/router/index.ts';

import { QuizzService } from '@/services/QuizzService.ts';

import { ref } from 'vue';
const { Theme } = theme();

const quizzService: QuizzService = new QuizzService();

const selectedTheme = ref();
const quizzList = ref();

async function loadQuizzList() {
  quizzList.value = await quizzService.getByTheme(selectedTheme.value.name);
  console.log(quizzList.value);
}

function imageDataUrl(data: any) {
  // Create a Blob from the buffer data
  const blob = new Blob([new Uint8Array(data)], {
    type: 'image/jpeg', // Replace with the appropriate image type (e.g., 'image/png', 'image/jpeg')
  });

  // Create a data URL from the Blob
  return URL.createObjectURL(blob);
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

      .quizz-rating {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>

<style lang="scss">
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
  color: gold;
}
</style>
