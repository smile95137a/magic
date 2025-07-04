<template>
  <div class="banner-form">
    <h2>{{ isEdit ? '編輯 Banner' : '新增 Banner' }}</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>標題：</label>
        <input v-bind="titleProps" />
        <span class="error" v-if="errors.title">{{ errors.title }}</span>
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
  fetchBannerById,
  createBanner,
  updateBanner,
} from '@/services/admin/bannerApi';

// route 判斷
const route = useRoute();
const router = useRouter();
const isEdit = route.name === 'BannerEdit';
const bannerId = route.params.id as string;

// 定義 schema
const schema = object({
  title: string().required('標題為必填'),
  imageUrl: string().url('請輸入有效的圖片連結').required('圖片連結為必填'),
});

// 初始化 useForm
const { defineField, handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    imageUrl: '',
  },
});

// 單一欄位綁定
const [title, titleProps] = defineField('title');
const [imageUrl, imageUrlProps] = defineField('imageUrl');

// 若為編輯，載入資料
onMounted(async () => {
  if (isEdit) {
    const res:any = await fetchBannerById(bannerId);
    setValues({
      title: res.data.title,
      imageUrl: res.data.imageUrl,
    });
  }
});

// 提交處理
const onSubmit = handleSubmit(async (values) => {
  if (isEdit) {
    await updateBanner(bannerId, values);
    alert('更新成功');
  } else {
    await createBanner(values);
    alert('新增成功');
  }
  router.push('/admin/banners');
});
</script>

<style scoped lang="scss">
.banner-form {
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
