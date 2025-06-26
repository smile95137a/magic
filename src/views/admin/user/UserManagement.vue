<template>
  <div class="user-list">
    <h1>使用者管理</h1>
    <button @click="goToAdd">新增使用者</button>

    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>Email</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="goToEdit(user.id)">編輯</button>
            <button @click="remove(user.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchUserList, deleteUser } from '@/services/admin/userApi';

const router = useRouter();
const users = ref<any[]>([]);

const load = async () => {
  const res = await fetchUserList();
  users.value = res.data;
};

const goToAdd = () => router.push('/admin/users/add');
const goToEdit = (id: number) => router.push(`/admin/users/edit/${id}`);
const remove = async (id: number) => {
  await deleteUser(id);
  await load();
  alert(`已刪除使用者 ID: ${id}`);
};

onMounted(() => {
  load();
});
</script>
<style scoped lang="scss">
.user-list {
  padding: 24px;

  h1 {
    font-size: 24px;
    margin-bottom: 16px;
    color: #374151;
  }

  button {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 16px;

    &:hover {
      background-color: #2563eb;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      background-color: #f3f4f6;
      font-weight: 600;
      color: #4b5563;
    }

    td {
      color: #374151;
    }

    img {
      height: 40px;
      object-fit: cover;
    }

    button {
      margin-right: 8px;
      padding: 6px 12px;
      font-size: 14px;
      background-color: #10b981;
      &:last-child {
        background-color: #ef4444;
      }

      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
