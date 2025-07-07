<template>
  <div class="page">
    <h2>{{ isEdit ? '編輯老師' : '新增老師' }}</h2>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form__group">
        <label>名稱</label>
        <input v-model="values.masterName" class="form__input" />
        <span class="form__error" v-if="errors.masterName">{{ errors.masterName }}</span>
      </div>

      <div class="form__group">
        <label>職稱</label>
        <input v-model="values.jobTitle" class="form__input" />
      </div>

      <div class="form__group">
        <label>描述</label>
        <textarea v-model="values.description" class="form__input"></textarea>
      </div>

      <div class="form__group">
        <label>排序</label>
        <input type="number" v-model="values.sort" class="form__input" />
        <span class="form__error" v-if="errors.sort">{{ errors.sort }}</span>
      </div>

      <div class="form__group">
        <label>啟用</label>
        <input type="checkbox" v-model="values.isActive" />
      </div>

      <div class="form__actions">
        <button type="button" class="form__button--secondary" @click="goBack">取消</button>
        <button type="submit" class="form__button--primary">{{ isEdit ? '更新' : '新增' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { object, string, number } from 'yup';
import { useForm } from 'vee-validate';
import { addMaster, modifyMaster, fetchAllMasters } from '@/services/admin/adminMasterServices';
import type { MasterRequest, MasterAdminVO } from '@/vite-env';
import { onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const id = route.params.id as string | undefined;
const isEdit = !!id;

const schema = object({
  masterName: string().required('名稱為必填'),
  sort: number().required().min(0),
});

const {
  handleSubmit,
  errors,
  values,
  setValues,
} = useForm<MasterRequest>({
  validationSchema: schema,
  initialValues: {
    masterName: '',
    isActive: true,
    sort: 0,
    jobTitle: '',
    description: '',
  },
});

const goBack = () => {
  router.push('/admin/masters');
};

const onSubmit = handleSubmit(async (formValues) => {
  if (isEdit) {
    await modifyMaster({ ...formValues, masterId: id });
  } else {
    await addMaster(formValues);
  }
  goBack();
});

const loadData = async () => {
  if (!id) return;
  const list = await fetchAllMasters();
  const target = list.find((m) => m.masterId === id);
  if (target) {
    setValues({
      masterName: target.masterName,
      isActive: target.isActive,
      sort: target.sort,
      jobTitle: target.jobTitle,
      description: target.description,
    });
  }
};

onMounted(() => {
  if (isEdit) loadData();
});
</script>
