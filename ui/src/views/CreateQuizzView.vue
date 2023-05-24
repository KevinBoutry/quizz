<template>
    <HeaderPanel />
    <div class="container">
        <div class="input">
            <label for="quizzName">Nom du Quizz</label>
            <InputText type="text" v-model="quizzName"/>
        </div>
        <div class="input">
            <label for="description">Description</label>
            <Textarea v-model="description"/>
        </div>
        <div>
            <label for="banner">
        </div>
    </div>
</template>

<script lang="ts" setup>

import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';

import HeaderPanel from '@/components/HeaderPanel.vue';

import { ref } from 'vue';

const quizzName = ref();
const description = ref();

</script>

<style lang="scss">

.container{
    position: relative;
    height: 90vh;
    width: 100vw;
    background-color: #424B54;
    color: white;
}

</style>