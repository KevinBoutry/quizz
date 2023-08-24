<template>
  <div class="inputcontainer">
    <label for="categories">Categories :</label>
    <InputText type="text" v-model="category" />
    <Button label="Add" @click="addToCategories" class="addcat-button" />
  </div>
  <div class="category-list">
    <div v-for="cat in categoryList" class="category-list-items" :key="cat.id">
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
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import ItemInput from './itemInput.vue';
import Button from 'primevue/button';

import { ref } from 'vue';
import { v4 as uuid } from 'uuid';

const itemInputArray = ref([]);
const category = ref('');
const categoryList = ref([]);

const emit = defineEmits(['itemList']);

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
  console.log(itemInputArray.value);
}
</script>

<style lang="scss" scoped>
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
