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
      <CategoryPanel />
    </div>
    <div
      class="preview"
      :style="`color: #${PreviewQuizz.textColor}; background-image : url('${thumbnail}');`"
    >
      <div class="preview-text">
        {{ PreviewQuizz.name }}
      </div>
    </div>
    <div class="text-color">
      <span class="text-color-text">Text color :</span>
      <ColorPicker v-model="PreviewQuizz.textColor" />
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

import CategoryPanel from '@/components/CategoryPanel.vue';

import { composable } from '@/state/composable';
import { theme } from '@/state/theme';
import router from '@/router/index.ts';
import { ref } from 'vue';

const { PreviewQuizz } = composable();
const { Theme } = theme();

const thumbnail = ref();

const imagePreview = async (event: any) => {
  thumbnail.value = event.files[0].objectURL;
  const blob = await (await fetch(event.files[0].objectURL)).blob();
  PreviewQuizz.value.thumbnail = blob;
};

function createPreview() {
  console.log(PreviewQuizz.value);
  router.push('/preview');
}
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
  .text-color {
    position: absolute;
    top: 280px;
    right: 300px;
    font-size: 1rem;

    .text-color-text {
      margin-right: 5px;
    }
  }

  .preview-button {
    position: absolute;
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
