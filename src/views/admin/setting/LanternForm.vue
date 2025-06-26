<template>
  <div class="lantern-form">
    <h2>{{ isEdit ? '編輯燈籠' : '新增燈籠' }}</h2>
    <form @submit.prevent="submit">
      <div>
        <label>名稱：</label>
        <input v-model="form.name" required />
      </div>
      <div>
        <label>價格：</label>
        <input type="number" v-model.number="form.price" required />
      </div>
      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  fetchLanternById,
  createLantern,
  updateLantern,
} from '@/services/admin/lanternApi';

const route = useRoute();
const router = useRouter();
const isEdit = route.name === 'LanternSettingEdit';
const lanternId = route.params.id as string;

const form = ref({
  name: '',
  price: 0,
});

onMounted(async () => {
  if (isEdit && lanternId) {
    const res = await fetchLanternById(lanternId);
    form.value = res.data;
  }
});

const submit = async () => {
  if (isEdit) {
    await updateLantern(lanternId, form.value);
    alert('更新成功');
  } else {
    await createLantern(form.value);
    alert('新增成功');
  }
  router.push('/admin/settings/lantern');
};
</script>

<style scoped lang="scss">
.lantern-form {
  h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 400px;
  }

  label {
    display: block;
    margin-bottom: 4px;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    align-self: flex-start;
    padding: 8px 16px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #2563eb;
  }
}
</style>
