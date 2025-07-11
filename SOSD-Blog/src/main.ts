import './assets/main.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index' 
import Vue3Lottie from 'vue3-lottie';
import store from './store';
import { setupMock } from './mock';
const api = setupMock();
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(Vue3Lottie, { name: 'Vue3Lottie' });
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(store);
app.provide('$api', api);
app.mount('#app')