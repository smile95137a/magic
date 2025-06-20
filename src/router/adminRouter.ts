// 後台路由
import { RouteRecordRaw } from 'vue-router';
import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import AdminLogin from '@/views/admin/AdminLogin.vue';
import AdminNotFound from '@/views/admin/AdminNotFound.vue';

export const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: '/admin/login',
    component: AdminLogin,
    meta: { layout: 'admin' },
  },
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, layout: 'admin' },
  },
  {
    path: '/admin/:pathMatch(.*)*',
    name: 'AdminNotFound',
    component: AdminNotFound,
    meta: { layout: 'admin' },
  },
];
