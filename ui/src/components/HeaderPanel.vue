<template>
    <div class="header">
        <div class="left-homepanel">
            <div class="home-button">
                <RouterLink to="/">
                <!-- TODO : Logo du site en bouton Home -->
                HOME
            </RouterLink>
            </div>
            <div>
                QUIZZ
            </div>
            <div v-if="isLogged" >
                <RouterLink to="create">
                    CREER
                </RouterLink>
            </div>
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
            <div v-if="isLogged">Connecté : {{ userStore.user }}</div>
            <div v-if="isLogged">
                <RouterLink to="/profile">                    
                    PROFILE
                </RouterLink>
            </div>
            <div v-if="isLogged" class="button" @click="logout">LOGOUT</div>
        </div>
    </div>
    <CreateAccount v-if="CreateAccountPanelStatus"/>
    <LoginPanel v-if="LoginPanelStatus"/>
</template>

<script lang="ts" setup>

import {RouterLink, useRouter} from "vue-router"

import InputText from 'primevue/inputtext';

import CreateAccount from './CreateAccount.vue';
import LoginPanel from './LoginPanel.vue';

import { onMounted, ref } from 'vue';

import { composable } from '@/state/composable';
import { useUserStore } from '@/stores/users'

const { CreateAccountPanelStatus, LoginPanelStatus, isLogged } = composable()

const search = ref("")

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
    userStore.handleLogout();
    router.push("/")
}

onMounted(() => {
    const userLS = localStorage.getItem('user')
    if (userLS) {
        isLogged.value = true;    
    }
})

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