<template>
  <div class="container">
    <div class="form">
      <div class="inputcontainer">
        <label for="quizzName">Quizz Name :</label>
        <InputText type="text" v-model="PreviewQuizz.name" class="input" />
      </div>
      <div class="inputcontainer textareainput">
        <label for="description">Description :</label>
        <Textarea v-model="PreviewQuizz.description" class="input" />
      </div>
      <div class="inputcontainer">
        <label for="theme">Theme :</label>
        <Dropdown
          v-model="PreviewQuizz.theme"
          :options="Theme"
          optionLabel="name"
          placeholder="Select a Theme"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="inputcontainer">
        <label for="quizztype">Quizz type :</label>
        <Dropdown
          v-model="PreviewQuizz.type"
          :options="QuizzType"
          optionLabel="name"
          placeholder="Select a Type"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="inputcontainer">
        <label for="timer">Time :</label>
        <InputText
          type="text"
          v-model="PreviewQuizz.time"
          class="input timeinput"
        />
      </div>
      <div class="inputcontainer">
        <label for="vignette">Thumbnail :</label>
        <FileUpload
          mode="basic"
          accept="image/*"
          :maxFileSize="1000000"
          @select="imagePreview"
        />
      </div>
      <div class="inputcontainer">
        <label for="public">Public :</label>
        <Checkbox v-model="PreviewQuizz.public" :binary="true" />
      </div>
      <CategoryPanel v-if="PreviewQuizz.type.name === 'List with categories'" />
      <RankingPanel v-if="PreviewQuizz.type.name === 'Ranking'" />
    </div>
    <div class="preview">
      <h1 class="preview-title">Thumbnail Preview</h1>
      <div
        class="thumbnail-preview"
        :style="`color: #${PreviewQuizz.textColor}; background-color: #${PreviewQuizz.backgroundColor}; background-image : url('${thumbnail}');`"
      >
        <div class="preview-text" v-if="PreviewQuizz.showTitle">
          {{ PreviewQuizz.name }}
        </div>
      </div>
      <div class="preview-input-container">
        <div class="preview-input">
          <span class="text-color-text">Text color :</span>
          <ColorPicker v-model="PreviewQuizz.textColor" />
        </div>
        <div>
          <span class="text-color-text">Background color :</span>
          <ColorPicker v-model="PreviewQuizz.backgroundColor" />
        </div>
        <div>
          <span class="text-color-text">Show Title :</span>
          <Checkbox v-model="PreviewQuizz.showTitle" :binary="true" />
        </div>
      </div>
    </div>
    <Button label="PREVIEW" class="preview-button" @click="createPreview" />
  </div>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import ColorPicker from 'primevue/colorpicker';
import Checkbox from 'primevue/checkbox';

import CategoryPanel from '@/components/CategoryPanel.vue';
import RankingPanel from '@/components/RankingPanel.vue';

import { composable } from '@/state/composable';
import { theme } from '@/state/theme';
import { quizzType } from '@/state/quizzType';
import router from '@/router/index.ts';
import { ref, watch } from 'vue';

const { PreviewQuizz } = composable();
const { Theme } = theme();
const { QuizzType } = quizzType();

const thumbnail = ref();

const type = ref({ name: '' });

const imagePreview = async (event: any) => {
  thumbnail.value = event.files[0].objectURL;
  const blob = await (await fetch(event.files[0].objectURL)).blob();
  PreviewQuizz.value.thumbnail = blob;
};

function createPreview() {
  router.push('/preview');
}

watch(type, () => {
  console.log(type.value);
});
</script>

<style lang="scss">
.container {
  position: relative;
  height: 90vh;
  width: 100vw;
  background-color: #424b54;
  color: white;
  overflow-y: scroll;

  .form {
    padding: 10px;

    .inputcontainer {
      margin-top: 5px;
      display: flex;
      align-items: center;

      label {
        margin-right: 10px;
        position: relative;
        left: 0px;
        width: 120px;
        text-align: right;
      }

      .input {
        position: relative;
        width: 20vw;
      }

      .timeinput {
        width: 80px;
      }
    }
  }
  .preview {
    position: absolute;
    right: 150px;
    top: 15px;

    .preview-title {
      text-align: center;
    }

    .thumbnail-preview {
      width: 400px;
      height: 250px;
      background-color: black;
      text-align: center;
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      .preview-text {
        text-shadow: 2px 2px 2px black;
      }
    }
    .preview-input-container {
      text-align: center;

      .text-color-text {
        margin: 5px;
      }
    }
  }

  .preview-button {
    position: sticky;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    width: 10vw;
    height: 5vh;
  }

  .category-panel {
    margin-top: 50px;
  }
}
</style>
