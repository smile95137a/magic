import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import MemberCenter from '@/views/MemberCenter/index.vue';
import Divination from '@/views/Divination.vue';
import LightProduct from '@/views/LightProduct.vue';
import Worship from '@/views/Worship.vue';
import GodOffering from '@/views/GodOffering.vue';
import Blessing from '@/views/Blessing.vue';
import Master from '@/views/Master.vue';
import Store from '@/views/Store.vue';
import NotFound from '@/views/NotFound.vue';

import MemberProfile from '@/views/MemberCenter/MemberProfile.vue';
import MyBlessings from '@/views/MemberCenter/MyBlessings.vue';
import OrderHistory from '@/views/MemberCenter/OrderHistory.vue';
import PurchaseHistory from '@/views/MemberCenter/PurchaseHistory.vue';

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
    path: '/register',
    component: Register,
    meta: { layout: 'default' },
  },
  {
    path: '/member-center',
    component: MemberCenter,
    meta: { requiresAuth: true, layout: 'default' },
    children: [
      {
        path: '',
        redirect: { name: 'MemberProfile' },
      },
      {
        path: 'profile',
        name: 'MemberProfile',
        component: MemberProfile,
        meta: { layout: 'default' },
      },
      {
        path: 'history',
        name: 'PurchaseHistory',
        component: PurchaseHistory,
        meta: { layout: 'default' },
      },
      {
        path: 'blessing',
        name: 'MyBlessings',
        component: MyBlessings,
        meta: { layout: 'default' },
      },
      {
        path: 'orders',
        name: 'OrderHistory',
        component: OrderHistory,
        meta: { layout: 'default' },
      },
    ],
  },
  {
    path: '/divination',
    component: Divination,
    meta: { layout: 'default' },
  },

  {
    path: '/worship',
    component: Worship,
    meta: { layout: 'default' },
  },
  {
    path: '/godOffering',
    component: GodOffering,
    meta: { layout: 'default' },
  },
  {
    path: '/lightProduct',
    component: LightProduct,
    meta: { layout: 'default' },
  },
  {
    path: '/blessing',
    component: Blessing,
    meta: { layout: 'default' },
  },
  {
    path: '/master',
    component: Master,
    meta: { layout: 'default' },
  },
  {
    path: '/store',
    component: Store,
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

// ✅ 如你要啟用身份驗證保護路由，取消註解以下部分
// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();
//   const token = auth.token;

//   if (to.path.startsWith('/member') && !token) {
//     next('/login');
//   } else if (to.path === '/login' && token) {
//     next('/home');
//   } else {
//     next();
//   }
// });

export default router;
