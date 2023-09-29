<template>
  <div class="container" @keyup.enter="validate">
    <h2>Login</h2>
    <div class="inputblock">
      <p>Username or Email :</p>
      <InputText
        type="text"
        class="p-inputtext-sm"
        v-model="userCredentials.username"
        placeholder="username or email"
      />
    </div>
    <div class="inputblock">
      <p>Password :</p>
      <Password
        type="text"
        class="p-inputtext-sm"
        v-model="userCredentials.password"
        placeholder="password"
        toggleMask
        :feedback="false"
      />
    </div>
    <button @click="validate">LOGIN</button>
  </div>
  <div class="outside" @click="closePanel"></div>
</template>

<script lang="ts" setup>
import { composable } from '@/state/composable';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { UserService } from '@/services/UserService.ts';
import { reactive } from 'vue';

const { LoginPanelStatus } = composable();

const closePanel = () => {
  LoginPanelStatus.value = false;
};

const userCredentials = reactive({
  username: '',
  password: '',
});

const userService: UserService = new UserService();

async function validate() {
  await userService.handleLogin(userCredentials);
}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  h2 {
    text-align: center;
    margin-top: 5px;
  }

  .inputblock {
    margin-top: 10px;
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
