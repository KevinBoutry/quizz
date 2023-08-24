<template>
  <div class="inputcontainer">
    <label for="items">Item :</label>
    <inputText
      type="text"
      class="input"
      v-model="currentValue"
      @change="emit('updateValue', { value: currentValue, id: item.id })"
    />
    <label for="categories">Category :</label>
    <Dropdown
      v-model="selectedCat"
      :options="categories"
      optionLabel="name"
      placeholder="Select category"
      class="w-full md:w-14rem"
      @change="emit('updateCat', { value: selectedCat.name, id: item.id })"
    />
    <Button
      label="Delete"
      @click="emit('deleteItem', item.id)"
      class="delete-button"
    />
  </div>
</template>

<script lang="ts" setup>
import inputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue';

const props = defineProps(['item', 'categories']);

const emit = defineEmits(['deleteItem', 'updateCat', 'updateValue']);

const selectedCat: Record<string, any> = ref({});
const currentValue = ref('');

onMounted(() => {
  selectedCat.value = props.item.category;
});
</script>

<style lang="scss" scoped>
.inputcontainer {
  margin-top: 5px;
  display: flex;
  align-items: center;
}
</style>
