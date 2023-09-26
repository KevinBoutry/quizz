<template>
  <div class="preview" v-if="quizz">
    <h1 class="quizz-title">{{ quizz.name }}</h1>
    <h3 class="quizz-theme">{{ quizz.theme }}</h3>
    <div class="quizz-description">{{ quizz.description }}</div>
    <div class="input-timer">
      <InputText
        class="text-input"
        placeholder="Type your answers here"
        :disabled="!gameStarted"
        v-model="input"
      />
      <div class="quizz-timer">
        {{ minutes }} : <span v-if="seconds < 10">0</span>{{ seconds }}
      </div>
    </div>
    <Button
      label="START"
      class="start-button"
      @click="startGame"
      :disabled="gameStarted"
    />
    <div class="quizz-container">
      <div
        class="category-container"
        v-for="category in foundItems"
        :key="category"
      >
        <div>
          <div class="category-title">
            {{ category.category }}
          </div>
          <div class="answer" v-for="items in category.items" :key="items">
            {{ items }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { QuizzService } from '@/services/QuizzService.ts';
import { onMounted, ref, watch } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const quizz = ref();

const minutes = ref();
const seconds = ref();

const gameStarted = ref(false);
const input = ref();

const foundItems = ref([]);

const quizzService: QuizzService = new QuizzService();

function startGame() {
  gameStarted.value = true;
  if (minutes.value != 0 && seconds.value != 0) {
    setInterval(() => {
      if (seconds.value != 0) {
        seconds.value--;
      }
      if (minutes.value != 0 && seconds.value === 0) {
        minutes.value--;
        seconds.value = 59;
      }
    }, 1000);
  }
}

watch(input, () => {
  quizz.value.categories.forEach((cat) => {
    const found = cat.items.find(
      (item) => item.toLowerCase() === input.value.toLowerCase()
    );
    if (found) {
      const idx = foundItems.value.findIndex(
        (ctg) => ctg.category === cat.catName
      );
      if (!foundItems.value[idx].items.includes(found)) {
        foundItems.value[idx].items.push(found);
      }
    }
  });
  console.log(foundItems.value);
});

onMounted(async () => {
  quizz.value = await quizzService.getById(route.params.id);
  console.log(quizz.value);
  quizz.value.categories.forEach((cat) => {
    foundItems.value.push({ category: cat.catName, items: [] });
  });
  minutes.value =
    Math.floor(quizz.value.timer / 60) > 0
      ? Math.floor(quizz.value.timer / 60)
      : '00';
  seconds.value =
    quizz.value.timer % 60 > 9
      ? quizz.value.timer % 60
      : '0' + [quizz.value.timer % 60];
});
</script>

<style lang="scss">
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

  .start-button {
    left: 50%;
    transform: translateX(-50%);
  }
  .quizz-container {
    display: flex;
    justify-content: space-around;
    padding-top: 50px;

    .category-container {
      width: 25%;
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

      .answer {
        color: grey;
        padding: 5px;
      }
    }
  }

  .bottom-buttons {
    position: absolute;
    width: 100%;
    bottom: 5%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
