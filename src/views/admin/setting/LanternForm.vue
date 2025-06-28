<template>
  <div class="lantern-form">
    <h2>{{ isEdit ? '編輯燈籠' : '新增燈籠' }}</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>名稱：</label>
        <input v-bind="nameProps" />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div>
        <label>價格：</label>
        <input type="number" v-bind="priceProps" />
        <span class="error" v-if="errors.price">{{ errors.price }}</span>
      </div>

      <button type="submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { object, string, number } from 'yup';
import {
  fetchLanternById,
  createLantern,
  updateLantern,
} from '@/services/admin/lanternApi';

// 判斷模式
const route = useRoute();
const router = useRouter();
const isEdit = route.name === 'LanternSettingEdit';
const lanternId = route.params.id as string;

// 驗證規則
const schema = object({
  name: string().required('名稱為必填'),
  price: number()
    .typeError('價格需為數字')
    .required('價格為必填')
    .min(0, '價格不得為負數'),
});

// 初始化表單
const { defineField, handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
  },
});

// 欄位綁定
const [name, nameProps] = defineField('name');
const [price, priceProps] = defineField('price');

// 載入資料（編輯模式）
onMounted(async () => {
  if (isEdit && lanternId) {
    const res:any = await fetchLanternById(lanternId);
    setValues({
      name: res.data.name,
      price: res.data.price,
    });
  }
});

// 提交表單
const onSubmit = handleSubmit(async (values) => {
  if (isEdit) {
    await updateLantern(lanternId, values);
    alert('更新成功');
  } else {
    await createLantern(values);
    alert('新增成功');
  }
  router.push('/admin/settings/lantern');
});
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
    width: 100%;
  }

  .error {
    color: #e74c3c;
    font-size: 13px;
    margin-top: -8px;
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
