<template>
  <div class="container">
    <Carousel
      :value="carousel"
      :numVisible="3"
      :numScroll="1"
      circular
      :autoplayInterval="3000"
    >
      <template #item="carouselItems">
        <div class="quizz-list">
          <div
            class="quizz-box"
            :style="`background-image : url('${imageDataUrl(
              carouselItems.data.thumbnail.data
            )}' ); color : #${carouselItems.data.textColor}`"
          >
            {{ carouselItems.data.name }}
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import Carousel from 'primevue/carousel';

import { onMounted, ref } from 'vue';
import { QuizzService } from '@/services/QuizzService';

const quizzService: QuizzService = new QuizzService();

const carouselItems = ref([]);
const carousel = ref();

function imageDataUrl(data: any) {
  // Create a Blob from the buffer data
  const blob = new Blob([new Uint8Array(data)], {
    type: 'image/jpeg', // Replace with the appropriate image type (e.g., 'image/png', 'image/jpeg')
  });

  // Create a data URL from the Blob
  return URL.createObjectURL(blob);
}

onMounted(async () => {
  const quizzes = await quizzService.getByRecent();
  console.log(quizzes);
  quizzes.forEach((quizz) => {
    carouselItems.value.push({ data: quizz, index: quizz.id });
  });
  console.log(carouselItems.value);
});
</script>

<style lang="scss" scoped>
.container {
  height: 25vh;
  width: 100vw;
  background-color: #424b54;
}
</style>
