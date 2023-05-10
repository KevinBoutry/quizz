<template>
    <div class="header">
        <div class="left-homepanel">
            <div class="home-button">
                <!-- TODO : Logo du site en bouton Home -->
                HOME
            </div>
            <div>QUIZZ</div>
            <div v-if="!isLogged" >CREER</div>
        </div>
        <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText v-model="search" placeholder="Search" class="p-inputtext-sm"/>
        </span>
        <div class="right-homepanel">
            <div v-if="!isLogged" class="button" @click="LoginPanelStatus = !LoginPanelStatus">SIGNIN</div>
            <div v-if="!isLogged" class="button" @click="CreateAccountPanelStatus = !CreateAccountPanelStatus">
                SIGNUP
            </div>
            <div v-if="isLogged">PROFILE</div>
            <div v-if="isLogged" @click="logout">LOGOUT</div>

        </div>
    </div>
    <CreateAccount v-if="CreateAccountPanelStatus"/>
    <LoginPanel v-if="LoginPanelStatus"/>
</template>

<script lang="ts" setup>

import InputText from 'primevue/inputtext';

import CreateAccount from './CreateAccount.vue';
import LoginPanel from './LoginPanel.vue';

import { ref } from 'vue';

import { composable } from '@/state/composable';
import { useUserStore } from '@/stores/users'

const { CreateAccountPanelStatus, LoginPanelStatus, isLogged } = composable()

const search = ref("")

const userStore = useUserStore()

const logout = () => {
    userStore.handleLogout()
}

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
        .button{
            cursor: pointer;
        }
    }
}

</style>