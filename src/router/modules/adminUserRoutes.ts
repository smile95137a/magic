import { RouteRecordRaw } from 'vue-router';
import UserManagement from '@/views/admin/user/UserManagement.vue';
import UserForm from '@/views/admin/user/UserForm.vue';

const adminUserRoutes: RouteRecordRaw = {
  path: 'users',
  meta: { requiresAuth: true, layout: 'admin' },
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
};

export default adminUserRoutes;
