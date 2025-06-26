<!-- @/views/admin/teacher/TeacherDetail.vue -->
<template>
  <div>
    <h2>老師詳細資料</h2>
    <div><strong>姓名：</strong>{{ teacher.name }}</div>
    <div><strong>Email：</strong>{{ teacher.email }}</div>
    <div><strong>電話：</strong>{{ teacher.phone }}</div>
    <button @click="goBack">返回清單</button>
  </div>
</template>

<script setup lang="ts">
import { fetchTeacherById } from '@/services/admin/teacherApi';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const teacher = ref({ name: '', email: '', phone: '' });

onMounted(async () => {
  const res = await fetchTeacherById(route.params.id as string);
  teacher.value = res.data;
});

const goBack = () => {
  router.push('/admin/teachers');
};
</script>
