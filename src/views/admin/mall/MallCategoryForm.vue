<template>
  <div class="category-form">
    <h2>{{ isEdit ? '編輯分類' : '新增分類' }}</h2>
    <form @submit.prevent="submit">
      <div>
        <label>分類名稱：</label>
        <input v-model="form.name" required />
      </div>
      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  createMallCategory,
  updateMallCategory,
  fetchMallCategoryById,
} from '@/services/admin/mallCategoryApi';

const router = useRouter();
const route = useRoute();
const isEdit = route.name === 'MallCategoryEdit';
const categoryId = route.params.id as string;

const form = ref({ name: '' });

onMounted(async () => {
  if (isEdit) {
    const res = await fetchMallCategoryById(categoryId);
    form.value = res.data;
  }
});

const submit = async () => {
  if (isEdit) {
    await updateMallCategory(categoryId, form.value);
    alert('分類已更新');
  } else {
    await createMallCategory(form.value);
    alert('分類已新增');
  }
  router.push('/admin/mall/categories');
};
</script>
