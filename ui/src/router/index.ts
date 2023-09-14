import { createRouter, createWebHistory } from 'vue-router';

import CreateQuizzViewVue from '@/views/CreateQuizzView.vue';
import HomeViewVue from '@/views/HomeView.vue';
import ProfileViewVue from '@/views/ProfileView.vue';
import QuizzListViewVue from '@/views/QuizzListView.vue';
import QuizzPlayViewVue from '@/views/QuizzPlayView.vue';
import QuizzPreviewViewVue from '@/views/QuizzPreviewView.vue';
import TestViewVue from '@/views/TestView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewVue,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileViewVue,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateQuizzViewVue,
    },
    {
      path: '/test',
      name: 'test',
      component: TestViewVue,
    },
    {
      path: '/preview',
      name: 'preview',
      component: QuizzPreviewViewVue,
    },
    {
      path: '/list',
      name: 'list',
      component: QuizzListViewVue,
    },
    {
      path: '/quizz/:id',
      name: 'quizz',
      component: QuizzPlayViewVue,
    },
  ],
});

export default router;
