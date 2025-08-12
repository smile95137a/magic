<template>
  <div class="admin-list">
    <h1 class="admin-list__title">訂單列表</h1>

    <!-- 查詢區 -->
    <div class="admin-list__filter">
      <input
        v-model="searchForm.orderId"
        placeholder="訂單編號"
        class="admin-list__input"
      />
      <input
        v-model="searchForm.customerName"
        placeholder="會員帳號/顧客姓名"
        class="admin-list__input"
      />
      <button @click="loadOrders" class="admin-list__button">查詢</button>
    </div>

    <!-- 批次操作 -->
    <div class="admin-list__actions">
      <select v-model="selectedStatus" class="admin-list__input">
        <option disabled value="">選擇新狀態</option>
        <option
          v-for="option in statusOptions"
          :key="option.code"
          :value="option.code"
        >
          {{ option.label }}
        </option>
      </select>

      <button class="admin-list__button" @click="handleBatchUpdate">
        批次更新狀態
      </button>

      <button class="admin-list__button" @click="openShipDialog">
        準備出貨
      </button>
    </div>

    <!-- 訂單列表 -->
    <div class="admin-list__table-wrap">
      <template v-if="currentPageItems.length > 0">
        <table class="admin-list__table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  @change="toggleSelectAll"
                  :checked="isAllSelected"
                />
              </th>
              <th>訂單編號</th>
              <th>顧客帳號</th>
              <th>金額</th>
              <th>訂單狀態</th>
              <th>付款狀態</th>
              <th>物流方式</th>
              <th>物流單號</th>
              <th>建立時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in currentPageItems" :key="order.id">
              <td>
                <input
                  type="checkbox"
                  :value="order.id"
                  v-model="selectedOrderIds"
                />
              </td>
              <td>{{ order.id }}</td>
              <td>{{ order.username }}</td>
              <td>${{ order.totalAmount?.toFixed(2) }}</td>
              <td>{{ order.status || '' }}</td>
              <td>{{ order.paymentStatus || '' }}</td>
              <td>{{ order.shippingMethodName || '' }}</td>
              <td>{{ order.trackingNo || '' }}</td>
              <td>
                <DateFormatter
                  :date="order.createTime"
                  format="YYYY/MM/DD HH:mm:ss"
                />
              </td>
              <td>
                <button
                  class="admin-list__action-btn"
                  @click="goToDetail(order.id)"
                >
                  查看
                </button>
                <button
                  class="admin-list__action-btn"
                  @click="goToDeliveryNote(order.id)"
                >
                  出貨單
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center m-t-12">
          <Pagination
            :totalPages="totalPages"
            :renderPaginationNums="renderPaginationNums"
            :currentPage="currentPage"
            :nextPage="nextPage"
            :previousPage="previousPage"
            :goToPage="goToPage"
            :pageLimitSize="pageLimitSize"
            :totalItems="list.length"
            @update:pageLimitSize="pageLimitSize = $event"
          />
        </div>
      </template>

      <NoData v-else />
    </div>

    <!-- 準備出貨 Dialog -->
    <div v-if="showShipDialog" class="admin-list__dialog-backdrop">
      <div class="admin-list__dialog" role="dialog" aria-modal="true">
        <h3 class="admin-list__dialog-title">
          設定出貨資訊（已選 {{ selectedOrderIds.length }} 筆）
        </h3>
        <div class="admin-list__dialog-body">
          <label class="admin-list__dialog-label">出貨日期（必填）</label>
          <input
            type="date"
            v-model="shipDate"
            class="admin-list__input"
            required
          />

          <label class="admin-list__dialog-label m-t-8"
            >備註（選填，套用全部）</label
          >
          <input
            type="text"
            v-model="shipRemark"
            class="admin-list__input"
            placeholder="例：優先出貨"
          />
        </div>
        <div class="admin-list__dialog-actions">
          <button class="admin-list__button" @click="confirmShip">確認</button>
          <button class="admin-list__button" @click="closeShipDialog">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/common/Pagination.vue';
import NoData from '@/components/common/NoData.vue';
import { usePagination } from '@/hook/usePagination';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import DateFormatter from '@/components/common/DateFormatter.vue';
import moment from 'moment';
import {
  fetchOrderList,
  fetchUpdatableOrderStatusList,
  updateOrderStatusBatch,
  markOrdersReadyToShip,
} from '@/services/admin/adminOrderServices';
import { useDialogStore } from '@/stores/dialogStore';

const router = useRouter();
const dialog = useDialogStore();
const selectedOrderIds = ref<string[]>([]);
const selectedStatus = ref('');

const list = ref<any[]>([]);
const pageLimitSize = ref(10);

const {
  totalPages,
  currentPageItems,
  renderPaginationNums,
  currentPage,
  nextPage,
  previousPage,
  goToPage,
} = usePagination<any>(list, pageLimitSize);

const statusOptions = ref<{ code: string; label: string }[]>([]);
const searchForm = ref({
  orderId: '',
  customerName: '',
});

// 查詢訂單
const loadOrders = async () => {
  const res = await fetchOrderList(searchForm.value);
  if (res.success) {
    list.value = res.data || [];
    selectedOrderIds.value = [];
  }
};

// 全選
const toggleSelectAll = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked;
  selectedOrderIds.value = checked ? list.value.map((o) => o.id) : [];
};

const isAllSelected = computed(
  () =>
    list.value.length > 0 && selectedOrderIds.value.length === list.value.length
);

// 跳轉
const goToDetail = (orderId: string) => {
  router.push(`/admin/orders/detail/${orderId}`);
};

const goToDeliveryNote = (orderId: string) => {
  router.push(`/admin/orders/delivery-note/${orderId}`);
};

// 批次更新狀態
const handleBatchUpdate = async () => {
  if (!selectedOrderIds.value.length) return;
  if (!selectedStatus.value) return;

  const updates = list.value
    .filter((o) => selectedOrderIds.value.includes(o.id))
    .map((o) => ({
      orderId: o.id,
      trackingNo: o.trackingNo || '',
      remark: o.remark || '',
    }));

  try {
    await updateOrderStatusBatch({
      updates,
      status: selectedStatus.value,
    });
    await loadOrders();
  } catch (err) {
    console.error('updateOrderStatusBatch error:', err);
  }
};

/* ===== 準備出貨 ===== */
const showShipDialog = ref(false);
const shipDate = ref('');
const shipRemark = ref('');

const openShipDialog = () => {
  if (!selectedOrderIds.value.length) return;
  shipDate.value = moment().format('YYYY-MM-DD');
  shipRemark.value = '';
  showShipDialog.value = true;
};
const closeShipDialog = () => (showShipDialog.value = false);

const confirmShip = async () => {
  const ALLOWED = new Set(['paid', 'processing']);

  // 防呆：要有選訂單
  if (!selectedOrderIds.value.length) {
    await dialog.openInfoDialog({
      title: '格式錯誤',
      message: '請先勾選要出貨的訂單',
    });
    return;
  }

  // 防呆：狀態必須是 paid 或 processing（下拉選單）
  if (!ALLOWED.has(selectedStatus.value)) {
    await dialog.openInfoDialog({
      title: '格式錯誤',
      message: '請先在狀態下拉選擇「已付款(paid)」或「訂單準備中(processing)」',
    });
    return;
  }

  // （可選）更嚴：實際檢查每筆被勾選訂單的當前狀態
  const invalid = list.value.filter(
    (o) =>
      selectedOrderIds.value.includes(o.id) && !ALLOWED.has(String(o.status))
  );
  if (invalid.length > 0) {
    const ids = invalid
      .slice(0, 5)
      .map((o) => o.id)
      .join(', ');
    await dialog.openInfoDialog({
      title: '格式錯誤',
      message: `以下訂單目前狀態不是「已付款/訂單準備中」，無法準備出貨：${ids}${
        invalid.length > 5 ? '…' : ''
      }`,
    });
    return;
  }

  // 防呆：出貨日期
  if (!shipDate.value) {
    await dialog.openInfoDialog({
      title: '格式錯誤',
      message: '請選擇出貨日期',
    });
    return;
  }

  // 後端是 Java Date，傳 ISO 8601 字串即可
  const shippingDateIso = moment(shipDate.value, 'YYYY-MM-DD')
    .toDate()
    .toISOString();

  const payload = list.value
    .filter((o) => selectedOrderIds.value.includes(o.id))
    .map((o) => ({
      orderId: o.id,
      remark: shipRemark.value || '',
      shippingDate: shippingDateIso,
    }));

  try {
    await markOrdersReadyToShip(payload);
    closeShipDialog();
    await loadOrders();
  } catch (e) {
    console.error('markOrdersReadyToShip error:', e);
  }
};

const loadStatusOptions = async () => {
  try {
    const res = await fetchUpdatableOrderStatusList();
    if (res.success) {
      statusOptions.value = (res.data || []).filter(
        (option) => option.code !== 'ready_to_ship'
      );
    }
  } catch (e) {
    console.error('載入狀態選項失敗', e);
  }
};

onMounted(() => {
  loadOrders();
  loadStatusOptions();
});
</script>

<style scoped>
/* Dialog（簡易樣式，可換成你的通用 Dialog） */
.admin-list__dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.admin-list__dialog {
  background: #fff;
  border-radius: 12px;
  width: 520px;
  max-width: 92vw;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.admin-list__dialog-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}
.admin-list__dialog-body {
  display: grid;
  gap: 8px;
}
.admin-list__dialog-label {
  font-size: 14px;
  color: #555;
}
.admin-list__dialog-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
