
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import Antd from 'ant-design-vue';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'ant-design-vue/dist/reset.css';
import VueTheMask from 'vue-the-mask';
import axios from 'axios'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios
axios.defaults.baseURL = 'http://crm.web-hands.ru/api/v1'

app.use(VueSweetalert2)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(VueTheMask)

app.mount('#app')
