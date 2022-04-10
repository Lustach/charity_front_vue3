import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css"                           //icons

import Button from 'primevue/button'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(PrimeVue, { ripple: true });
app.component('Button', Button)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
