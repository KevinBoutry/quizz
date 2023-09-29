<template>
  <div>
    <h1>Utilisateur : {{ userProfile.username }}</h1>
    <h2>id : {{ userProfile.userid }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { onMounted } from 'vue';
import { composable } from '@/state/composable';

import { UserService } from '@/services/UserService';
import { user } from '@/state/user';

const router = useRouter();
const { isLogged } = composable();
const { userProfile } = user();

const userService: UserService = new UserService();

onMounted(async () => {
  if (isLogged) {
    const user = await userService.getUser();
    userProfile.value.username = user.username;
    userProfile.value.userid = user.sub;
  } else router.push('/');
});
</script>

<style lang="scss" scoped></style>
