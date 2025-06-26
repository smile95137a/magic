<template>
  <div class="item-form">
    <h2>{{ isEdit ? '編輯商品' : '新增商品' }}</h2>
    <form @submit.prevent="submit">
      <div>
        <label>商品名稱：</label>
        <input v-model="form.name" required />
      </div>
      <div>
        <label>分類：</label>
        <select v-model="form.categoryId" required>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  fetchMallItemById,
  createMallItem,
  updateMallItem,
} from '@/services/admin/mallItemApi';
import { fetchMallCategoryList } from '@/services/admin/mallCategoryApi';

const router = useRouter();
const route = useRoute();
const isEdit = route.name === 'MallItemEdit';
const itemId = route.params.id as string;

const form = ref({ name: '', categoryId: null });
const categories = ref<any[]>([]);

onMounted(async () => {
  const catRes = await fetchMallCategoryList();
  categories.value = catRes.data;

  if (isEdit) {
    const itemRes = await fetchMallItemById(itemId);
    form.value = itemRes.data;
  }
});

const submit = async () => {
  if (isEdit) {
    await updateMallItem(itemId, form.value);
    alert('商品已更新');
  } else {
    await createMallItem(form.value);
    alert('商品已新增');
  }
  router.push('/admin/mall/items');
};
</script>
