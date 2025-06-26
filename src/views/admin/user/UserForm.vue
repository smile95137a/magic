<template>
  <div class="user-form">
    <h2>{{ isEdit ? '編輯使用者' : '新增使用者' }}</h2>
    <form @submit.prevent="submit">
      <div>
        <label>姓名：</label>
        <input v-model="form.name" required />
      </div>
      <div>
        <label>Email：</label>
        <input v-model="form.email" type="email" required />
      </div>
      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import {
  fetchUserById,
  createUser,
  updateUser,
} from '@/services/admin/userApi';

const router = useRouter();
const route = useRoute();
const isEdit = route.name === 'UserEdit';
const userId = route.params.id as string;

const form = ref({ name: '', email: '' });

onMounted(async () => {
  if (isEdit) {
    const res = await fetchUserById(userId);
    form.value = res.data;
  }
});

const submit = async () => {
  if (isEdit) {
    await updateUser(userId, form.value);
    alert('更新成功');
  } else {
    await createUser(form.value);
    alert('新增成功');
  }
  router.push('/admin/users');
};
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
