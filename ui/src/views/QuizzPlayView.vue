<template>
  <div class="preview" v-if="quizz">
    <h1 class="quizz-title">{{ quizz.name }}</h1>
    <h3 class="quizz-theme">{{ quizz.theme }}</h3>
    <div class="quizz-description">{{ quizz.description }}</div>
    <div class="input-timer">
      <InputText
        class="text-input"
        placeholder="Type your answers here"
        :disabled="!gameStarted || endGamePanelStatus"
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
    <div class="quizz-container-ranking" v-if="quizz.type === 'Ranking'">
      <div v-for="(category, index) in quizz.categories" :key="category">
        <div class="category-container">
          <div class="category-title">
            {{ category.catName }}
          </div>
          <div class="answer" v-for="item in category.items" :key="item">
            <span
              class="answer-text"
              v-if="
                item ===
                foundItems[index].items.find((current) => current === item)
              "
              >{{ item }}</span
            >
            <span v-else-if="gameEnded" class="answer-not-found">{{
              item
            }}</span>
            <Skeleton v-else />
          </div>
        </div>
      </div>
    </div>
    <div
      class="quizz-container-categories"
      v-if="quizz.type === 'List with categories'"
    >
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
            <span v-else-if="gameEnded" class="answer-not-found">{{
              item
            }}</span>
            <Skeleton v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
  <GameEndPanel
    v-if="endGamePanelStatus && result"
    :score="currentScore"
    :maxScore="quizz.maxScore"
    :time="timePlayed"
    :win="win"
    :quizz="quizz.id"
    :user="userProfile.userid"
    :id="result.id"
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
import { user } from '@/state/user';
import { composable } from '@/state/composable';

const route = useRoute();
const { userProfile } = user();
const { endGamePanelStatus } = composable();

const quizz = ref();
const result = ref();
const pastScore = ref();

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
let intervalID: any;

const quizzService: QuizzService = new QuizzService();

function startGame() {
  gameStarted.value = true;
  intervalID = setInterval(() => {
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

async function endGame() {
  gameEnded.value = true;
  endGamePanelStatus.value = true;
  clearInterval(intervalID);
  if (pastScore.value) {
    if (
      pastScore.value.score < currentScore.value ||
      (pastScore.value.score === pastScore.value.maxScore &&
        timePlayed.value < pastScore.value.time)
    ) {
      await quizzService.updateScore({
        id: pastScore.value.id,
        score: currentScore.value,
        time: timePlayed.value,
      });
    }
    result.value = {
      score: currentScore.value,
      maxScore: quizz.value.maxScore,
      time: timePlayed.value,
      quizz: quizz.value.id,
      user: userProfile.value.userid,
    };
  } else {
    result.value = await quizzService.publishScore({
      score: currentScore.value,
      maxScore: quizz.value.maxScore,
      time: timePlayed.value,
      quizz: quizz.value.id,
      user: userProfile.value.userid,
    });
  }
}

async function getQuizz() {
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
  pastScore.value = await quizzService.alreadyPlayed({
    quizz: quizz.value.id,
    user: userProfile.value.userid,
  });
}

watch(
  input,
  debounce(() => {
    const found = fs.get(input.value.trim(), undefined, 0.8);
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

watch(route, async () => {
  await getQuizz();
});

onMounted(async () => {
  await getQuizz();
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
  .quizz-container-categories {
    display: flex;
    justify-content: space-around;
    padding-top: 50px;
    z-index: 2;

    .category-container {
      width: 20vw;
      max-width: 250px;
      background-color: antiquewhite;
      border-radius: 5px;
      margin-top: 10px;
      padding-bottom: 10px;

      .category-title {
        color: black;
        font-size: 1.3rem;
        text-align: center;
        font-weight: bold;
        width: fit-content;
        min-width: 100px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 5px;
        border: black solid 1px;
        padding: 5px;
        top: -20px;
        background-color: #c5baaf;
      }

      .items-container {
        display: flex;
        justify-content: center;
      }
      .item-list {
        display: flex;
        align-items: center;
        color: black;
        padding-left: 10px;
        justify-content: space-between;
      }
      .answer {
        color: black;
        padding: 5px;
      }

      .answer-not-found {
        color: red;
      }
    }
  }
  .quizz-container-ranking {
    margin: 10px;
    display: flex;
    width: 100vw;
    align-items: center;
    flex-direction: column;

    .category-container {
      display: flex;
      width: 80vw;
      align-items: center;
      justify-content: center;
      margin: 5px;

      .category-title {
        text-align: center;
        width: 5vw;
        border-radius: 5px;
        border: 1px solid black;
        background-color: #c5baaf;
        color: black;
      }
      .answer {
        width: 75vw;
        margin-left: 15px;
        margin-right: 15px;
        background-color: white;
        border-radius: 5px;

        .answer-not-found {
          color: red;
        }
        .answer-text {
          margin-left: 10px;
          color: black;
        }
      }
    }
  }
}
</style>
