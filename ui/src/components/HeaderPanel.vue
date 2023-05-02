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
        <input type="text" class="search-bar">
        <div class="right-homepanel">

            <div>lang</div>
            <div class="profile-button" @click="OpenCreateAccount = !OpenCreateAccount">
                profile
            </div>
        </div>
    </div>
    <CreateAccount v-if="OpenCreateAccount"/>
</template>

<script lang="ts" setup>

import CreateAccount from './CreateAccount.vue';
import { ref } from 'vue';

const OpenCreateAccount = ref(false)

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