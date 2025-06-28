<template>
  <div class="teacher-booking-list">
    <h1 class="teacher-booking-list__title">老師預約明細</h1>

    <table class="teacher-booking-list__table">
      <thead>
        <tr>
          <th>學生姓名</th>
          <th>預約時間</th>
          <th>老師</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="booking in bookingList" :key="booking.id">
          <tr>
            <td>{{ booking.studentName }}</td>
            <td>{{ booking.time }}</td>
            <td>{{ booking.teacherName }}</td>
            <td>
              <select
                class="teacher-booking-list__select"
                v-model="booking.status"
                @change="updateStatus(booking.id, booking.status)"
              >
                <option value="已完成">已完成</option>
                <option value="待確認">待確認</option>
                <option value="已取消">已取消</option>
              </select>
            </td>
            <td>
              <button
                class="teacher-booking-list__btn"
                @click="toggleDetail(booking.id)"
              >
                {{ expandedIds.includes(booking.id) ? '收起' : '查看' }}
              </button>
            </td>
          </tr>

          <tr
            v-if="expandedIds.includes(booking.id)"
            :key="booking.id + '-detail'"
            class="teacher-booking-list__detail-row"
          >
            <td colspan="5">
              <div class="teacher-booking-list__detail">
                <p><strong>學生備註：</strong>{{ booking.note || '無' }}</p>
                <p><strong>聯絡方式：</strong>{{ booking.contact || 'N/A' }}</p>
                <p><strong>建立時間：</strong>{{ booking.createdAt }}</p>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  fetchBookingList,
  updateBookingStatus,
} from '@/services/admin/teacherBookingApi';

type BookingStatus = '已完成' | '待確認' | '已取消';

interface Booking {
  id: number;
  studentName: string;
  teacherName: string;
  time: string;
  status: BookingStatus;
  note?: string;
  contact?: string;
  createdAt?: string;
}

// 狀態轉換：後端傳英文 -> 前端中文
const mapStatus = (status: string): BookingStatus => {
  const mapping: Record<string, BookingStatus> = {
    completed: '已完成',
    pending: '待確認',
    cancelled: '已取消',
    已完成: '已完成',
    待確認: '待確認',
    已取消: '已取消',
  };
  return mapping[status] || '待確認';
};

const bookingList = ref<Booking[]>([]);
const expandedIds = ref<number[]>([]);

const toggleDetail = (id: number) => {
  expandedIds.value = expandedIds.value.includes(id)
    ? expandedIds.value.filter((i) => i !== id)
    : [...expandedIds.value, id];
};

const updateStatus = async (id: number, newStatus: BookingStatus) => {
  await updateBookingStatus(id, newStatus);
  alert(`已更新狀態為：${newStatus}`);
};

onMounted(async () => {
  const res = await fetchBookingList();
  bookingList.value = res.data.map((b: any) => ({
    ...b,
    status: mapStatus(b.status),
  }));
});
</script>

<style scoped lang="scss">
.teacher-booking-list {
  padding: 24px;

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #2c3e50;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

    th {
      padding: 12px;
      font-size: 14px;
      background-color: #f0f4f8;
      text-align: left;
      color: #34495e;
    }

    td {
      padding: 12px;
      font-size: 14px;
      background-color: #fff;
      border-bottom: 1px solid #eaeaea;
    }

    tr:nth-child(even):not(.teacher-booking-list__detail-row) td {
      background-color: #f9fbfc;
    }

    tr:hover td {
      background-color: #f1f9ff;
    }
  }

  &__select {
    padding: 6px 10px;
    font-size: 14px;
    border: 1px solid #d0d7de;
    border-radius: 4px;
    background-color: #fff;
    transition: border-color 0.2s;

    &:hover {
      border-color: #409eff;
    }
  }

  &__btn {
    padding: 6px 12px;
    font-size: 14px;
    background-color: #005bbb;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #257bdb;
    }
  }

  &__detail-row {
    background-color: #f8faff;

    td {
      border-top: none;
    }
  }

  &__detail {
    padding: 16px;
    font-size: 13px;
    line-height: 1.7;
    background-color: #fefefe;
    border-left: 4px solid #005bbb;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.03);
    border-radius: 4px;
  }
}
</style>
