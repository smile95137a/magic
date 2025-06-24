// router/adminRoutes.ts
import { RouteRecordRaw } from 'vue-router';

import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import AdminLogin from '@/views/admin/AdminLogin.vue';
import AdminNotFound from '@/views/admin/AdminNotFound.vue';

import TeacherList from '@/views/admin/teacher/TeacherList.vue';
import TeacherDetail from '@/views/admin/teacher/TeacherDetail.vue';
import TeacherBookingList from '@/views/admin/teacher/TeacherBookingList.vue';

import UserLanternPurchase from '@/views/admin/user/UserLanternPurchase.vue';
import UserOfferingPurchase from '@/views/admin/user/UserOfferingPurchase.vue';

import BannerManagement from '@/views/admin/banner/BannerManagement.vue';
import BannerForm from '@/views/admin/banner/BannerForm.vue';

import MallCategoryManagement from '@/views/admin/mall/CategoryManagement.vue';
import MallItemManagement from '@/views/admin/mall/ItemManagement.vue';

import MallReport from '@/views/admin/report/MallPurchaseReport.vue';

import LanternSetting from '@/views/admin/setting/LanternSetting.vue';
import LanternRecommend from '@/views/admin/setting/LanternRecommend.vue';

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

  // 1. 老師資訊管理
  {
    path: '/admin/teachers',
    component: TeacherList,
    meta: { requiresAuth: true, layout: 'admin' },
  },
  {
    path: '/admin/teachers/:id',
    component: TeacherDetail,
    meta: { requiresAuth: true, layout: 'admin' },
  },

  // 2. 老師預約明細
  {
    path: '/admin/teacher-bookings',
    component: TeacherBookingList,
    meta: { requiresAuth: true, layout: 'admin' },
  },

  // 3. user購買燈的明細
  {
    path: '/admin/user-lantern-purchases',
    component: UserLanternPurchase,
    meta: { requiresAuth: true, layout: 'admin' },
  },

  // 4. user購買供品明細
  {
    path: '/admin/user-offering-purchases',
    component: UserOfferingPurchase,
    meta: { requiresAuth: true, layout: 'admin' },
  },

  // 5. banner 管理
  {
    path: '/admin/banners',
    component: BannerManagement,
    meta: { requiresAuth: true, layout: 'admin' },
  },
  {
    path: '/admin/banners/add',
    component: BannerForm,
  },
  {
    path: '/admin/banners/edit/:id',
    component: BannerForm,
  },

  // 6. 商城管理：分類與商品
  {
    path: '/admin/mall/categories',
    component: MallCategoryManagement,
    meta: { requiresAuth: true, layout: 'admin' },
  },
  {
    path: '/admin/mall/items',
    component: MallItemManagement,
    meta: { requiresAuth: true, layout: 'admin' },
  },

  // 7. 報表：商城購買明細
  {
    path: '/admin/reports/mall-purchases',
    component: MallReport,
    meta: { requiresAuth: true, layout: 'admin' },
  },

  // 8. 參數設定：燈籠購買、推薦
  {
    path: '/admin/settings/lantern',
    component: LanternSetting,
    meta: { requiresAuth: true, layout: 'admin' },
  },
  {
    path: '/admin/settings/lantern-recommend',
    component: LanternRecommend,
    meta: { requiresAuth: true, layout: 'admin' },
  },

  // Not Found
  {
    path: '/admin/:pathMatch(.*)*',
    name: 'AdminNotFound',
    component: AdminNotFound,
    meta: { layout: 'admin' },
  },
];
