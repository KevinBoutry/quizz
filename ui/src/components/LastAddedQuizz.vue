<template>
  <div class="container">
    <h1 class="title">Most Recent</h1>
    <Carousel
      :value="carouselItems"
      :numVisible="3"
      :numScroll="1"
      circular
      v-if="carouselItems"
    >
      <template #item="slotProps">
        <QuizzCard :quizz="slotProps.data" />
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import Carousel from 'primevue/carousel';

import QuizzCard from './QuizzCard.vue';

import { onMounted, ref } from 'vue';
import { QuizzService } from '@/services/QuizzService';

const quizzService: QuizzService = new QuizzService();

const carouselItems = ref([]);

onMounted(async () => {
  const quizzes = await quizzService.getByRecent();
  quizzes.forEach((quizz, index) => {
    carouselItems.value.push({ ...quizz, index });
  });
});
</script>

<style lang="css" scoped>
.container {
  height: 35vh;
  width: 100vw;
  background-color: #424b54;
  overflow-y: hidden;

  .title {
    text-align: center;
  }
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
</style>

<style lang="scss">
.p-carousel-item {
  display: flex;
  justify-content: center;
}
</style>
