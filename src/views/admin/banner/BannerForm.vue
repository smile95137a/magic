<template>
  <div class="banner-form">
    <h1 class="banner-form__title">
      {{ isEdit ? '編輯 Banner' : '新增 Banner' }}
    </h1>

    <form @submit.prevent="onSubmit" class="form">
      <!-- 標題 -->
      <div class="form__group">
        <label class="form__label">標題</label>
        <input v-model="title" class="form__input" />
        <span class="form__error" v-if="errors.title">{{ errors.title }}</span>
      </div>

      <!-- 連結 -->
      <div class="form__group">
        <label class="form__label">連結</label>
        <input v-model="link" class="form__input" />
        <span class="form__error" v-if="errors.link">{{ errors.link }}</span>
      </div>

      <!-- 排序 -->
      <div class="form__group">
        <label class="form__label">排序</label>
        <input type="number" v-model="sort" class="form__input" />
        <span class="form__error" v-if="errors.sort">{{ errors.sort }}</span>
      </div>

      <!-- 圖片 -->
      <div class="form__group">
        <label class="form__label">圖片</label>
        <input type="file" @change="onImageChange" class="form__input" />
        <span class="form__error" v-if="errors.imageBase64">{{
          errors.imageBase64
        }}</span>
        <img v-if="imageBase64" :src="imageBase64" class="form__preview-img" />
      </div>

      <!-- 類型 -->
      <div class="form__group">
        <label class="form__label">類型</label>
        <select v-model="type" class="form__input">
          <option value="A">主 banner</option>
          <option value="B">會員好康</option>
        </select>
        <span class="form__error" v-if="errors.type">{{ errors.type }}</span>
      </div>

      <!-- 上架日期 -->
      <div class="form__group">
        <label class="form__label">上架日期</label>
        <input type="date" v-model="availableFrom" class="form__input" />
        <span class="form__error" v-if="errors.availableFrom">{{
          errors.availableFrom
        }}</span>
      </div>

      <!-- 下架日期 -->
      <div class="form__group">
        <label class="form__label">下架日期</label>
        <input type="date" v-model="availableUntil" class="form__input" />
        <span class="form__error" v-if="errors.availableUntil">{{
          errors.availableUntil
        }}</span>
      </div>

      <!-- 說明 -->
      <div class="form__group">
        <label class="form__label">說明</label>
        <input v-model="description" class="form__input" />
        <span class="form__error" v-if="errors.description">{{
          errors.description
        }}</span>
      </div>

      <!-- 按鈕 -->
      <div class="form__actions">
        <button
          type="button"
          class="form__button form__button--secondary"
          @click="goBack"
        >
          取消
        </button>
        <button type="submit" class="form__button form__button--primary">
          {{ isEdit ? '更新' : '新增' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { object, string, number } from 'yup';
import { useForm } from 'vee-validate';
import { addBanner, modifyBanner } from '@/services/admin/adminBannerServices';
import moment from 'moment';

const router = useRouter();
const route = useRoute();
const id = route.params.id as string | undefined;
const isEdit = !!id;

const schema = object({
  title: string().required('標題為必填'),
  link: string().nullable(),
  sort: number().required('排序為必填').min(0, '排序不可小於 0'),
  imageBase64: string().required('請上傳圖片'),
  filename: string().required('請上傳圖片'),
  type: string().oneOf(['A', 'B']).required('類型為必填'),
  availableFrom: string().required('上架日期為必填'),
  availableUntil: string().required('下架日期為必填'),
  description: string().nullable(),
});

const { handleSubmit, errors, defineField, setValues, values } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    link: '',
    sort: 0,
    imageBase64: '',
    filename: '',
    type: 'A',
    availableFrom: '',
    availableUntil: '',
    description: '',
  },
});

// defineField - 綁定每個欄位
const [title] = defineField('title');
const [link] = defineField('link');
const [sort] = defineField('sort');
const [imageBase64] = defineField('imageBase64');
const [filename] = defineField('filename');
const [type] = defineField('type');
const [availableFrom] = defineField('availableFrom');
const [availableUntil] = defineField('availableUntil');
const [description] = defineField('description');

const goBack = () => router.push('/admin/banners');

const onImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    imageBase64.value = reader.result as string;
    filename.value = file.name;
  };
  reader.readAsDataURL(file);
};

const onSubmit = handleSubmit(async (formValues) => {
  const payload = {
    ...formValues,
    availableFrom: moment(formValues.availableFrom).format('YYYY/MM/DD'),
    availableUntil: moment(formValues.availableUntil).format('YYYY/MM/DD'),
    id: isEdit ? id : undefined,
  };

  if (isEdit) {
    await modifyBanner(payload);
  } else {
    await addBanner(payload);
  }
  goBack();
});

const loadData = async () => {
  // const res = await getBannerDetail(id!);
  // if (res.success) {
  //   const data = res.data;
  //   setValues({
  //     title: data.title,
  //     link: data.link,
  //     sort: data.sort,
  //     imageBase64: data.imageBase64,
  //     filename: data.filename,
  //     type: data.type,
  //     availableFrom: data.availableFrom,
  //     availableUntil: data.availableUntil,
  //     description: data.description,
  //   });
  // }
};

onMounted(() => {
  if (isEdit) loadData();
});
</script>

<style scoped lang="scss">
.banner-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    text-align: center;
  }
}
</style>
