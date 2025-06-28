<template>
  <div class="item-form">
    <h2>{{ isEdit ? '編輯商品' : '新增商品' }}</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>商品名稱：</label>
        <input v-bind="nameProps" />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div>
        <label>分類：</label>
        <select v-bind="categoryIdProps">
          <option value="">請選擇分類</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>
        <span class="error" v-if="errors.categoryId">{{ errors.categoryId }}</span>
      </div>

      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { object, string, number } from 'yup';
import {
  fetchMallItemById,
  createMallItem,
  updateMallItem,
} from '@/services/admin/mallItemApi';
import { fetchMallCategoryList } from '@/services/admin/mallCategoryApi';

const route = useRoute();
const router = useRouter();
const isEdit = route.name === 'MallItemEdit';
const itemId = route.params.id as string;

// 1. schema 驗證規則
const schema = object({
  name: string().required('商品名稱為必填'),
  categoryId: number()
    .typeError('請選擇分類')
    .required('分類為必選'),
});

// 2. useForm
const { defineField, handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    categoryId: '',
  },
});

// 3. 欄位綁定
const [name, nameProps] = defineField('name');
const [categoryId, categoryIdProps] = defineField('categoryId');

// 4. 分類資料載入
const categories = ref<any[]>([]);

onMounted(async () => {
  const catRes = await fetchMallCategoryList();
  categories.value = catRes.data;

  if (isEdit) {
    const itemRes:any = await fetchMallItemById(itemId);
    setValues({
      name: itemRes.data.name,
      categoryId: itemRes.data.categoryId,
    });
  }
});

// 5. 提交表單
const onSubmit = handleSubmit(async (values) => {
  if (isEdit) {
    await updateMallItem(itemId, values);
    alert('商品已更新');
  } else {
    await createMallItem(values);
    alert('商品已新增');
  }
  router.push('/admin/mall/items');
});
</script>

<style scoped lang="scss">
.item-form {
  padding: 24px;
  max-width: 480px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 22px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 24px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    label {
      font-weight: 500;
      margin-bottom: 4px;
      display: block;
      color: #34495e;
    }

    input,
    select {
      padding: 10px 12px;
      font-size: 14px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      outline: none;
      width: 100%;

      &:focus {
        border-color: #409eff;
        box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
      }
    }

    .error {
      color: #e74c3c;
      font-size: 13px;
      margin-top: -8px;
    }

    button[type='submit'] {
      align-self: center;
      padding: 10px 24px;
      font-size: 15px;
      background-color: #409eff;
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 12px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #66b1ff;
      }
    }
  }
}
</style>
