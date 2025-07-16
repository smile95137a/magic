<template>
  <div class="lantern-recommend-form">
    <h1 class="lantern-recommend-form__title">編輯推薦燈品</h1>

    <form @submit.prevent="onSubmit" class="form">
      <!-- 推薦燈品選擇 -->
      <div class="form__group">
        <label class="form__label">推薦燈品（可複選）</label>
        <select class="form__input" multiple v-model="lanternIds">
          <option
            v-for="option in lanternOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <span class="form__error" v-if="errors.lanternIds">
          {{ errors.lanternIds }}
        </span>
      </div>

      <!-- 操作按鈕 -->
      <div class="form__actions">
        <button
          type="button"
          class="form__button form__button--secondary"
          @click="goBack"
        >
          取消
        </button>
        <button type="submit" class="form__button form__button--primary">
          儲存
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { object, array, string } from 'yup';
import { onMounted } from 'vue';
import {
  updatePromotionLanternList,
  fetchPromotionLanternList,
} from '@/services/admin/systemConfigService';

const router = useRouter();
const goBack = () => router.push('/admin/lantern-recommend');

const lanternOptions = [
  { label: '平安燈', value: 'peace' },
  { label: '光明燈', value: 'light' },
  { label: '財神燈', value: 'wealth' },
  { label: '文昌燈', value: 'wisdom' },
  { label: '姻緣燈', value: 'love' },
];

const schema = object({
  lanternIds: array().of(string()).min(1, '請至少選擇一項推薦燈品'),
});

const { handleSubmit, defineField, errors, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    lanternIds: [] as string[],
  },
});

const [lanternIds] = defineField('lanternIds');

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await updatePromotionLanternList(values.lanternIds);
    if (res.success) {
      goBack();
    } else {
    }
  } catch (e) {}
});

onMounted(async () => {
  try {
    const res = await fetchPromotionLanternList();
    if (res.success) {
      setValues({ lanternIds: res.data });
    }
  } catch (e) {}
});
</script>

<style scoped lang="scss">
.lantern-recommend-form {
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
