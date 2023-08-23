<template>
    <div v-for="n in itemInputCount">
        <ItemInput/>
    </div>
    <Button label="Add Row" @click="itemInputCount ++" class="addrow-button"/>
</template>

<script lang="ts" setup>

import ItemInput from './itemInput.vue';
import Button from 'primevue/button';

import { ref } from 'vue';

const itemInputCount = ref(1)

</script>

<style lang="scss" scoped>

</style>