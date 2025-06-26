<!-- @/views/admin/teacher/TeacherList.vue -->
<template>
  <div class="teacher-list">
    <h2 class="teacher-list__title">老師清單</h2>
    <button class="teacher-list__add-btn" @click="goToPage('add')">
      新增老師
    </button>

    <table class="teacher-list__table">
      <thead>
        <tr>
          <th>姓名</th>
          <th>Email</th>
          <th>電話</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teacher in teachers" :key="teacher.id">
          <td>{{ teacher.name }}</td>
          <td>{{ teacher.email }}</td>
          <td>{{ teacher.phone }}</td>
          <td>
            <button
              class="teacher-list__btn"
              @click="goToPage('detail', teacher.id)"
            >
              查看
            </button>
            <button
              class="teacher-list__btn"
              @click="goToPage('edit', teacher.id)"
            >
              編輯
            </button>
            <button
              class="teacher-list__btn teacher-list__btn--danger"
              @click="remove(teacher.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchTeacherList, deleteTeacher } from '@/services/admin/teacherApi';

type PageType = 'add' | 'detail' | 'edit';

const router = useRouter();
const teachers = ref<any[]>([]);

const loadData = async () => {
  const res = await fetchTeacherList();
  teachers.value = res.data;
};

const goToPage = (type: PageType, id?: number) => {
  switch (type) {
    case 'add':
      router.push('/admin/teachers/add');
      break;
    case 'detail':
      router.push(`/admin/teachers/${id}`);
      break;
    case 'edit':
      router.push(`/admin/teachers/edit/${id}`);
      break;
  }
};

const remove = async (id: number) => {
  await deleteTeacher(id);
  await loadData();
  alert(`已刪除老師 ID: ${id}`);
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
.teacher-list {
  padding: 24px;

  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  &__add-btn {
    padding: 8px 16px;
    margin-bottom: 16px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #66b1ff;
    }
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      border: 1px solid #dcdfe6;
      text-align: left;
    }

    th {
      background-color: #f5f7fa;
    }
  }

  &__btn {
    margin-right: 6px;
    padding: 6px 10px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background-color: #e4e7ed;
    cursor: pointer;

    &:hover {
      background-color: #c8d3e0;
    }

    &--danger {
      background-color: #f56c6c;
      color: white;

      &:hover {
        background-color: #dd6161;
      }
    }
  }
}
</style>
