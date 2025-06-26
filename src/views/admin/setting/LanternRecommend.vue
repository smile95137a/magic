<template>
  <div class="lantern-recommend">
    <h1>推薦燈籠管理</h1>
    <button @click="goToAdd">新增推薦</button>

    <table>
      <thead>
        <tr>
          <th>標題</th>
          <th>描述</th>
          <th>圖片</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>
            <img
              :src="item.imageUrl"
              alt="圖片"
              width="100"
              v-if="item.imageUrl"
            />
          </td>
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
import {
  fetchLanternRecommendList,
  deleteLanternRecommend,
} from '@/services/admin/lanternRecommendApi';

const router = useRouter();
const list = ref<any[]>([]);

const load = async () => {
  const res = await fetchLanternRecommendList();
  list.value = res.data;
};

const goToAdd = () => router.push('/admin/settings/lantern-recommend/add');
const goToEdit = (id: number) =>
  router.push(`/admin/settings/lantern-recommend/edit/${id}`);

const remove = async (id: number) => {
  if (confirm('確定要刪除這筆推薦嗎？')) {
    await deleteLanternRecommend(id);
    await load();
    alert('刪除成功');
  }
};

onMounted(() => {
  load();
});
</script>

<style scoped lang="scss">
.lantern-recommend {
  h1 {
    font-size: 22px;
    margin-bottom: 16px;
  }

  button {
    margin: 8px 8px 16px 0;
    padding: 6px 12px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #2563eb;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      padding: 8px;
      border: 1px solid #ccc;
      text-align: left;
    }

    img {
      border: 1px solid #eee;
      border-radius: 4px;
    }
  }
}
</style>
