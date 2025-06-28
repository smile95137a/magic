<template>
  <div class="lantern-recommend-form">
    <h2>{{ isEdit ? '編輯推薦燈籠' : '新增推薦燈籠' }}</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>推薦標題：</label>
        <input v-bind="titleProps" />
        <span class="error" v-if="errors.title">{{ errors.title }}</span>
      </div>

      <div>
        <label>描述：</label>
        <textarea rows="3" v-bind="descriptionProps"></textarea>
        <span class="error" v-if="errors.description">{{ errors.description }}</span>
      </div>

      <div>
        <label>圖片連結：</label>
        <input v-bind="imageUrlProps" />
        <span class="error" v-if="errors.imageUrl">{{ errors.imageUrl }}</span>
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
  fetchLanternRecommendById,
  createLanternRecommend,
  updateLanternRecommend,
} from '@/services/admin/lanternRecommendApi';

const route = useRoute();
const router = useRouter();
const isEdit = route.name === 'LanternRecommendEdit';
const recommendId = route.params.id as string;

// yup 驗證規則
const schema = object({
  title: string().required('推薦標題為必填'),
  description: string().required('描述為必填'),
  imageUrl: string().url('請輸入有效圖片連結').nullable(),
});

// 建立 useForm 表單
const { defineField, handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    description: '',
    imageUrl: '',
  },
});

// 欄位綁定
const [title, titleProps] = defineField('title');
const [description, descriptionProps] = defineField('description');
const [imageUrl, imageUrlProps] = defineField('imageUrl');

// 載入資料（編輯模式）
onMounted(async () => {
  if (isEdit && recommendId) {
    const res = await fetchLanternRecommendById(recommendId);
    setValues(res.data);
  }
});

// 提交處理
const onSubmit = handleSubmit(async (values) => {
  if (isEdit) {
    await updateLanternRecommend(recommendId, values);
    alert('更新成功');
  } else {
    await createLanternRecommend(values);
    alert('新增成功');
  }
  router.push('/admin/settings/lantern-recommend');
});
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

  .error {
    color: #e74c3c;
    font-size: 13px;
    margin-top: -8px;
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
