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
    <div
      class="quizz-container-categories"
      v-if="PreviewQuizz.type.name === 'List with categories'"
    >
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
    <div
      class="quizz-container-ranking"
      v-if="PreviewQuizz.type.name === 'Ranking'"
    >
      <div v-for="category in PreviewQuizz.categories" :key="category.id">
        <div class="category-container">
          <div class="category-title">
            {{ category.name }}
          </div>
          <div class="answer" v-for="item in category.items" :key="item">
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-buttons">
      <Button label="BACK" class="bottom-button" @click="backToCreate" />
      <Button label="SAVE" class="bottom-button" @click="saveQuizz" />
    </div>
  </div>
  <div class="quizz-success" v-if="quizzCreated">
    <span class="quizz-success-text">Quizz created successfully !</span>
    <div class="quizz-link">
      <span>URL to share : </span>
      <input type="text" v-model="quizzLink" class="link-input" readonly />
    </div>
    <div class="close-button">
      <Button label="CLOSE" @click="closePanel" />
    </div>
  </div>
</template>

<script lang="ts" setup>
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
const quizzCreated = ref(false);
const quizzLink = ref('');

function backToCreate() {
  router.push('/create');
}

function closePanel() {
  router.push('/home');
}

function createItemList() {
  PreviewQuizz.value.categories.forEach((cat) => {
    cat.items.forEach((item) => {
      itemList.value.push({ category: cat.name, name: item });
    });
  });
}

async function saveQuizz() {
  createItemList();
  const res = await quizzService
    .createQuizz({
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
    })
    .catch((error) => {
      console.log('error');
    });
  if (res) {
    quizzCreated.value = true;
    quizzLink.value = `http://localhost:5173/quizz/${res.id}`;
  }
}
</script>

<style lang="scss" scoped>
.preview {
  height: 90%;
  background-color: #424b54;
  color: white;
  overflow-x: hidden;

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

      .items {
        color: black;
        margin-left: 5px;
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
        color: black;

        span {
          margin-left: 10px;
        }
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

.quizz-success {
  position: absolute;
  z-index: 5;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 60vh;
  background-color: #c5baaf;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  .quizz-success-text {
    font-size: 4rem;
    position: relative;
    text-align: center;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(106, 161, 51);
  }
  .quizz-link {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);

    .link-input {
      width: 200px;
    }
  }
  .close-button {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
