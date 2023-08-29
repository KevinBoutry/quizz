<template>
  <div class="item-container">
    <InputText
      type="text"
      class="input"
      v-model="currentValue"
      @change="
        emit('updateValue', { value: currentValue, id: item.id, cat: category })
      "
    />
    <Button
      icon="pi pi-times"
      severity="danger"
      text
      rounded
      aria-label="Cancel"
      @click="emit('deleteItem', { id: item.id, cat: category })"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { composable } from '@/state/composable';

const { PreviewQuizz } = composable();

const currentValue = ref();

const props = defineProps(['item', 'category', 'default']);

const emit = defineEmits(['updateValue', 'deleteItem']);

function findDefaultValue(c: string, i: string) {
  const indexCat = PreviewQuizz.value.categories.findIndex(
    (cat) => cat.id === c
  );
  const indexItem = PreviewQuizz.value.categories[indexCat].items.findIndex(
    (item) => item.id === i
  );
  currentValue.value =
    PreviewQuizz.value.categories[indexCat].items[indexItem].name;
}

onMounted(() => {
  findDefaultValue(props.category, props.item.id);
});
</script>

<style lang="scss" style>
.item-container {
  display: flex;

  .input {
    position: relative;
    width: 80%;
    margin: 5px;
  }

  .button {
    margin: 5px;
  }
}
</style>
