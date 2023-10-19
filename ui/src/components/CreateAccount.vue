<template>
  <div class="container">
    <h2>Create Account</h2>
    <Message severity="error" v-if="errorMessage">{{ errorMessage }}</Message>
    <div class="inputblock">
      <p>Username :</p>
      <InputText
        type="text"
        v-model="userCredentials.username"
        class="p-inputtext-sm"
        placeholder="username"
      />
    </div>
    <div class="inputblock">
      <p>Email :</p>
      <InputText
        type="email"
        v-model="userCredentials.email"
        class="p-inputtext-sm"
        placeholder="email"
      />
    </div>
    <div class="inputblock">
      <p>Password :</p>
      <Password
        v-model="userCredentials.password"
        toggleMask
        class="p-inputtext-sm"
        placeholder="password"
      />
    </div>
    <div class="inputblock">
      <p>Confirm password :</p>
      <Password
        v-model="userCredentials.passwordbis"
        toggleMask
        class="p-inputtext-sm"
        placeholder="confirm password"
      />
    </div>
    <button @click="validate">SUBMIT</button>
  </div>
  <div class="outside" @click="closePanel"></div>
</template>

<script lang="ts" setup>
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';

import { reactive } from 'vue';

import { composable } from '@/state/composable';
import { user } from '@/state/user';
import router from '@/router/index.ts';

import { UserService } from '@/services/UserService.ts';

const { CreateAccountPanelStatus } = composable();
const { errorMessage } = user();

const userService: UserService = new UserService();

const userCredentials = reactive({
  username: '',
  email: '',
  password: '',
  passwordbis: '',
});

async function validate() {
  await userService.handleSignup(userCredentials);
}

const closePanel = () => {
  CreateAccountPanelStatus.value = false;
  errorMessage.value = '';
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 500px;
  height: 500px;
  background-color: #ebcfb2;
  border-radius: 5px;
  color: #000000;

  h2 {
    text-align: center;
    margin-top: 5px;
  }

  .inputblock {
    margin-top: 5px;
    margin-left: 10px;
  }

  button {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 40px;
    background-color: #ffffff;
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
