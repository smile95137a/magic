<template>
  <div class="banner-form">
    <h1 class="banner-form__title">{{ isEdit ? '編輯' : '新增' }} Banner</h1>
    <form @submit.prevent="submit">
      <input v-model="title" placeholder="標題" class="banner-form__input" />
      <input v-model="imageUrl" placeholder="圖片連結" class="banner-form__input" />
      <button class="banner-form__submit">{{ isEdit ? '儲存' : '新增' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isEdit = route.path.includes('edit');
const id = route.params.id;
const title = ref('');
const imageUrl = ref('');

onMounted(() => {
  if (isEdit) {
    // 模擬從後端取得資料
    title.value = '範例 Banner ' + id;
    imageUrl.value = 'https://via.placeholder.com/300x100';
  }
});

const submit = () => {
  const action = isEdit ? '編輯完成' : '新增成功';
  alert(`${action}：${title.value}`);
  router.push('/admin/banners');
};
</script>

<style scoped lang="scss">
.banner-form {
  &__title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  &__input {
    display: block;
    width: 100%;
    margin-bottom: 12px;
    padding: 8px;
    border: 1px solid #ccc;
  }

  &__submit {
    background: #3b82f6;
    color: white;
    padding: 8px 16px;
    border: none;
    cursor: pointer;

    &:hover {
      background: #2563eb;
    }
  }
}
</style>