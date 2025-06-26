<!-- @/views/admin/teacher/TeacherForm.vue -->
<template>
  <div class="teacher-form">
    <h2 class="teacher-form__title">{{ isEdit ? '編輯老師' : '新增老師' }}</h2>
    <form @submit.prevent="handleSubmit(onSubmit)" class="teacher-form__form">
      <div class="teacher-form__field">
        <label class="teacher-form__label">姓名：</label>
        <input v-model="name" class="teacher-form__input" />
        <span class="teacher-form__error">{{ errors.name }}</span>
      </div>

      <div class="teacher-form__field">
        <label class="teacher-form__label">Email：</label>
        <input v-model="email" type="email" class="teacher-form__input" />
        <span class="teacher-form__error">{{ errors.email }}</span>
      </div>

      <div class="teacher-form__field">
        <label class="teacher-form__label">電話：</label>
        <input v-model="phone" class="teacher-form__input" />
        <span class="teacher-form__error">{{ errors.phone }}</span>
      </div>

      <button type="submit" class="teacher-form__submit">儲存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {
  createTeacher,
  fetchTeacherById,
  updateTeacher,
} from '@/services/admin/teacherApi';

const route = useRoute();
const router = useRouter();
const isEdit = route.name === 'TeacherEdit';
const teacherId = route.params.id as string;

const schema = yup.object({
  name: yup.string().required('請輸入姓名'),
  email: yup.string().required('請輸入 Email').email('Email 格式錯誤'),
  phone: yup.string().required('請輸入電話'),
});

const { handleSubmit, errors, setValues, defineField } = useForm({
  validationSchema: schema,
});

const [name] = defineField('name');
const [email] = defineField('email');
const [phone] = defineField('phone');

onMounted(async () => {
  if (isEdit) {
    const res = await fetchTeacherById(teacherId);
    setValues(res.data);
  }
});

const onSubmit = async (values: any) => {
  if (isEdit) {
    await updateTeacher(teacherId, values);
    alert('老師已更新');
  } else {
    await createTeacher(values);
    alert('老師已新增');
  }
  router.push('/admin/teachers');
};
</script>

<style lang="scss" scoped>
.teacher-form {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 480px;
  margin: 0 auto;

  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__field {
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-weight: 500;
    margin-bottom: 4px;
  }

  &__input {
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #409eff;
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
    }
  }

  &__error {
    font-size: 12px;
    color: #f56c6c;
    margin-top: 4px;
  }

  &__submit {
    margin-top: 12px;
    padding: 10px;
    background-color: #409eff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #66b1ff;
    }
  }
}
</style>
