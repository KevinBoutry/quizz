<template>
  <div class="quizz-list-container">
    <div class="select-theme">
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
      <div v-for="quizz in quizzList.data" :key="quizz.id">
        <QuizzCard :quizz="quizz" />
      </div>
    </div>
    <div class="nav-button">
      <span class="more-button" v-if="pageNumber > 1" @click="goToPreviousPage"
        >Previous Page</span
      >
      <span
        class="more-button"
        @click="goToNextPage"
        v-if="pageNumber != quizzList.maxPage"
        >Next Page</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown';

import QuizzCard from '@/components/QuizzCard.vue';
import { theme } from '@/state/theme';

import { QuizzService } from '@/services/QuizzService.ts';

import { ref, onMounted } from 'vue';
const { Theme } = theme();

const quizzService: QuizzService = new QuizzService();

const selectedTheme = ref();
const quizzList = ref({ maxPage: 1, data: [] });
const pageNumber = ref(1);

async function loadQuizzList() {
  pageNumber.value = 1;
  quizzList.value = await quizzService.getAll({
    pageSize: 12,
    theme: selectedTheme.value.name,
  });
}

async function goToNextPage() {
  pageNumber.value++;
  quizzList.value = await quizzService.getAll({
    pageSize: 12,
    page: pageNumber.value,
  });
}

async function goToPreviousPage() {
  pageNumber.value--;
  quizzList.value = await quizzService.getAll({
    pageSize: 12,
    page: pageNumber.value,
  });
}

onMounted(async () => {
  quizzList.value = await quizzService.getAll({ pageSize: 12 });
});
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
  .nav-button {
    position: absolute;
    bottom: 10px;
    display: flex;

    .more-button {
      color: white;
      cursor: pointer;
      margin-right: 25px;
      margin-left: 25px;
    }
  }
}
</style>

<style lang="scss">
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
  color: gold;
}
</style>
