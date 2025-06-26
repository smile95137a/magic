<template>
  <div class="lantern-setting">
    <h1 class="lantern-setting__title">燈籠設定</h1>
    <button class="lantern-setting__add-btn" @click="goToAdd">新增燈籠</button>

    <table class="lantern-setting__table">
      <thead>
        <tr>
          <th>名稱</th>
          <th>價格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in lanterns" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button @click="goToEdit(item.id)">編輯</button>
            <button @click="remove(item.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchLanternList, deleteLantern } from '@/services/admin/lanternApi';

const router = useRouter();
const lanterns = ref<any[]>([]);

const load = async () => {
  const res = await fetchLanternList();
  lanterns.value = res.data;
};

const goToAdd = () => router.push('/admin/settings/lantern/add');
const goToEdit = (id: number) =>
  router.push(`/admin/settings/lantern/edit/${id}`);
const remove = async (id: number) => {
  await deleteLantern(id);
  await load();
  alert(`已刪除燈籠 ID: ${id}`);
};

onMounted(() => {
  load();
});
</script>

<style scoped lang="scss">
.lantern-setting {
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin: 16px 0;
  }

  &__add-btn {
    margin-bottom: 16px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px;
      border: 1px solid #ccc;
    }

    th {
      background: #f3f4f6;
    }
  }
}
</style>
