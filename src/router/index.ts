import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import { useAuthStore } from '@/stores';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: { layout: 'default' },
  },
  {
    path: '/login',
    component: Login,
    meta: { layout: 'default' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { layout: 'default' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();
//   const token = auth.token;

//   if (to.path.startsWith('/home') && !token) {
//     next('/login');
//   } else if (to.path === '/login' && token) {
//     next('/home');
//   } else {
//     next();
//   }
// });

export default router;
