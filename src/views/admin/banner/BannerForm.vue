<template>
  <div class="banner-form">
    <h1 class="banner-form__title">{{ isEdit ? '編輯 Banner' : '新增 Banner' }}</h1>

    <form @submit.prevent="onSubmit" class="form">
      <div class="form__group">
        <label class="form__label">標題</label>
        <input v-model="title" v-bind="titleAttrs" class="form__input" />
        <span class="form__error" v-if="errors.title">{{ errors.title }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">連結</label>
        <input v-model="link" v-bind="linkAttrs" class="form__input" />
        <span class="form__error" v-if="errors.link">{{ errors.link }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">排序</label>
        <input type="number" v-model="sort" v-bind="sortAttrs" class="form__input" />
        <span class="form__error" v-if="errors.sort">{{ errors.sort }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">啟用</label>
        <input type="checkbox" v-model="values.active" class="form__checkbox" />
      </div>

      <div class="form__group">
        <label class="form__label">圖片</label>
        <input type="file" @change="onImageChange" class="form__input" />
        <img v-if="values.imageBase64" :src="values.imageBase64" class="form__preview-img" />
      </div>

      <div class="form__actions">
        <button type="button" class="form__button form__button--secondary" @click="goBack">取消</button>
        <button type="submit" class="form__button form__button--primary">{{ isEdit ? '更新' : '新增' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { object, string, number } from 'yup';
import { useForm } from 'vee-validate';
import { addBanner, modifyBanner, fetchAdminBannerByType } from '@/services/admin/adminBannerServices';
import type { NewBannerRequest, ModifyBannerRequest } from '@/vite-env';

const router = useRouter();
const route = useRoute();
const id = route.params.id as string | undefined;
const isEdit = !!id;

const schema = object({
  title: string().required('標題為必填'),
  link: string().nullable(),
  sort: number().required('排序為必填').min(0, '排序不可小於 0'),
});

const {
  handleSubmit,
  errors,
  defineField,
  values,
  setValues,
} = useForm<NewBannerRequest>({
  validationSchema: schema,
  initialValues: {
    title: '',
    link: '',
    sort: 0,
    active: true,
    imageBase64: '',
    type: 'home',
  },
});

const [title, titleAttrs] = defineField('title');
const [link, linkAttrs] = defineField('link');
const [sort, sortAttrs] = defineField('sort');

const goBack = () => router.push('/admin/banners');

const onImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    setValues({ ...values, imageBase64: reader.result as string });
  };
  reader.readAsDataURL(file);
};

const onSubmit = handleSubmit(async (formValues) => {
  if (isEdit) {
    const payload: ModifyBannerRequest = { ...formValues, bannerId: id! };
    await modifyBanner(payload);
  } else {
    await addBanner(formValues);
  }
  goBack();
});

const loadData = async () => {
  if (!id) return;
  const list = await fetchAdminBannerByType(values.type);
  const target = list.find((item) => item.bannerId === id);
  if (target) {
    setValues({
      title: target.title,
      link: target.link,
      sort: target.sort,
      type: target.type,
      imageBase64: target.imageBase64,
      active: target.active,
    });
  }
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
