import { RouteRecordRaw } from 'vue-router';
import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import AdminLogin from '@/views/admin/AdminLogin.vue';
import AdminNotFound from '@/views/admin/AdminNotFound.vue';

import adminOfferingRoutes from './modules/adminOfferingRoutes';
import adminMasterRoutes from './modules/adminMasterRoutes';
import adminBannerRoutes from './modules/adminBannerRoutes';
import adminMallRoutes from './modules/adminMallRoutes';
import adminUserRoutes from './modules/adminUserRoutes';

import UserLanternPurchase from '@/views/admin/user/UserLanternPurchase.vue';
import UserOfferingPurchase from '@/views/admin/user/UserOfferingPurchase.vue';
import MallReport from '@/views/admin/report/MallPurchaseReport.vue';
import LanternSetting from '@/views/admin/setting/LanternSetting.vue';
import LanternForm from '@/views/admin/setting/LanternForm.vue';
import LanternRecommend from '@/views/admin/setting/LanternRecommend.vue';
import LanternRecommendForm from '@/views/admin/setting/LanternRecommendForm.vue';

export const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: '/admin/login',
    component: AdminLogin,
    meta: { layout: 'admin' },
  },
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, layout: 'admin' },
    children: [
      adminOfferingRoutes,
      adminMasterRoutes,
      adminBannerRoutes,
      adminMallRoutes,
      adminUserRoutes,
      {
        path: 'user-lantern-purchases',
        component: UserLanternPurchase,
        meta: { requiresAuth: true, layout: 'admin' },
      },
      {
        path: 'user-offering-purchases',
        component: UserOfferingPurchase,
        meta: { requiresAuth: true, layout: 'admin' },
      },
      {
        path: 'reports/mall-purchases',
        component: MallReport,
        meta: { requiresAuth: true, layout: 'admin' },
      },
      {
        path: 'settings',
        meta: { requiresAuth: true, layout: 'admin' },
        children: [
          {
            path: 'lantern',
            name: 'LanternSetting',
            component: LanternSetting,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'lantern/add',
            name: 'LanternAdd',
            component: LanternForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'lantern/edit/:id',
            name: 'LanternEdit',
            component: LanternForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'lantern-recommend',
            name: 'LanternRecommend',
            component: LanternRecommend,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'lantern-recommend/add',
            name: 'LanternRecommendAdd',
            component: LanternRecommendForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'lantern-recommend/edit/:id',
            name: 'LanternRecommendEdit',
            component: LanternRecommendForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
        ],
      },
      {
        path: ':pathMatch(.*)*',
        name: 'AdminNotFound',
        component: AdminNotFound,
      },
    ],
  },
];

export default adminRoutes;