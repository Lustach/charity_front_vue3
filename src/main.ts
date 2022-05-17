import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useNotification } from "@/components/compositions/ui/elNotification.ts";
import * as validationMessages from '@/compositions/validation_messages'
import "@/compositions/tooltip"
import Api from '@/plugins/axios';

import App from '@/components/app/App.vue'
import router from './router/router.js'

import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css"                           //icons

import Button from 'primevue/button'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@formkit/themes/genesis'
import { plugin, defaultConfig } from '@formkit/vue'
const app = createApp(App)
app.provide('API', Api)
app.provide('useNotification', useNotification)
// app.config.globalProperties.$API = Api

app.use(plugin, defaultConfig())
app.use(PrimeVue, { ripple: true });
app.component('Button', Button)

app.directive('click-outside', {
    mounted(el, binding) {
        el.addEventListener('click', e => e.stopPropagation());
        document.body.addEventListener('click', binding.value);
    },
    unmounted(el, binding) {
        document.body.removeEventListener('click', binding.value);
    },
});
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')


