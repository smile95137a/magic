import { RouteRecordRaw } from 'vue-router';
import UserList from '@/views/admin/users/UserList.vue';

const adminUserRoutes: RouteRecordRaw = {
  path: '/admin/users',
  name: 'AdminUserList',
  component: UserList,
  meta: {
    requiresAuth: true,
    layout: 'admin',
    title: '會員管理',
  },
};

export default adminUserRoutes;
