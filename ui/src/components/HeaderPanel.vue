<template>
  <div class="header">
    <div class="left-homepanel">
      <div class="home-button">
        <RouterLink to="/">
          <i class="pi pi-home" />
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/list"> QUIZZ </RouterLink>
      </div>
      <div v-if="isLogged">
        <RouterLink to="create"> CREER </RouterLink>
      </div>
    </div>
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText v-model="search" placeholder="Search" />
    </span>
    <div class="right-homepanel">
      <div
        v-if="!isLogged"
        class="button"
        @click="LoginPanelStatus = !LoginPanelStatus"
      >
        SIGNIN
      </div>
      <div
        v-if="!isLogged"
        class="button"
        @click="CreateAccountPanelStatus = !CreateAccountPanelStatus"
      >
        SIGNUP
      </div>
      <div v-if="isLogged"></div>
      <div v-if="isLogged">
        <RouterLink to="/profile"> PROFILE </RouterLink>
      </div>
      <div v-if="isLogged" class="button" @click="logout">LOGOUT</div>
    </div>
  </div>
  <SearchPanel :searchText="search" v-if="search" />
  <CreateAccount v-if="CreateAccountPanelStatus" />
  <LoginPanel v-if="LoginPanelStatus" />
</template>

<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router';

import InputText from 'primevue/inputtext';

import CreateAccount from './CreateAccount.vue';
import LoginPanel from './LoginPanel.vue';

import { onMounted, ref } from 'vue';
import { UserService } from '@/services/UserService';

import { composable } from '@/state/composable';
import { user } from '@/state/user';
import SearchPanel from './SearchPanel.vue';

const { CreateAccountPanelStatus, LoginPanelStatus, isLogged } = composable();

const search = ref();

const router = useRouter();
const { userProfile } = user();

const userService: UserService = new UserService();

const logout = () => {
  isLogged.value = false;
  localStorage.removeItem('user');
  router.push('/');
};

onMounted(async () => {
  const userLS = localStorage.getItem('user');
  if (userLS) {
    isLogged.value = true;
  }
  if (isLogged) {
    const user = await userService.getUser();
    userProfile.value.username = user.username;
    userProfile.value.userid = user.id;
    userProfile.value.email = user.email;
    setInterval(async () => {
      await userService.getUser();
    }, 1800000);
  }
});
</script>

<style lang="scss" scoped>
.header {
  height: 5vh;
  width: 100vw;
  position: relative;
  background-color: #c5baaf;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-homepanel {
    display: flex;
    div {
      margin-left: 5px;
    }
  }

  .right-homepanel {
    display: flex;
    div {
      margin-right: 5px;
    }
    .button {
      cursor: pointer;
    }
  }
}
</style>
