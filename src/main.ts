import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueClickAway from 'vue3-click-away';
import router from './router';
import { useAuthStore } from '@/stores/authStore';
import './style.css';
import './axios';

const app = createApp(App);
const backendUrl = 'http://192.168.3.34:8000/storage/';

// Configura Pinia y Vue Router
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// Configura vueuse/head para gestionar los metadatos
const head = createHead();

// Asigna una URL base para los assets del backend
app.config.globalProperties.$asset = (path: string) => {
  return `${backendUrl}${path}`;
};

// Monta la aplicación
app.use(router).use(head).use(VueClickAway);

// Llama a autoLogin para restaurar sesión antes de montar la app
const authStore = useAuthStore();
authStore.autoLogin(); // Asegúrate de que autoLogin se ejecute en el momento adecuado

app.mount('#app');
