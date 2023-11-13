<template>
  <div class="profile-container">
    <div>
      <div>Utilisateur : {{ userProfile.username }}</div>
      <div>id : {{ userProfile.userid }}</div>
      <div>email : {{ userProfile.email }}</div>
    </div>
    <div class="bottom-part">
      <div class="created-quizz">
        <h1>My Quizz</h1>
        <DataTable
          :value="createdQuizz.data"
          tableStyle="min-width: 50rem"
          stripedRows
        >
          <Column field="name" header="Name" sortable></Column>
          <Column field="timeplayed" header="Time Played" sortable></Column>
          <Column field="averageScore" header="Average Score" sortable></Column>
          <Column field="rating" header="Rating" sortable>
            <template #body="slotProps">
              <Rating
                v-if="slotProps.data.rating"
                :modelValue="slotProps.data.rating"
                readonly
                :cancel="false"
              />
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="created-quizz">
        <h1>My Scores</h1>
        <DataTable
          :value="playedQuizz"
          tableStyle="min-width: 50rem"
          stripedRows
        >
          <Column field="quizz.name" header="Name" sortable></Column>
          <Column field="score" header="Score" sortable></Column>
          <Column field="maxScore" header="Max Score" sortable></Column>
          <Column field="time" header="Time" sortable></Column>
          <Column field="quizz.id" header="">
            <template #body="slotProps">
              <router-link :to="`quizz/${slotProps.data.quizz.id}`"
                >Retry</router-link
              >
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Rating from 'primevue/rating';

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
const playedQuizz = ref();

onMounted(async () => {
  createdQuizz.value = await quizzService.getAll({
    creatorId: userProfile.value.userid,
    pageSize: 9,
  });
  playedQuizz.value = await quizzService.getScoresByUserId(
    userProfile.value.userid
  );
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

  .bottom-part {
    display: flex;
    justify-content: space-around;
    height: 60vh;
    .created-quizz {
      width: 45vw;
      padding: 20px;

      h1 {
        font-size: 2rem;
      }
    }
  }
}
</style>
