<template>
  <div class="product-form">
    <h2 class="form__title">{{ isEdit ? '編輯商品' : '新增商品' }}</h2>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form__group">
        <label class="form__label">商品名稱</label>
        <input v-model="productName" v-bind="productNameAttrs" class="form__input" />
        <span class="form__error" v-if="errors.productName">{{ errors.productName }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">分類代碼</label>
        <input v-model="categoryCode" v-bind="categoryCodeAttrs" class="form__input" />
        <span class="form__error" v-if="errors.categoryCode">{{ errors.categoryCode }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">價格</label>
        <input type="number" v-model="price" v-bind="priceAttrs" class="form__input" />
        <span class="form__error" v-if="errors.price">{{ errors.price }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">數量</label>
        <input type="number" v-model="quantity" v-bind="quantityAttrs" class="form__input" />
        <span class="form__error" v-if="errors.quantity">{{ errors.quantity }}</span>
      </div>

      <div class="form__group">
        <label class="form__label">排序</label>
        <input type="number" v-model="sort" class="form__input" />
      </div>

      <div class="form__group">
        <label class="form__label">上架</label>
        <input type="checkbox" v-model="values.isPublished" class="form__checkbox" />
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
import { onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { object, string, number } from 'yup';
import {
  createProductDraft,
  fetchProductDetail,
  editProduct,
} from '@/services/admin/adminProductServices';
import type { EditProductRequest } from '@/vite-env';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string | undefined;
const isEdit = !!id;

// 表單驗證 schema
const schema = object({
  productName: string().required('商品名稱為必填'),
  categoryCode: string().required('分類代碼為必填'),
  price: number().required().min(0, '價格不可小於 0'),
  quantity: number().required().min(0, '數量不可小於 0'),
});

const {
  handleSubmit,
  defineField,
  errors,
  values,
  setValues,
} = useForm<EditProductRequest>({
  validationSchema: schema,
  initialValues: {
    productId: 0,
    productName: '',
    categoryCode: '',
    price: 0,
    quantity: 0,
    sort: 0,
    isPublished: false,
    imageUrls: [],
  },
});

// 欄位綁定
const [productName, productNameAttrs] = defineField('productName');
const [categoryCode, categoryCodeAttrs] = defineField('categoryCode');
const [price, priceAttrs] = defineField('price');
const [quantity, quantityAttrs] = defineField('quantity');
const [sort] = defineField('sort');

const goBack = () => router.push('/admin/mall/items');

const onSubmit = handleSubmit(async (formValues) => {
  await editProduct(formValues);
  goBack();
});

onMounted(async () => {
  if (isEdit) {
    const detail = await fetchProductDetail(Number(id));
    setValues(detail);
  } else {
    const draft = await createProductDraft();
    setValues({
      productId: draft.productId,
      productName: '',
      categoryCode: '',
      price: 0,
      quantity: 0,
      sort: 0,
      isPublished: false,
      imageUrls: [],
    });
  }
});

</script>
