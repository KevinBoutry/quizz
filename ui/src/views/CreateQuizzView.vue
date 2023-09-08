<template>
  <HeaderPanel />
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
          :maxFileSize="10000000"
          @select="imagePreview"
        />
      </div>
      <CategoryPanel />
    </div>
    <div
      class="preview"
      :style="`background-image : url('${PreviewQuizz.thumbnail}' )`"
    >
      {{ PreviewQuizz.name }}
    </div>
    <Button label="PREVIEW" class="preview-button" @click="createPreview" />
  </div>
  <FooterPanel />
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

import HeaderPanel from '@/components/HeaderPanel.vue';
import FooterPanel from '@/components/FooterPanel.vue';
import CategoryPanel from '@/components/CategoryPanel.vue';

import { composable } from '@/state/composable';
import { theme } from '@/state/theme';
import router from '@/router/index.ts';
import { onMounted } from 'vue';

const { PreviewQuizz } = composable();
const { Theme } = theme();

const imagePreview = (event: any) => {
  PreviewQuizz.value.thumbnail = event.files[0].objectURL;
};

function createPreview() {
  router.push('/preview');
}

onMounted(() => {
  console.log(PreviewQuizz.value);
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
    width: 400px;
    height: 250px;
    background-color: black;
    color: white;
    text-align: center;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .preview-button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    width: 10vw;
    height: 5vh;
  }
}
</style>
