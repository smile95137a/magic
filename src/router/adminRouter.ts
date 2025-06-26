// router/adminRoutes.ts
import { RouteRecordRaw } from 'vue-router';

import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import AdminLogin from '@/views/admin/AdminLogin.vue';
import AdminNotFound from '@/views/admin/AdminNotFound.vue';

import TeacherList from '@/views/admin/teacher/TeacherList.vue';
import TeacherForm from '@/views/admin/teacher/TeacherForm.vue';
import TeacherDetail from '@/views/admin/teacher/TeacherDetail.vue';
import TeacherBookingList from '@/views/admin/teacher/TeacherBookingList.vue';

import UserLanternPurchase from '@/views/admin/user/UserLanternPurchase.vue';
import UserOfferingPurchase from '@/views/admin/user/UserOfferingPurchase.vue';
import UserManagement from '@/views/admin/user/UserManagement.vue';
import UserForm from '@/views/admin/user/UserForm.vue';

import BannerManagement from '@/views/admin/banner/BannerManagement.vue';
import BannerForm from '@/views/admin/banner/BannerForm.vue';

import MallCategoryManagement from '@/views/admin/mall/MallCategoryManagement.vue';
import MallCategoryForm from '@/views/admin/mall/MallCategoryForm.vue';
import MallItemManagement from '@/views/admin/mall/MallItemManagement.vue';
import MallItemForm from '@/views/admin/mall/MallItemForm.vue';

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
      // 1. 老師資訊管理
      {
        path: 'teachers',
        children: [
          {
            path: '',
            name: 'TeacherList',
            component: TeacherList,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'add',
            name: 'TeacherAdd',
            component: TeacherForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'edit/:id',
            name: 'TeacherEdit',
            component: TeacherForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: ':id',
            name: 'TeacherDetail',
            component: TeacherDetail,
            meta: { requiresAuth: true, layout: 'admin' },
          },
        ],
      },

      // 2. 老師預約明細
      {
        path: 'teacher-bookings',
        component: TeacherBookingList,
      },

      // 3. user購買燈的明細
      {
        path: 'user-lantern-purchases',
        component: UserLanternPurchase,
      },

      // 4. user購買供品明細
      {
        path: 'user-offering-purchases',
        component: UserOfferingPurchase,
      },

      // 5. banner 管理
      {
        path: 'banners',
        children: [
          {
            path: '',
            name: 'BannerList',
            component: BannerManagement,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'add',
            name: 'BannerAdd',
            component: BannerForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'edit/:id',
            name: 'BannerEdit',
            component: BannerForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
        ],
      },

      // 6. 商城管理
      // 商城管理
      {
        path: 'mall',
        meta: { requiresAuth: true, layout: 'admin' },
        children: [
          {
            path: 'categories',
            name: 'MallCategoryList',
            component: MallCategoryManagement,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'categories/add',
            name: 'MallCategoryAdd',
            component: MallCategoryForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'categories/edit/:id',
            name: 'MallCategoryEdit',
            component: MallCategoryForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'items',
            name: 'MallItemList',
            component: MallItemManagement,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'items/add',
            name: 'MallItemAdd',
            component: MallItemForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'items/edit/:id',
            name: 'MallItemEdit',
            component: MallItemForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
        ],
      },

      // 7. 報表
      {
        path: 'reports/mall-purchases',
        component: MallReport,
      },

      // 8. 參數設定
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

      // 9. 使用者管理
      {
        path: 'users',
        children: [
          {
            path: '',
            name: 'UserList',
            component: UserManagement,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'add',
            name: 'UserAdd',
            component: UserForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
          {
            path: 'edit/:id',
            name: 'UserEdit',
            component: UserForm,
            meta: { requiresAuth: true, layout: 'admin' },
          },
        ],
      },

      // 404 for /admin/*
      {
        path: ':pathMatch(.*)*',
        name: 'AdminNotFound',
        component: AdminNotFound,
      },
    ],
  },
];
