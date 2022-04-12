import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Api from '@/plugins/axios.js';

import App from '@/components/app/App.vue'
import router from './router/router.js'

import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css"                           //icons

import Button from 'primevue/button'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.config.globalProperties.$API = Api


app.use(PrimeVue, { ripple: true });
app.component('Button', Button)

// axios
// import axios from 'axios'
// import VueAxios from 'vue-axios'

app.use(createPinia())
// app.use(VueAxios, Api)

// app.use(VueAxios, axios)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
