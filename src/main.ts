import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import i18n from './i18n'


createApp(App).use(i18n)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(mdiVue, {
    icons: mdijs
  })
  .mount('#app');
