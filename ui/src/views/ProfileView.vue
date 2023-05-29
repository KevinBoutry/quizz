<template>
    <HeaderPanel/>
    <div>
        
    </div>
    <FooterPanel/>
</template>

<script lang="ts" setup>

import { useRouter } from "vue-router";
import HeaderPanel from "../components/HeaderPanel.vue";
import { onMounted } from "vue";
import { composable } from '@/state/composable';
import FooterPanel from "@/components/FooterPanel.vue";

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