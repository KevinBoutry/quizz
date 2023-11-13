<template>
  <div class="end-container">
    <div class="score">
      <div v-if="win">You won in {{ props.time }} seconds</div>
      <div v-else>Final score : {{ props.score }}/{{ props.maxScore }}</div>
    </div>
    <div class="rating">
      <div>Rate this quizz :</div>
      <Rating v-model="stars" :cancel="false" @click="showStars" />
    </div>
    <Button class="close-button" label="CLOSE" @click="closePanel" />
  </div>
  <div class="outside" @click="closePanel"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Rating from 'primevue/rating';
import Button from 'primevue/button';

import { composable } from '@/state/composable';
import { QuizzService } from '@/services/QuizzService.ts';

const { endGamePanelStatus } = composable();
const quizzService: QuizzService = new QuizzService();

const stars = ref();

const props = defineProps([
  'score',
  'maxScore',
  'time',
  'win',
  'user',
  'quizz',
  'id',
]);

function closePanel() {
  endGamePanelStatus.value = false;
}

async function showStars() {
  await quizzService.updateStars({
    user: props.user,
    quizz: props.quizz,
    stars: stars.value,
    id: props.id,
  });
}
</script>

<style lang="scss" scoped>
.end-container {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 50%;
  height: 50vh;
  width: 50vw;
  background-color: #c5baaf;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .score {
    font-size: 3rem;

    .rating {
      font-size: 1.5rem;
      text-align: center;
    }
  }
}

.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(2px);
}
</style>
