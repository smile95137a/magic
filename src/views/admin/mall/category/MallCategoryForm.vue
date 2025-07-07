<template>
  <div class="category-form">
    <h2 class="form__title">{{ isEdit ? '編輯分類' : '新增分類' }}</h2>
    <form @submit.prevent="onSubmit" class="form">
      <div class="form__group">
        <label class="form__label">分類名稱</label>
        <input v-model="categoryName" v-bind="categoryNameAttrs" class="form__input" />
        <span class="form__error" v-if="errors.categoryName">{{ errors.categoryName }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">描述</label>
        <input v-model="description" class="form__input" />
      </div>

      <div class="form__group">
        <label class="form__label">排序</label>
        <input type="number" v-model="sortOrder" v-bind="sortOrderAttrs" class="form__input" />
        <span class="form__error" v-if="errors.sortOrder">{{ errors.sortOrder }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">啟用</label>
        <input type="checkbox" v-model="values.isActive" class="form__checkbox" />
      </div>

      <div class="form__actions">
        <button type="button" class="form__button form__button--secondary" @click="goBack">取消</button>
        <button type="submit" class="form__button form__button--primary">儲存</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { object, string, number } from 'yup';
import { api } from '@/services/FrontAPI';
import type { ModifyCategoryAdminRequest } from '@/vite-env';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string | undefined;
const isEdit = !!id;

// schema 定義
const schema = object({
  categoryName: string().required('分類名稱為必填'),
  sortOrder: number().required('排序為必填').min(0, '排序不可小於 0'),
});

// useForm
const {
  handleSubmit,
  defineField,
  errors,
  values,
  setValues,
} = useForm<ModifyCategoryAdminRequest>({
  validationSchema: schema,
  initialValues: {
    categoryId: 0,
    categoryName: '',
    description: '',
    sortOrder: 0,
    isActive: true,
  },
});

// 定義欄位綁定
const [categoryName, categoryNameAttrs] = defineField('categoryName');
const [sortOrder, sortOrderAttrs] = defineField('sortOrder');
const [description] = defineField('description'); // 無驗證可不綁 attrs

const goBack = () => router.push('/admin/mall/categories');

const onSubmit = handleSubmit(async (formValues) => {
  if (isEdit) {
    await api.post('/admin/product-category/edit', formValues);
  } else {
    await api.post('/admin/product-category/add', formValues);
  }
  goBack();
});

onMounted(async () => {
  if (isEdit) {
    const res = await api.get(`/admin/product-category/${id}`);
    setValues(res.data);
  }
});
</script>
