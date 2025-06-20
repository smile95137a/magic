import { createRouter, createWebHistory } from 'vue-router';
import { frontRoutes } from './frontRouter';
import { adminRoutes } from './adminRouter';

const routes = [...frontRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// 若有身份驗證邏輯也可寫在這
// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();
//   const token = auth.token;
//   if (to.meta.requiresAuth && !token) next('/login');
//   else next();
// });

export default router;
