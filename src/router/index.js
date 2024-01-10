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
        layout: 'User',
        pageTitle: 'Места'
      }
    },
    {
      path: '/places/:id',
      name: 'places:id',
      component: () => import('../views/places/_id.vue'),
      meta: {
        layout: 'User',
        pageTitle: 'Места'
      }
    },
    {
      path: '/places/:id/:id',
      name: 'places:id:id',
      component: () => import('../views/places/last/_id.vue'),
      meta: {
        layout: 'User',
        pageTitle: 'Места'
      }
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/clients/index.vue'),
      meta: {
        layout: 'User',
        pageTitle: 'Клиенты'
      }
    },
    {
      path: '/clients/:id',
      name: 'clients:id',
      component: () => import('../views/clients/_id.vue'),
      meta: {
        layout: 'User',
        pageTitle: 'Клиенты'
      }
    },
    {
      path: '/owners',
      name: 'owners',
      component: () => import('../views/owners/index.vue'),
      meta: {
        layout: 'User',
        pageTitle: 'Собственники'
      }
    },
    {
      path: '/owners/:id',
      name: 'owners:id',
      component: () => import('../views/owners/_id.vue'),
      meta: {
        layout: 'User',
        pageTitle: 'Собственники'
      }
    },
    {
      path: '/objects',
      name: 'objects',
      component: () => import('../views/objects/index.vue'),
      meta: {
        layout: 'User',
        pageTitle: 'Объекты'
      }
    },
    {
      path: '/objects/:id',
      name: 'objects:id',
      component: () => import('../views/objects/_id.vue'),
      meta: {
        layout: 'User',
        pageTitle: 'Объекты'
      }
    },
    {
      path: '/deals',
      name: 'deals',
      component: () => import('../views/deals/index.vue'),
      meta: {
        layout: 'User',
        pageTitle: 'Сделки'
      }
    },
  ]
})
router.beforeEach(loadLayoutMiddleware);
router.beforeEach( (to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  console.log("found:", loggedIn)
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    console.log("notfound:", loggedIn)
    next('/login');
  } else {
    next();
  }
});

export default router
