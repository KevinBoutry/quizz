import { createRouter, createWebHistory } from 'vue-router'
import HomeViewVue from '@/views/HomeView.vue'
import ProfileViewVue from '@/views/ProfileView.vue'

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
    }
  ]

})

export default router
