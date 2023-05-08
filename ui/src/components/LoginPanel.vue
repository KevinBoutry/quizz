<template>
    <div class="container">
        <h2>Login</h2>
        <div class="inputblock">
            <p>Username or Email :</p>
            <InputText type="text" class="p-inputtext-sm" placeholder="username or email"/>
        </div>
        <div class="inputblock">
            <p>Password :</p>
            <Password type="text" class="p-inputtext-sm" placeholder="password" toggleMask :feedback="false"/>
        </div>
        <button>LOGIN</button>
    </div>
    <div
    class="outside"
    @click="closePanel"
  ></div>
</template>

<script lang="ts" setup>

import { composable } from '@/state/composable';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const { LoginPanelStatus } = composable()

const closePanel = () => {
    LoginPanelStatus.value = false;
}

</script>

<style lang="scss">

.container{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 500px;
    height: 500px;
    background-color: #EBCFB2;
    border-radius: 5px;
    color: #000000;

        
        h2{
            text-align: center;
            margin-top: 5px;
        }
        
        .inputblock{
            margin-top: 5px;
            margin-left: 10px;
        }
        
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

.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(2px);
}
</style>
