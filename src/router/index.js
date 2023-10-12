import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/places',
      name: 'places',
      component: () => import('../views/places/index.vue'),
    },
    {
      path: '/places/:id',
      name: 'places:id',
      component: () => import('../views/places/_id.vue')
    },
    {
      path: '/places/:id/:id',
      name: 'places:id:id',
      component: () => import('../views/places/last/_id.vue')
    },
  ]
})

export default router
