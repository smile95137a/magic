<template>
  <div class="category-form">
    <h2>{{ isEdit ? '編輯分類' : '新增分類' }}</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>分類名稱：</label>
        <input v-bind="nameProps" />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>
      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import {
  createMallCategory,
  updateMallCategory,
  fetchMallCategoryById,
} from '@/services/admin/mallCategoryApi';

// route 判斷
const router = useRouter();
const route = useRoute();
const isEdit = route.name === 'MallCategoryEdit';
const categoryId = route.params.id as string;

// 驗證規則
const schema = object({
  name: string().required('分類名稱為必填'),
});

// useForm 初始化
const { defineField, handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
  },
});

// 綁定欄位
const [name, nameProps] = defineField('name');

// 載入資料（編輯模式）
onMounted(async () => {
  if (isEdit) {
    const res:any = await fetchMallCategoryById(categoryId);
    setValues({ name: res.data.name });
  }
});

// 提交處理
const onSubmit = handleSubmit(async (values) => {
  if (isEdit) {
    await updateMallCategory(categoryId, values);
    alert('分類已更新');
  } else {
    await createMallCategory(values);
    alert('分類已新增');
  }
  router.push('/admin/mall/categories');
});
</script>

<style scoped lang="scss">
.category-form {
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

    input {
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
