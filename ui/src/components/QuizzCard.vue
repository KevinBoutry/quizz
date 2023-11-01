<template>
  <div
    class="quizz-box"
    :style="[
      quizz.thumbnail && quizz.thumbnail.data
        ? `background-image : url('${imageDataUrl(quizz.thumbnail.data)}');`
        : `background-color : #${quizz.backgroundColor};`,
    ]"
    @click="goToQuizz(quizz.id)"
  >
    <span
      class="quizz-name"
      v-if="quizz.showTitle"
      :style="`color : #${quizz.textColor}`"
      >{{ quizz.name }}</span
    >
    <Rating
      class="quizz-rating"
      v-if="quizz.rating"
      v-model="rating"
      readonly
      :cancel="false"
    />
  </div>
</template>

<script lang="ts" setup>
import Rating from 'primevue/rating';
import router from '@/router/index.ts';
import { ref, onMounted } from 'vue';

const rating = ref();
const props = defineProps(['quizz']);

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

onMounted(() => {
  rating.value = props.quizz.rating;
});
</script>

<style lang="scss" scoped>
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
  cursor: pointer;

  .quizz-rating {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
