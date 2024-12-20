// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import VueClickAway from "vue3-click-away";
import router from './router'
import './style.css'
import './axios'
const app = createApp(App)
const backendUrl = 'http://192.168.3.34:8000/storage/'
// Configura Pinia y Vue Router


// Configura vueuse/head para gestionar los metadatos
const head = createHead()
const pinia = createPinia()
app.config.globalProperties.$asset = (path: string) => {
    return `${backendUrl}${path}`;
  };
// Monta la aplicación
app.use(router).use(head).use(pinia).use(VueClickAway)
app.mount('#app')

