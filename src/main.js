
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import Antd from 'ant-design-vue';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'ant-design-vue/dist/reset.css';
import axios from 'axios'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios
axios.defaults.baseURL = 'http://crm.web-hands.ru/api/v1'

// // Request interceptor
// axios.interceptors.request.use((config) => {
//     // Modify the request config here
//     const token = localStorage.getItem('authToken')
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })
  
// // Response interceptor
// axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response) {
//         if (error.response.status === 401) {
//           // Redirect to login page
//           router.push('/login')
//         } else {
//           // Show a generic error message
//           alert('An error occurred. Please try again later.')
//         }
//       }
//       return Promise.reject(error)
//     },
// );

app.use(VueSweetalert2)
app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
