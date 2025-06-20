// 前台路由
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/front/Home.vue';
import Login from '@/views/front/Login.vue';
import Register from '@/views/front/Register.vue';
import Divination from '@/views/front/Divination.vue';
import LightProduct from '@/views/front/LightProduct.vue';
import Worship from '@/views/front/Worship.vue';
import GodOffering from '@/views/front/GodOffering.vue';
import Blessing from '@/views/front/Blessing.vue';
import Master from '@/views/front/Master.vue';
import Store from '@/views/front/Store.vue';
import NotFound from '@/views/front/NotFound.vue';
import MemberCenter from '@/views/front/MemberCenter/index.vue';
import MemberProfile from '@/views/front/MemberCenter/MemberProfile.vue';
import PurchaseHistory from '@/views/front/MemberCenter/PurchaseHistory.vue';
import MyBlessings from '@/views/front/MemberCenter/MyBlessings.vue';
import OrderHistory from '@/views/front/MemberCenter/OrderHistory.vue';

export const frontRoutes: Array<RouteRecordRaw> = [
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
      { path: '', redirect: { name: 'MemberProfile' } },
      {
        path: 'memberProfile',
        name: 'MemberProfile',
        component: MemberProfile,
        meta: { layout: 'default' },
      },
      {
        path: 'purchaseHistory',
        name: 'PurchaseHistory',
        component: PurchaseHistory,
        meta: { layout: 'default' },
      },
      {
        path: 'myBlessings',
        name: 'MyBlessings',
        component: MyBlessings,
        meta: { layout: 'default' },
      },
      {
        path: 'orderHistory',
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
