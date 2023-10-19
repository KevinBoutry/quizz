<template>
  <div class="container">
    <h1 class="title">Most Played</h1>
    <Carousel
      :value="carouselItems"
      :numVisible="3"
      :numScroll="1"
      circular
      v-if="carouselItems"
    >
      <template #item="slotProps">
        <div
          class="quizz-box"
          :style="`background-image : url('${imageDataUrl(
            slotProps.data.thumbnail.data
          )}' ); color : #${slotProps.data.textColor}`"
          @click="goToQuizz(slotProps.data.id)"
        >
          <h1>{{ slotProps.data.name }}</h1>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import Carousel from 'primevue/carousel';

import { onMounted, ref } from 'vue';
import { QuizzService } from '@/services/QuizzService';
import router from '@/router/index.ts';

const quizzService: QuizzService = new QuizzService();

const carouselItems = ref([]);

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

onMounted(async () => {
  const quizzes = await quizzService.getTrending();
  quizzes.forEach((quizz, index) => {
    carouselItems.value.push({ ...quizz, index });
  });
});
</script>

<style lang="css" scoped>
.container {
  height: 35vh;
  width: 100vw;
  background-color: #ebcfb2;
  overflow-y: hidden;

  .title {
    text-align: center;
  }
}

.quizz-box {
  justify-self: center;
  width: 20vw;
  height: 25vh;
  color: black;
  background-color: white;
  border-radius: 5px;
  border: black solid 2px;
  text-align: center;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;

  h1 {
    font-size: 2rem;
  }
}
</style>
