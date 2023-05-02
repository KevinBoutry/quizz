<template>
    <HeaderPanel/>
    <div class="presentation">
        <h1>Bienvenue sur NomDuSite</h1>
        <p>Ici vous pouvez jouer à des quizz mais aussi en créer et les partager avec vos amis</p>
    </div>
</template>

<script lang="ts" setup>

import HeaderPanel from '@/components/HeaderPanel.vue';

</script>

<style lang="scss">

.presentation{
    position: relative;
    height: 40vh;
    width: 100vw;
    background-color: #E22C2C;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        font-size: 3.5rem;
    }

    p{
        font-size: 1.5rem;
    }
}


</style>