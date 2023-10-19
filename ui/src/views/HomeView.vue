<template>
  <div class="presentation">
    <h1>Bienvenue sur NomDuSite</h1>
    <p>
      Ici vous pouvez jouer à des quizz mais aussi en créer et les partager avec
      vos amis
    </p>
  </div>
  <LastAddedQuizz />
  <TrendingQuizz />
</template>

<script lang="ts" setup>
import LastAddedQuizz from '@/components/LastAddedQuizz.vue';
import TrendingQuizz from '@/components/TrendingQuizz.vue';
</script>

<style lang="scss">
.presentation {
  position: relative;
  height: 20vh;
  width: 100vw;
  background-color: #e22c2c;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3.5rem;
  }

  p {
    font-size: 1.5rem;
  }
}
</style>
