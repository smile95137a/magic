<template>
  <div class="admin-list">
    <h1 class="admin-list__title">寄件人資訊設定</h1>

    <form class="admin-list__form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <div class="form-item">
          <label class="form-item__label">姓名（最多 5 字）</label>
          <input
            v-model="form.name"
            type="text"
            maxlength="5"
            class="form-item__input"
            required
          />
        </div>

        <div class="form-item">
          <label class="form-item__label">電話（10 碼數字）</label>
          <input
            v-model="form.phone"
            type="tel"
            maxlength="10"
            class="form-item__input"
            required
          />
        </div>

        <div class="form-item">
          <label class="form-item__label">縣市</label>
          <input
            v-model="form.city"
            type="text"
            class="form-item__input"
            required
          />
        </div>

        <div class="form-item">
          <label class="form-item__label">郵遞區號</label>
          <input
            v-model="form.zipcode"
            type="text"
            maxlength="5"
            class="form-item__input"
            required
          />
        </div>

        <div class="form-item form-item--full">
          <label class="form-item__label">地址</label>
          <input
            v-model="form.address"
            type="text"
            class="form-item__input"
            required
          />
        </div>
      </div>

      <div class="admin-list__actions">
        <button type="submit" class="admin-list__button">儲存</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  fetchSenderInfo,
  updateSenderInfo,
} from '@/services/admin/adminSystemConfigService';
import { withLoading } from '@/utils/loadingUtils';
import { useDialogStore } from '@/stores/dialogStore';
import { executeApi } from '@/utils/executeApiUtils';

const dialogStore = useDialogStore();

const form = ref<any>({
  name: '',
  phone: '',
  city: '',
  address: '',
  zipcode: '',
});

const load = async () => {
  await executeApi({
    fn: () => fetchSenderInfo(),
    onSuccess: (data) => {
      form.value = data;
    },
  });
};

const handleSubmit = async () => {
  await executeApi({
    fn: () => updateSenderInfo(form.value),
  });
};

onMounted(() => {
  load();
});
</script>

<style scoped lang="scss">
.admin-list {
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 24px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__actions {
    text-align: right;
  }

  &__button {
    background-color: #eb6c4d;
    color: #fff;
    border: none;
    padding: 10px 24px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background-color: #cf4f32;
    }
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.form-item {
  display: flex;
  flex-direction: column;

  &__label {
    margin-bottom: 4px;
    font-weight: 600;
  }

  &__input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &--full {
    grid-column: span 2;
  }
}
</style>
