<template>
  <HeaderPanel />
  <div class="container">
    <div class="form">
      <div class="inputcontainer">
        <label for="quizzName">Quizz Name :</label>
        <InputText type="text" v-model="quizzName" class="input" />
      </div>
      <div class="inputcontainer textareainput">
        <label for="description">Description :</label>
        <Textarea v-model="description" class="input" />
      </div>
      <div class="inputcontainer">
        <label for="timer">Time :</label>
        <InputText type="text" v-model="time" class="input timeinput" />
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
      <ItemList />
    </div>
    <div class="preview" :style="`background-image : url('${previewImage}' )`">
      {{ quizzName }}
    </div>
    <Button label="PREVIEW" class="preview-button" />
  </div>
  <FooterPanel />
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';

import HeaderPanel from '@/components/HeaderPanel.vue';
import FooterPanel from '@/components/FooterPanel.vue';

import { ref } from 'vue';
import ItemList from '@/components/itemList.vue';

const quizzName = ref();
const description = ref();
const time = ref();
const previewImage = ref();
const itemList = ref();

const imagePreview = (event: any) => {
  previewImage.value = event.files[0].objectURL;
};
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

      .addcat-button {
        margin-left: 10px;
      }

      .delete-button {
        margin-left: 10px;
      }
    }

    .addrow-button {
      position: relative;
      left: 120px;
      margin: 10px;
    }
  }
  .preview {
    position: absolute;
    right: 150px;
    top: 150px;
    width: 400px;
    height: 250px;
    background-color: white;
    color: black;
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
