<template>
  <div class="inputcontainer">
    <label for="categories">Categories :</label>
    <InputText type="text" v-model="category" />
    <Button label="Add" @click="addToCategories" class="addcat-button" />
  </div>
  <div class="categories-container">
    <div
      v-for="cat in PreviewQuizz.categories"
      :key="cat.id"
      class="category-container"
    >
      <div class="category-title">{{ cat.name }}</div>
      <div>
        <div v-for="item in cat.items" :key="item.id">
          <itemInputV2
            :category="cat.id"
            :item="item"
            :default="defaultValue"
            @updateValue="updateValue"
            @deleteItem="deleteItem"
          />
        </div>
        <Button
          icon="pi pi-plus"
          text
          severity="secondary"
          @click="addRow(cat.id)"
        />
      </div>
      <Button
        icon="pi pi-trash"
        class="delbutton"
        @click="deleteCategory(cat.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import itemInputV2 from './itemInputV2.vue';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';
import { v4 as uuid } from 'uuid';

import { composable } from '@/state/composable';

const category = ref('');

const { PreviewQuizz } = composable();

const defaultValue = ref();

function addToCategories() {
  if (category.value) {
    PreviewQuizz.value.categories.push({
      name: category.value,
      id: uuid(),
      items: [],
    });
    category.value = '';
  }
}

function deleteCategory(id: string) {
  const index = PreviewQuizz.value.categories.findIndex((cat) => cat.id === id);
  PreviewQuizz.value.categories.splice(index, 1);
}

function addRow(id) {
  const index = PreviewQuizz.value.categories.findIndex((cat) => cat.id === id);
  PreviewQuizz.value.categories[index].items.push({
    id: uuid(),
    name: '',
  });
}

function updateValue(selectedItem) {
  const indexCat = PreviewQuizz.value.categories.findIndex(
    (cat) => cat.id === selectedItem.cat
  );
  const indexItem = PreviewQuizz.value.categories[indexCat].items.findIndex(
    (item) => item.id === selectedItem.id
  );
  PreviewQuizz.value.categories[indexCat].items[indexItem].name =
    selectedItem.value;
}

function deleteItem(selectedItem) {
  const indexCat = PreviewQuizz.value.categories.findIndex(
    (cat) => cat.id === selectedItem.cat
  );
  const indexItem = PreviewQuizz.value.categories[indexCat].items.findIndex(
    (item) => item.id === selectedItem.id
  );
  PreviewQuizz.value.categories[indexCat].items.splice(indexItem, 1);
}
</script>

<style lang="scss" scoped>
.categories-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 50px;

  .category-container {
    width: 20vw;
    max-width: 250px;
    background-color: #ebcfb2;
    border-radius: 5px;
    margin-top: 10px;

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
    .delbutton {
      background-color: #e22c2c;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
