<template>
  <div class="user-form">
    <h2>{{ isEdit ? '編輯使用者' : '新增使用者' }}</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>姓名：</label>
        <input v-bind="nameProps" />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>
      <div>
        <label>Email：</label>
        <input type="email" v-bind="emailProps" />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>
      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import {
  fetchUserById,
  createUser,
  updateUser,
} from '@/services/admin/userApi';

const router = useRouter();
const route = useRoute();
const isEdit = route.name === 'UserEdit';
const userId = route.params.id as string;

// 驗證 schema
const schema = object({
  name: string().required('姓名為必填'),
  email: string().email('請輸入有效 Email').required('Email 為必填'),
});

// useForm 設定
const { defineField, handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
  },
});

// 欄位綁定
const [name, nameProps] = defineField('name');
const [email, emailProps] = defineField('email');

// 編輯時載入資料
onMounted(async () => {
  if (isEdit) {
    const res = await fetchUserById(userId);
    setValues(res.data);
  }
});

// 提交處理
const onSubmit = handleSubmit(async (values) => {
  if (isEdit) {
    await updateUser(userId, values);
    alert('更新成功');
  } else {
    await createUser(values);
    alert('新增成功');
  }
  router.push('/admin/users');
});
</script>

<style scoped lang="scss">
.user-form {
  max-width: 480px;
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  h2 {
    font-size: 20px;
    margin-bottom: 24px;
    color: #374151;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 6px;
      color: #4b5563;
    }

    input {
      padding: 10px 14px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      color: #111827;
      width: 100%;
      box-sizing: border-box;

      &:focus {
        border-color: #60a5fa;
        outline: none;
      }
    }

    .error {
      color: #dc2626;
      font-size: 13px;
      margin-top: -8px;
    }

    button[type='submit'] {
      align-self: flex-start;
      padding: 10px 18px;
      background-color: #3b82f6;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: #2563eb;
      }
    }
  }
}
</style>
