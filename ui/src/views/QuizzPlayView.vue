<template>
  <div class="preview" v-if="quizz">
    <h1 class="quizz-title">{{ quizz.name }}</h1>
    <h3 class="quizz-theme">{{ quizz.theme }}</h3>
    <div class="quizz-description">{{ quizz.description }}</div>
    <div class="input-timer">
      <InputText
        class="text-input"
        placeholder="Type your answers here"
        :disabled="!gameStarted || gameEnded"
        v-model="input"
      />
      <div class="quizz-timer">
        {{ minutes }} : <span v-if="seconds < 10">0</span>{{ seconds }}
      </div>
    </div>
    <div class="button-score">
      <Button label="START" @click="startGame" :disabled="gameStarted" />
      <div class="score">{{ currentScore }} / {{ quizz.maxScore }}</div>
      <Button
        label="FORFEIT"
        severity="danger"
        @click="endGame"
        :disabled="!gameStarted"
      />
    </div>
    <div class="quizz-container">
      <div
        class="category-container"
        v-for="(category, index) in quizz.categories"
        :key="category"
      >
        <div>
          <div class="category-title">
            {{ category.catName }}
          </div>
          <div class="answer" v-for="item in category.items" :key="item">
            <span
              v-if="
                item ===
                foundItems[index].items.find((current) => current === item)
              "
              >{{ item }}</span
            >
            <Skeleton v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
  <GameEndPanel
    v-if="gameEnded"
    :score="currentScore"
    :maxScore="quizz.maxScore"
    :time="timePlayed"
    :win="win"
  />
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import FuzzySet from 'fuzzyset.js';
import debounce from 'lodash.debounce';

import GameEndPanel from '@/components/GameEndPanel.vue';
import { QuizzService } from '@/services/QuizzService.ts';
import { onMounted, ref, watch } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const quizz = ref();

const currentScore = ref(0);
const timePlayed = ref(0);

const minutes = ref();
const seconds = ref();

const gameStarted = ref(false);
const gameEnded = ref(false);
const win = ref(false);
const input = ref();

const foundItems = ref([]);
const itemList = ref([]);
let fs: any;

const quizzService: QuizzService = new QuizzService();

function startGame() {
  gameStarted.value = true;
  const intervalID = setInterval(() => {
    if (currentScore.value === quizz.value.maxScore) {
      win.value = true;
      endGame();
    }
    if (seconds.value != 0) {
      seconds.value--;
      timePlayed.value++;
    }
    if (minutes.value != 0 && seconds.value === 0) {
      minutes.value--;
      seconds.value = 59;
      timePlayed.value++;
    }
    if (minutes.value === 0 && seconds.value === 0) {
      clearInterval(intervalID);
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameEnded.value = true;
  minutes.value = 0;
  seconds.value = 0;
}

watch(
  input,
  debounce(() => {
    const found = fs.get(input.value, undefined, 0.8);
    if (found) {
      quizz.value.categories.forEach((cat, index) => {
        const foundCat = cat.items.find(
          (item) => item.toLowerCase() === found[0][1].toLowerCase()
        );
        if (foundCat) {
          if (!foundItems.value[index].items.includes(found[0][1])) {
            foundItems.value[index].items.push(found[0][1]);
            currentScore.value++;
            input.value = '';
          }
        }
      });
    }
  }, 300)
);

onMounted(async () => {
  quizz.value = await quizzService.getById(route.params.id);
  quizz.value.categories.forEach((cat) => {
    foundItems.value.push({ category: cat.catName, items: [] });
    itemList.value = itemList.value.concat(cat.items);
  });
  fs = FuzzySet(itemList.value);
  minutes.value =
    Math.floor(quizz.value.timer / 60) > 0
      ? Math.floor(quizz.value.timer / 60)
      : '00';
  seconds.value = quizz.value.timer % 60;
});
</script>

<style lang="scss" scoped>
.preview {
  height: 90%;
  background-color: #424b54;
  color: white;

  .quizz-title {
    text-align: center;
    font-size: 3rem;
  }

  .quizz-theme {
    text-align: center;
    font-size: 1.5rem;
    color: #e22c2c;
  }

  .quizz-description {
    text-align: center;
  }

  .input-timer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    .text-input {
      width: 60%;
      margin-right: 20px;
    }

    .quizz-timer {
      font-size: 3rem;
    }
  }

  .button-score {
    display: flex;
    justify-content: center;
    align-items: center;

    .score {
      font-size: 3rem;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .quizz-container {
    display: flex;
    justify-content: space-around;
    padding-top: 50px;
    z-index: 2;

    .category-container {
      position: relative;
      width: 25%;
      height: fit-content;
      max-width: 200px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      background-color: white;

      .category-title {
        color: red;
        text-align: center;
        font-size: 1.3rem;
        font-weight: bold;
      }
    }
    .answer {
      color: grey;
      padding: 5px;
    }
  }
}
</style>
