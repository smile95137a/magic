<template>
  <div class="admin-form">
    <h2 class="admin-form__title">{{ isEdit ? '編輯供品' : '新增供品' }}</h2>

    <form class="form" @submit.prevent="onSubmit">
      <div class="form__group">
        <label class="form__label">供品名稱</label>
        <input v-model="values.offeringName" class="form__input" />
        <span class="form__error">{{ errors.offeringName }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">類型</label>
        <input v-model="values.offeringType" class="form__input" />
        <span class="form__error">{{ errors.offeringType }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">說明</label>
        <textarea v-model="values.offeringDesc" class="form__input" />
      </div>

      <div class="form__group">
        <label class="form__label">價格</label>
        <input type="number" v-model.number="values.price" class="form__input" />
        <span class="form__error">{{ errors.price }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">排序</label>
        <input type="number" v-model.number="values.sort" class="form__input" />
      </div>

      <div class="form__group">
        <label class="form__label">是否啟用</label>
        <input type="checkbox" v-model="values.isActive" class="form__checkbox" />
      </div>

      <div class="form__group">
        <label class="form__label">圖片上傳 (base64)</label>
        <input type="file" @change="onFileChange" class="form__input" />
        <img v-if="values.imageUrl" :src="values.imageUrl" class="form__preview-img" />
      </div>

      <div class="form__actions">
        <button type="button" class="form__button form__button--secondary" @click="goBack">取消</button>
        <button type="submit" class="form__button form__button--primary">儲存</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { object, string, number, boolean } from 'yup';
import {
  addOffering,
  modifyOffering,
  fetchOfferingList,
} from '@/services/admin/adminOfferingServices';
import type { OfferingVO } from '@/vite-env';

const route = useRoute();
const router = useRouter();
const isEdit = !!route.params.id;
const offeringId = route.params.id as string;

const schema = object({
  offeringName: string().required('名稱必填'),
  offeringType: string().required('類型必填'),
  price: number().required('價格必填'),
});

const { handleSubmit, values, errors, setValues } = useForm<OfferingVO>({
  validationSchema: schema,
  initialValues: {
    offeringName: '',
    offeringType: '',
    offeringDesc: '',
    isActive: true,
    price: 0,
    sort: 0,
    imageUrl: '',
  },
});

const goBack = () => router.push('/admin/offerings');

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    values.imageUrl = reader.result as string;
  };
  reader.readAsDataURL(file);
};

const onSubmit = handleSubmit(async (formValues) => {
  if (isEdit) {
    await modifyOffering({ ...formValues, offeringId });
  } else {
    await addOffering(formValues);
  }
  goBack();
});

const load = async () => {
  if (!isEdit) return;
  const list = await fetchOfferingList();
  const target = list.find((item) => item.offeringId === offeringId);
  if (target) {
    setValues(target);
  }
};

onMounted(load);
</script>
