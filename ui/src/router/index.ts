import { createRouter, createWebHistory } from 'vue-router'
import HomeViewVue from '@/views/HomeView.vue'
import ProfileViewVue from '@/views/ProfileView.vue';
import CreateQuizzViewVue from '@/views/CreateQuizzView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeViewVue
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileViewVue
    },
    {
      path: "/create",
      name: "create",
      component: CreateQuizzViewVue
    }
  ]
})

export default router
