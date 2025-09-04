<template>
  <div class="master-form">
    <h1 class="master-form__title">
      {{ isEdit ? '編輯老師' : '新增老師' }}
    </h1>

    <form @submit.prevent="onSubmit" class="form">
      <!-- 老師代號 -->
      <div class="form__group">
        <label class="form__label">老師代號</label>
        <input v-model="code" class="form__input" :readonly="isEdit" />
        <span class="form__error" v-if="errors.code">{{ errors.code }}</span>
      </div>

      <!-- 老師名字 -->
      <div class="form__group">
        <label class="form__label">老師名字</label>
        <input v-model="name" class="form__input" />
        <span class="form__error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <!-- 老師頭銜 -->
      <div class="form__group">
        <label class="form__label">老師頭銜</label>
        <input v-model="title" class="form__input" />
      </div>

      <!-- 老師主星 -->
      <div class="form__group">
        <label class="form__label">老師主星</label>
        <input v-model="mainStar" class="form__input" />
      </div>

      <!-- 老師簡介 -->
      <div class="form__group">
        <label class="form__label">老師簡介</label>
        <textarea v-model="bio" class="form__input"></textarea>
      </div>

      <!-- 老師學經歷 -->
      <div class="form__group">
        <label class="form__label">老師學經歷</label>
        <textarea v-model="experience" class="form__input"></textarea>
      </div>

      <!-- 老師親算項目 -->
      <div class="form__group">
        <label class="form__label">老師親算項目</label>
        <input v-model="personalItems" class="form__input" />
      </div>

      <!-- 老師服務時間 -->
      <div class="form__group">
        <label class="form__label">老師服務時間</label>
        <input
          v-model="serviceTime"
          class="form__input"
          placeholder="例如：週一至週五 09:00-18:00"
        />
      </div>

      <!-- 老師服務項目 -->
      <div class="form__group">
        <label class="form__label">老師服務項目</label>
        <div
          v-for="(item, index) in serviceItem"
          :key="index"
          class="form__group--nested"
        >
          <div class="form__field">
            <label class="form__label">項目標題</label>
            <input
              v-model="item.title"
              class="form__input"
              placeholder="例如：流年運勢解析"
            />
          </div>

          <div class="form__field">
            <label class="form__label">項目內容</label>
            <textarea
              v-model="item.content"
              class="form__input"
              placeholder="請輸入服務內容"
            ></textarea>
          </div>

          <div class="form__field">
            <label class="form__label">項目價格</label>
            <input
              v-model="item.price"
              type="number"
              class="form__input"
              placeholder="請輸入價格（例如：2000）"
            />
          </div>

          <div class="form__actions--inline">
            <button
              type="button"
              class="form__button form__button--delete"
              @click="removeServiceItem(index)"
            >
              刪除此項目
            </button>
          </div>
        </div>

        <button
          type="button"
          class="form__button form__button--secondary"
          @click="addServiceItem"
        >
          新增服務項目
        </button>
      </div>

      <!-- 老師排序 -->
      <div class="form__group">
        <label class="form__label">老師排序</label>
        <input type="number" v-model="sort" class="form__input" />
        <span class="form__error" v-if="errors.sort">{{ errors.sort }}</span>
      </div>

      <!-- 老師是否在架上 -->
      <div class="form__group">
        <label class="form__label">老師是否在架上</label>
        <input type="checkbox" v-model="status" />
      </div>

      <!-- 老師圖像（Base64） -->
      <div class="form__group">
        <label class="form__label">老師圖像（Base64）</label>
        <input type="file" @change="onImageChange" class="form__input" />
        <img v-if="imageBase64" :src="imageBase64" class="form__preview-img" />
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
import { useForm } from 'vee-validate';
import {
  addMaster,
  modifyMaster,
  fetchAllMasters,
  fetchMasterByCode,
} from '@/services/admin/adminMasterServices';
import { executeApi } from '@/utils/executeApiUtils';
import { useDialogStore } from '@/stores/dialogStore';

const router = useRouter();
const route = useRoute();
const dialog = useDialogStore();
const id = route.params.id as string | undefined;
const isEdit = !!id;

// --- 表單驗證工具略，保留原本 --- //

const { handleSubmit, errors, defineField, setValues } = useForm({
  initialValues: {
    code: '',
    name: '',
    title: '',
    mainStar: '',
    bio: '',
    experience: '',
    personalItems: '',
    serviceTime: '',
    serviceItem: [],
    status: true,
    imageBase64: '',
    sort: 0,
  },
});

const [code] = defineField('code');
const [name] = defineField('name');
const [title] = defineField('title');
const [mainStar] = defineField('mainStar');
const [bio] = defineField('bio');
const [experience] = defineField('experience');
const [personalItems] = defineField('personalItems');
const [serviceTime] = defineField('serviceTime');
const [serviceItem] = defineField('serviceItem');
const [status] = defineField('status');
const [imageBase64] = defineField('imageBase64');
const [sort] = defineField('sort');

const addServiceItem = () => {
  serviceItem.value.push({ title: '', content: '', price: 0 });
};

const removeServiceItem = (index: number) => {
  serviceItem.value.splice(index, 1);
};

const goBack = () => router.push('/admin/masters');

const onImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    imageBase64.value = reader.result as string;
  };
  reader.readAsDataURL(file);
};

const onSubmit = handleSubmit(async (formValues) => {
  const payload = {
    ...formValues,
    id: isEdit ? id : undefined,
  };

  await executeApi({
    fn: () => (isEdit ? modifyMaster(payload) : addMaster(payload)),
    successTitle: '系統通知',
    successMessage: isEdit ? '老師資料已成功修改！' : '老師資料已成功新增！',
    errorTitle: '錯誤',
    errorMessage: isEdit
      ? '老師資料修改失敗，請稍後再試。'
      : '老師資料新增失敗，請稍後再試。',
    onSuccess: () => {
      goBack();
    },
  });
});

const loadData = async () => {
  if (!id) return;
  try {
    const res = await fetchMasterByCode(id);
    if (res.success && res.data) {
      const target = res.data;
      setValues({
        code: target.code,
        name: target.name,
        title: target.title,
        mainStar: target.mainStar,
        bio: target.bio,
        experience: target.experience,
        personalItems: target.personalItems,
        serviceTime: target.serviceTime ?? '',
        serviceItem:
          target.serviceItem?.map((item) => ({
            title: item.title || '',
            content: item.content || '',
            price: item.price || 0,
          })) ?? [],
        status: target.status,
        imageBase64: target.imageBase64,
        sort: target.sort,
      });
    }
  } catch (error) {
    console.error('loadData error:', error);
  }
};

onMounted(() => {
  if (isEdit) loadData();
});
</script>
