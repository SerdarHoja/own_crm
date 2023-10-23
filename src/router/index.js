import { createRouter, createWebHistory } from 'vue-router'
import {loadLayoutMiddleware} from "@/router/middleware/loadLayoutMiddleware";
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'Auth'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        layout: 'Auth'
      }
    },
    {
      path: '/places',
      name: 'places',
      component: () => import('../views/places/index.vue'),
      meta: {
        layout: 'User'
      }
    },
    {
      path: '/places/:id',
      name: 'places:id',
      component: () => import('../views/places/_id.vue'),
      meta: {
        layout: 'User'
      }
    },
    {
      path: '/places/:id/:id',
      name: 'places:id:id',
      component: () => import('../views/places/last/_id.vue'),
      meta: {
        layout: 'User'
      }
    },
  ]
})
router.beforeEach(loadLayoutMiddleware);
router.beforeEach( (to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
