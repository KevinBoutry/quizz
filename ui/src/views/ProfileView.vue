<template>
  <div class="profile-container">
    <div>
      <div>Utilisateur : {{ userProfile.username }}</div>
      <div>id : {{ userProfile.userid }}</div>
      <div>email : {{ userProfile.email }}</div>
    </div>
    <div class="created-quizz">
      <h1>My Quizz</h1>

      <DataTable :value="createdQuizz.data" tableStyle="min-width: 50rem">
        <Column field="name" header="Name"></Column>
        <Column field="timeplayed" header="Time Played"></Column>
        <Column field="rating" header="Rating"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { useRouter } from 'vue-router';

import { onMounted, ref } from 'vue';
import { composable } from '@/state/composable';

import { UserService } from '@/services/UserService';
import { QuizzService } from '@/services/QuizzService';
import { user } from '@/state/user';

const router = useRouter();
const { isLogged } = composable();
const { userProfile } = user();

const userService: UserService = new UserService();
const quizzService: QuizzService = new QuizzService();

const createdQuizz = ref({ data: [] });

onMounted(async () => {
  if (isLogged) {
    const user = await userService.getUser();
    userProfile.value.username = user.username;
    userProfile.value.email = user.email;
    userProfile.value.userid = user.sub;
  } else router.push('/');
  createdQuizz.value = await quizzService.getAll({
    creatorId: userProfile.value.userid,
    pageSize: 9,
  });
  console.log(createdQuizz.value);
});
</script>

<style lang="scss" scoped>
.profile-container {
  width: 100vw;
  height: 90vh;
  background-color: #424b54;
  color: white;
  font-size: 2rem;
  text-align: center;
}
</style>
