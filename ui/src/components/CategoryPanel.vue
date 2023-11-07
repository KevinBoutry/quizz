<template>
  <div class="inputcontainer">
    <label for="categories">Categories :</label>
    <InputText type="text" v-model="category" />
    <Button label="Add" @click="addToCategories" class="addcat-button" />
  </div>
  <div class="categories-container">
    <div v-for="(cat, index) in PreviewQuizz.categories" :key="cat.id">
      <div class="category-container">
        <div class="category-title">{{ cat.name }}</div>
        <div>
          <div class="items-container">
            <InputText
              class="item-input"
              v-model="currentInput[index]"
              type="text"
              @keyup.enter="addToCategory(cat.id)"
            />
            <Button
              severity="success"
              icon="pi pi-check"
              text
              rounded
              aria-label="Filter"
              @click="addToCategory(cat.id)"
            />
          </div>
          <div>
            <div v-for="item in cat.items" :key="item" class="item-list">
              <div>
                {{ item }}
              </div>
              <Button
                icon="pi pi-times"
                severity="danger"
                text
                rounded
                aria-label="Cancel"
                @click="deleteItem(cat.id, item)"
                class="item-del"
              />
            </div>
          </div>
        </div>
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
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';
import { v4 as uuid } from 'uuid';

import { composable } from '@/state/composable';

const category = ref('');
const currentInput = ref([]);

const { PreviewQuizz } = composable();

function addToCategory(id) {
  const index = PreviewQuizz.value.categories.findIndex((cat) => cat.id === id);
  if (currentInput.value[index] != '') {
    PreviewQuizz.value.categories[index].items.push(currentInput.value[index]);
    currentInput.value[index] = '';
  }
}

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

function deleteItem(id, selectedItem) {
  const indexCat = PreviewQuizz.value.categories.findIndex(
    (cat) => cat.id === id
  );
  const indexItem = PreviewQuizz.value.categories[indexCat].items.findIndex(
    (item) => item === selectedItem
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
    background-color: antiquewhite;
    border-radius: 5px;
    margin-top: 30px;
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

      .item-input {
        margin: 5px;
        height: 35px;
      }
    }
    .item-list {
      display: flex;
      align-items: center;
      color: black;
      padding-left: 10px;
      justify-content: space-between;

      &:hover {
        background-color: #ebcfb2;
      }

      .item-del {
        height: 30px;
        width: 30px;
      }
    }
  }
  .delbutton {
    margin-top: 5px;
    background-color: #e22c2c;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
