<template>
    <HeaderPanel/>
    <div>
        
    </div>
</template>

<script lang="ts" setup>

import { useRouter } from "vue-router";
import HeaderPanel from "../components/HeaderPanel.vue";
import { onMounted } from "vue";
import { composable } from '@/state/composable';

const router = useRouter()
const {isLogged} = composable()

onMounted(() => {
    if (isLogged) {
        const user = localStorage.getItem('user');
        console.log(user);        
    }
    else router.push('/')
})

</script>

<style lang="scss" scoped>

</style>