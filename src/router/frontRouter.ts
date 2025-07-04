// 前台路由
import { RouteRecordRaw } from 'vue-router';
import FrontLayout from '@/layouts/FrontLayout.vue';
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
    component: FrontLayout,
    meta: { layout: 'default' },
    children: [
      { path: '', redirect: '/home' },
      { path: 'home', component: Home },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      {
        path: 'member-center',
        component: MemberCenter,
        meta: { requiresAuth: true },
        children: [
          { path: '', redirect: { name: 'MemberProfile' } },
          {
            path: 'memberProfile',
            name: 'MemberProfile',
            component: MemberProfile,
          },
          {
            path: 'purchaseHistory',
            name: 'PurchaseHistory',
            component: PurchaseHistory,
          },
          {
            path: 'myBlessings',
            name: 'MyBlessings',
            component: MyBlessings,
          },
          {
            path: 'orderHistory',
            name: 'OrderHistory',
            component: OrderHistory,
          },
        ],
      },
      { path: 'divination', component: Divination },
      { path: 'worship', component: Worship },
      { path: 'godOffering', component: GodOffering },
      { path: 'lightProduct', component: LightProduct },
      { path: 'blessing', component: Blessing },
      { path: 'master', component: Master },
      { path: 'store', component: Store },
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
      },
    ],
  },
];
