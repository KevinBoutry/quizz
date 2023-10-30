<template>
  <div class="preview">
    <h1 class="quizz-title">{{ PreviewQuizz.name }}</h1>
    <h3 class="quizz-theme">{{ PreviewQuizz.theme.name }}</h3>
    <div class="quizz-description">{{ PreviewQuizz.description }}</div>
    <div class="input-timer">
      <InputText
        class="text-input"
        placeholder="Type your answers here"
        disabled
      />
      <div class="quizz-timer">{{ PreviewQuizz.time }}</div>
    </div>
    <Button label="START" class="start-button" disabled />
    <div class="quizz-container">
      <div
        class="category-container"
        v-for="category in PreviewQuizz.categories"
        :key="category.id"
      >
        <div class="category-title">
          {{ category.name }}
        </div>
        <div v-for="item in category.items" :key="item">
          <span class="items"> {{ item }}</span>
        </div>
      </div>
    </div>
    <div class="bottom-buttons">
      <Button label="BACK" class="bottom-button" @click="backToCreate" />
      <Button label="SAVE" class="bottom-button" @click="saveQuizz" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { composable } from '@/state/composable';
import { user } from '@/state/user';
import router from '@/router/index.ts';
import { QuizzService } from '@/services/QuizzService.ts';
import { ref } from 'vue';

const { PreviewQuizz } = composable();
const { userProfile } = user();

const quizzService: QuizzService = new QuizzService();

const itemList = ref([]);

function backToCreate() {
  router.push('/create');
}

function createItemList() {
  PreviewQuizz.value.categories.forEach((cat) => {
    cat.items.forEach((item) => {
      itemList.value.push({ category: cat.name, name: item });
    });
  });
  console.log(itemList.value);
}

async function saveQuizz() {
  createItemList();
  console.log(PreviewQuizz.value);
  const res = await quizzService.createQuizz({
    name: PreviewQuizz.value.name,
    timer: PreviewQuizz.value.time,
    theme: PreviewQuizz.value.theme.name,
    type: PreviewQuizz.value.type.name,
    description: PreviewQuizz.value.description,
    thumbnail: PreviewQuizz.value.thumbnail,
    items: itemList.value,
    user: userProfile.value.userid,
    textColor: PreviewQuizz.value.textColor,
    backgroundColor: PreviewQuizz.value.backgroundColor,
    showTitle: PreviewQuizz.value.showTitle,
    public: PreviewQuizz.value.public,
  });
}
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

      .items {
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
