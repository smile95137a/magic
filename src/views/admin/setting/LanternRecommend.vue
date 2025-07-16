<template>
  <div class="admin-list">
    <h1 class="admin-list__title">推薦燈品管理</h1>
    <button class="admin-list__add-btn" @click="goToAdd">新增推薦燈品</button>

    <table class="admin-list__table" v-if="lanterns.length">
      <thead>
        <tr>
          <th>燈品名稱</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lanternId in lanterns" :key="lanternId">
          <td>{{ getLanternLabel(lanternId) }}</td>
          <td>
            <button @click="goToEdit" class="admin-list__edit-btn">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>尚未設定推薦燈品</p>
  </div>
</template>

<script setup lang="ts">
import { fetchPromotionLanternList } from '@/services/admin/systemConfigService';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const lanterns = ref<string[]>([]);

// 固定選項（如有 API 可改為動態載入）
const lanternOptions = [
  { label: '平安燈', value: 'peace' },
  { label: '光明燈', value: 'light' },
  { label: '財神燈', value: 'wealth' },
  { label: '文昌燈', value: 'wisdom' },
  { label: '姻緣燈', value: 'love' },
];

const getLanternLabel = (value: string) =>
  lanternOptions.find((opt) => opt.value === value)?.label || value;

const loadData = async () => {
  try {
    const res = await fetchPromotionLanternList();
    if (res.success) lanterns.value = res.data;
  } catch {}
};

const goToAdd = () => router.push('/admin/settings/lantern-recommend/add');
// 編輯直接導去 add 頁（單一畫面）
const goToEdit = () => router.push('/admin/lantern-recommend/add');

onMounted(() => {
  loadData();
});
</script>
