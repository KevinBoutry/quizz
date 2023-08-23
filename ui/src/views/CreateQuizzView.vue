<template>
    <HeaderPanel />
    <div class="container">
        <div class="form">
            <div class="inputcontainer">
                <label for="quizzName">Quizz Name :</label>
                <InputText type="text" v-model="quizzName" class="input"/>
            </div>
            <div class="inputcontainer textareainput">
                <label for="description">Description :</label>
                <Textarea v-model="description" class="input"/>
            </div>
            <div class="inputcontainer">
                <label for="timer">Time :</label>
                <InputText type="text" v-model="time" class="input timeinput"/>
            </div>
            <div class="inputcontainer">
                <label for="vignette">Thumbnail :</label>
                <FileUpload  mode="basic" accept="image/*" :maxFileSize="10000000" @change="imagePreview" />
            </div>
            <div class="inputcontainer">
                <label for="categories">Categories :</label>
                <InputText type="text" v-model="category"/>
                <Button label="Add" @click="addToCategories" class="addcat-button"/>
            </div>
            <div class="category-list">
                <div v-for="cat in categoryList" class="category-list-items" >
                    <div>{{ cat.name }}</div>
                    <div class="deletecat" @click="deleteCategory(cat.name)">X</div>
                </div>
            </div>
            <ItemList/>
        </div>
        <div class="preview">
            <div>
                {{ quizzName }}
            </div>
        </div>
        <Button label="PREVIEW" class="preview-button"/>
    </div>
    <FooterPanel />
</template>

<script lang="ts" setup>

import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';

import HeaderPanel from '@/components/HeaderPanel.vue';
import FooterPanel from '@/components/FooterPanel.vue';

import { ref, type Ref } from 'vue';
import ItemList from '@/components/itemList.vue';

const quizzName = ref();
const description = ref();
const time = ref();
const category = ref("");
const categoryList: Ref<any>= ref([]);
const thumbnail = ref<File | null>()

function addToCategories(){
    if(category.value){    
        categoryList.value.push({name: category.value});
        category.value = ""
    }    
}

function deleteCategory(cat : string){
    console.log(cat); 
    console.log(categoryList.value.indexOf({name: `${cat}`}));    
    const index = categoryList.value.indexOf({name: `${cat}`});
    categoryList.value.splice(index,1);
}

const imagePreview = (event: any) => {
    thumbnail.value = event.target.files[0]
    console.log(thumbnail.value);    
}

</script>

<style lang="scss">

.container{
    position: relative;
    height: 90vh;
    width: 100vw;
    background-color: #424B54;
    color: white;
    overflow-y: scroll;

    .form{
        padding: 10px;

        .inputcontainer{
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

            .input{
                position: relative;
                width: 20vw;
            }

            .timeinput{
                width: 80px;
            }

            .addcat-button{
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

        .category-list{
            position: relative;
            left: 120px;
            background-color: white;
            width: 20vw;
            border-radius: 4px;
            margin: 10px;

            .category-list-items{
                color: black;
                padding: 3px;
                display: flex;
                
                &:hover{
                    background-color: rgb(222, 220, 220);
                }

                .deletecat{
                    color: red;
                    font-weight: bold;
                    position: absolute;
                    right: 10px;
                    cursor: pointer;
                }
            }
        }
    }
    .preview{
        position: absolute;
        right: 150px;
        top: 150px;
        width: 400px;
        height: 250px;
        background-color: white;
        color: black;
        text-align: center;
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
    }

    .preview-button{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 30px;
        width: 10vw;
        height: 5vh;
    }
}

</style>