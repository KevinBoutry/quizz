<template>
    <div class="header">
        <div class="left-homepanel">
            <div class="home-button">
                <!-- TODO : Logo du site en bouton Home -->
                HOME
            </div>
            <div>QUIZZ</div>
            <div>CREER</div>
        </div>
        <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText v-model="search" placeholder="Search" class="p-inputtext-sm"/>
        </span>
        <div class="right-homepanel">

            <div>lang</div>
            <div class="profile-button" @click="CreateAccountPanelStatus = !CreateAccountPanelStatus">
                profile
            </div>
        </div>
    </div>
    <CreateAccount v-if="CreateAccountPanelStatus"/>
</template>

<script lang="ts" setup>

import InputText from 'primevue/inputtext';

import CreateAccount from './CreateAccount.vue';

import { ref } from 'vue';

import { composable } from '@/state/composable'

const { CreateAccountPanelStatus } = composable()

const search = ref("")

</script>

<style lang="scss" scoped>

.header{
    height: 5vh;
    width: 100vw;
    position: relative;
    background-color: #C5BAAF;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-homepanel{
        display: flex;
       div{
        margin-left: 5px;
       }
    }

    .right-homepanel{
        display: flex;
        div{
            margin-right: 5px;
        }
        .profile-button{
            cursor: pointer;
        }
    }
}

</style>