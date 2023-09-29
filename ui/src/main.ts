import './assets/main.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import App from './App.vue';
import PrimeVue from 'primevue/config';
import Skeleton from 'primevue/skeleton';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.component('Skeleton', Skeleton);

app.mount('#app');
