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
      <div class="inputcontainer">
        <label for="categories">Categories :</label>
        <InputText type="text" v-model="category" />
        <Button label="Add" @click="addToCategories" class="addcat-button" />
      </div>
      <div class="category-list">
        <div
          v-for="cat in categoryList"
          class="category-list-items"
          :key="cat.id"
        >
          <div>{{ cat.name }}</div>
          <div class="deletecat" @click="deleteCategory(cat.name)">X</div>
        </div>
      </div>
      <div v-for="item in itemInputArray" :key="item.id">
        <ItemInput
          :item="item"
          :categories="categoryList"
          @deleteItem="deleteItem"
          @updateCat="updateCat"
          @updateValue="updateValue"
        />
      </div>
      <Button label="Add Row" @click="addRow()" class="addrow-button" />
    </div>
    <div class="preview" :style="`background-image : url('${previewImage}' )`">
      {{ quizzName }}
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

import ItemInput from '@/components/ItemInput.vue';
import HeaderPanel from '@/components/HeaderPanel.vue';
import FooterPanel from '@/components/FooterPanel.vue';

import { onMounted, ref } from 'vue';
import { v4 as uuid } from 'uuid';

import { composable } from '@/state/composable';
import router from '@/router/index.ts';

const { PreviewQuizz } = composable();

const quizzName = ref();
const description = ref();
const time = ref();
const previewImage = ref();
const itemInputArray = ref([]);
const category = ref('');
const categoryList = ref([]);

const imagePreview = (event: any) => {
  previewImage.value = event.files[0].objectURL;
};

function addToCategories() {
  if (category.value) {
    categoryList.value.push({
      name: category.value,
      id: uuid(),
    });
    category.value = '';
  }
}

function deleteCategory(cat: string) {
  const index = categoryList.value.indexOf({ name: `${cat}` });
  categoryList.value.splice(index, 1);
}

function addRow() {
  itemInputArray.value.push({
    id: uuid(),
    value: '',
    category: '',
  });
}

function deleteItem(id: number) {
  const index = itemInputArray.value.findIndex((item) => item.id === id);
  itemInputArray.value.splice(index, 1);
}

function updateCat(selectedItem) {
  const index = itemInputArray.value.findIndex(
    (item) => item.id === selectedItem.id
  );
  itemInputArray.value[index].category = selectedItem.value;
}

function updateValue(selectedItem) {
  const index = itemInputArray.value.findIndex(
    (item) => item.id === selectedItem.id
  );
  itemInputArray.value[index].value = selectedItem.value;
}

function createPreview() {
  PreviewQuizz.value = {
    name: quizzName.value,
    description: description.value,
    time: time.value,
    thumbnail: previewImage.value,
    items: itemInputArray.value,
    categories: categoryList.value,
  };
  console.log(PreviewQuizz.value);
  router.push('/preview');
}

onMounted(() => {
  console.log(PreviewQuizz.value);
  if (PreviewQuizz.value != undefined) {
    quizzName.value = PreviewQuizz.value.name;
    description.value = PreviewQuizz.value.description;
    time.value = PreviewQuizz.value.time;
    previewImage.value = PreviewQuizz.value.thumbnail;
    itemInputArray.value = PreviewQuizz.value.items;
    categoryList.value = PreviewQuizz.value.categories;
  }
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
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    width: 10vw;
    height: 5vh;
  }
}

.category-list {
  position: relative;
  left: 120px;
  background-color: white;
  width: 20vw;
  border-radius: 4px;
  margin: 10px;

  .category-list-items {
    color: black;
    padding: 3px;
    display: flex;

    &:hover {
      background-color: rgb(222, 220, 220);
    }

    .deletecat {
      color: red;
      font-weight: bold;
      position: absolute;
      right: 10px;
      cursor: pointer;
    }
  }
}
</style>
