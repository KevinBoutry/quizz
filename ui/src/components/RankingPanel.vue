<template>
  <div class="inputcontainer">
    <label>Ranked from :</label>
    <InputNumber
      v-model="rankstart"
      inputId="integeronly"
      class="inputnumber"
    />
    <span class="spanto"> to </span>
    <InputNumber v-model="rankend" inputId="integeronly" />
  </div>
  <div class="ranking-container">
    <div
      v-for="(category, index) in PreviewQuizz.categories"
      :key="category.id"
      class="cat-container"
    >
      <span class="cat-name">
        {{ category.name }}
      </span>
      <InputText
        v-model="currentInput[index]"
        @change="addToCategory(category.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';

import { ref, watch, onMounted } from 'vue';
import { v4 as uuid } from 'uuid';

import { composable } from '@/state/composable';

const rankstart = ref();
const rankend = ref();
const { PreviewQuizz } = composable();

const currentInput = ref([]);

function createTableInput() {
  PreviewQuizz.value.categories = [];
  for (let i = rankstart.value; i <= rankend.value; i++) {
    PreviewQuizz.value.categories.push({
      name: i,
      id: uuid(),
      items: [],
    });
  }
}

function addToCategory(id) {
  const index = PreviewQuizz.value.categories.findIndex((cat) => cat.id === id);
  if (currentInput.value[index] != '') {
    PreviewQuizz.value.categories[index].items.push(currentInput.value[index]);
  }
}

watch([rankstart, rankend], () => {
  createTableInput();
});

onMounted(() => {
  createTableInput();
});
</script>

<style lang="scss" scoped>
.spanto {
  margin-right: 10px;
}

.ranking-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: #ebcfb2;
  padding: 10px;
  border-radius: 5px;
  width: 95vw;
  max-height: 35vh;
  margin: 10px;
  color: black;
  border: 2px solid #c5baaf;
  overflow-y: hidden;

  .cat-container {
    display: flex;
    justify-content: flex-end;
    .cat-name {
      padding: 10px;
    }
  }
}
</style>

<style>
.p-inputnumber-input {
  width: 65px;
  margin-right: 10px;
}
</style>
