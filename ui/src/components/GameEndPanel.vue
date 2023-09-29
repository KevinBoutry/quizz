<template>
  <div class="end-container">
    <div class="score">
      <div v-if="win">Vous avez gagné en {{ props.time }} secondes</div>
      <div v-else>
        Vous avez fait un score de {{ props.score }} sur {{ props.maxScore }} en
        {{ props.time }} secondes
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['score', 'maxScore', 'time', 'win']);
</script>

<style lang="scss" scoped>
.end-container {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 50%;
  height: 50vh;
  width: 50vw;
  background-color: #c5baaf;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  .score {
    font-size: 3rem;
  }
}
</style>
