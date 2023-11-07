<template>
  <div class="result-container">
    <div
      class="result"
      v-for="result in searchResult.data"
      :key="result"
      @click="goToQuizz(result.id)"
    >
      <div class="result-title">
        {{ result.name }}
      </div>
      <Rating
        class="result-rating"
        v-if="result.rating"
        v-model="result.rating"
        readonly
        :cancel="false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import debounce from 'lodash.debounce';
import { QuizzService } from '@/services/QuizzService';
import router from '@/router/index.ts';
import Rating from 'primevue/rating';

const props = defineProps(['searchText']);

const quizzService: QuizzService = new QuizzService();

const searchResult = ref({ data: [] });

function goToQuizz(id) {
  searchResult.value.data = [];
  router.push({ name: 'quizz', params: { id }, replace: true });
}

watch(
  props,
  debounce(async () => {
    searchResult.value = await quizzService.getAll({
      name: props.searchText,
      pageSize: 6,
    });
  }, 300),
  { deep: true }
);
</script>

<style lang="scss" scoped>
.result-container {
  position: absolute;
  top: 5vh;
  left: 50%;
  transform: translateX(-50%);
  width: 40vw;
  height: auto;
  background-color: white;
  border-radius: 5px;
  z-index: 3;

  .result {
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    &:hover {
      background-color: #dddddd;
    }
  }
}
</style>
