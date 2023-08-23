<template>
    <div class="inputcontainer">
        <label for="items">Item :</label>
        <inputText type="text" class="input"/>
        <label for="categories">Category :</label>
        <Dropdown optionLabel="name" placeholder="Select category" class="w-full md:w-14rem" />
        <Button label="Delete" @click="deleteItem()" class="delete-button"/>
    </div>
</template>

<script lang="ts" setup>

import inputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

function deleteItem(){
    
}

</script>

<style lang="scss" scoped>

.inputcontainer{
    margin-top: 5px;
    display: flex;
    align-items: center;
}

</style>