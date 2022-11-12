import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

app.provide(
  'server',
  `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`
);
app.use(router);
app.mount('#app');
