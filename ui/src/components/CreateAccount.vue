<template>
    <div class="container">
        <h2>Create Account</h2>
        <div>
            <p>Username :</p>
            <InputText type="text" v-model="username" />
        </div>
         <div>
            <p>Email :</p>
            <InputText type="text" v-model="email" />
        </div>
        <div>
            <p>Password :</p>
            <div class="card flex justify-content-center">
                <Password v-model="password" toggleMask />
            </div>
        </div>
        <div>
            <p>Confirm password :</p>
            <div class="card flex justify-content-center">
                <Password v-model="passwordbis" toggleMask />
            </div>
        </div>
        <button>VALIDATE</button>
    </div>
</template>

<script lang="ts" setup>

import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';

const username = ref();
const email = ref();
const password = ref();
const passwordbis = ref();

</script>

<style lang="scss" scoped>

.container{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 400px;
    height: 400px;
    background-color: #EBCFB2;
    border-radius: 5px;

    h2{
        text-align: center;
        margin-top: 5px;
    }

    p{
        margin-left: 5px;
        margin-top: 15px;
    };

    input{
        margin-left: 5px;
    };
    


    button{
        position: absolute;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 40px;
        background-color: #FFFFFF;
        border-radius: 5px;
    }
}

</style>