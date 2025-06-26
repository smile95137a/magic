<template>
  <div class="lantern-recommend-form">
    <h2>{{ isEdit ? '編輯推薦燈籠' : '新增推薦燈籠' }}</h2>
    <form @submit.prevent="submit">
      <div>
        <label>推薦標題：</label>
        <input v-model="form.title" required />
      </div>
      <div>
        <label>描述：</label>
        <textarea v-model="form.description" rows="3" required></textarea>
      </div>
      <div>
        <label>圖片連結：</label>
        <input v-model="form.imageUrl" />
      </div>
      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  fetchLanternRecommendById,
  createLanternRecommend,
  updateLanternRecommend,
} from '@/services/admin/lanternRecommendApi';

const route = useRoute();
const router = useRouter();
const isEdit = route.name === 'LanternRecommendEdit';
const recommendId = route.params.id as string;

const form = ref({
  title: '',
  description: '',
  imageUrl: '',
});

onMounted(async () => {
  if (isEdit && recommendId) {
    const res = await fetchLanternRecommendById(recommendId);
    form.value = res.data;
  }
});

const submit = async () => {
  if (isEdit) {
    await updateLanternRecommend(recommendId, form.value);
    alert('更新成功');
  } else {
    await createLanternRecommend(form.value);
    alert('新增成功');
  }
  router.push('/admin/settings/lantern-recommend');
};
</script>

<style scoped lang="scss">
.lantern-recommend-form {
  h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 500px;
  }

  label {
    display: block;
    margin-bottom: 4px;
  }

  input,
  textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  button {
    align-self: flex-start;
    padding: 8px 16px;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #059669;
  }
}
</style>
