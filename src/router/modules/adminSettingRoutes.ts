import { RouteRecordRaw } from 'vue-router';
import LanternSetting from '@/views/admin/setting/LanternSetting.vue';
import LanternRecommend from '@/views/admin/setting/LanternRecommend.vue';
import SenderInfoSetting from '@/views/admin/setting/SenderInfoSetting.vue'; // ✅ 新增

const adminSettingRoutes: RouteRecordRaw = {
  path: 'settings',
  meta: { requiresAuth: true, layout: 'admin' },
  children: [
    {
      path: 'lantern',
      name: 'AdminSettingLantern',
      component: LanternSetting,
      meta: { requiresAuth: true, layout: 'admin' },
    },
    {
      path: 'lantern-recommend',
      name: 'AdminSettingLanternRecommend',
      component: LanternRecommend,
      meta: { requiresAuth: true, layout: 'admin' },
    },
    {
      path: 'sender-info',
      name: 'AdminSettingSenderInfo',
      component: SenderInfoSetting,
      meta: { requiresAuth: true, layout: 'admin' },
    },
  ],
};

export default adminSettingRoutes;
