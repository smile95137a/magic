<template>
  <div class="member-profile">
    <!-- 會員資料修改 -->
    <h2 class="member-profile__title">會員資料修改</h2>
    <form class="member-profile__form" @submit.prevent="submitProfile">
      <div class="member-profile__grid">
        <div class="member-profile__field">
          <label>暱稱 *</label>
          <input v-model="profile.nickname" />
        </div>
        <div class="member-profile__field">
          <label>LINE ID *</label>
          <input v-model="profile.lineId" />
        </div>

        <div class="member-profile__field">
          <label>收件姓名 *</label>
          <input v-model="profile.receiverName" />
        </div>
        <div class="member-profile__field">
          <label>收件手機 *</label>
          <input v-model="profile.receiverPhone" />
        </div>

        <div class="member-profile__field">
          <label>收件地址</label>
          <div class="member-profile__address">
            <select v-model="profile.city">
              <option disabled value="">縣市</option>
              <option>台北市</option>
              <option>新北市</option>
            </select>
            <select v-model="profile.district">
              <option disabled value="">行政區</option>
              <option>信義區</option>
              <option>板橋區</option>
            </select>
          </div>
        </div>

        <div class="member-profile__field">
          <label>詳細地址</label>
          <input v-model="profile.detailAddress" />
        </div>
      </div>

      <div class="member-profile__actions">
        <button type="submit" class="member-profile__btn">確認修改</button>
      </div>
    </form>

    <!-- 分隔線 -->
    <hr class="member-profile__divider" />

    <!-- 發票資料修改 -->
    <h2 class="member-profile__title">發票資料修改</h2>
    <form class="member-profile__form" @submit.prevent="submitInvoice">
      <div class="member-profile__grid">
        <div class="member-profile__field">
          <label>發票類型 *</label>
          <select v-model="invoice.type">
            <option disabled value="">請選擇發票資訊</option>
            <option>手機條碼</option>
            <option>自然人憑證</option>
          </select>
        </div>

        <div class="member-profile__field">
          <label>接收發票信箱 *</label>
          <input v-model="invoice.email" />
        </div>
      </div>

      <div class="member-profile__actions">
        <button type="submit" class="member-profile__btn">確認修改</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { UserProfileResponse } from '@/vite-env'; // 型別定義
import { getProfile } from '@/services/UserService';

const profile = ref({
  nickname: '',
  lineId: '',
  receiverName: '',
  receiverPhone: '',
  city: '',
  district: '',
  detailAddress: '',
});

const invoice = ref({
  type: '',
  email: '',
});

const initProfile = async () => {
  try {
    const res = await getProfile();
    if (res.success && res.data) {
      const data: any = res.data;

      profile.value.nickname = data.nickname || '';
      profile.value.lineId = data.lineId || '';
      profile.value.receiverName = data.receiverName || '';
      profile.value.receiverPhone = data.receiverPhone || '';
      profile.value.city = data.city || '';
      profile.value.district = data.district || '';
      profile.value.detailAddress = data.detailAddress || '';

      invoice.value.type = data.invoiceType || '';
      invoice.value.email = data.invoiceEmail || '';
    }
  } catch (error) {
    console.error('取得會員資料失敗', error);
  }
};

onMounted(() => {
  initProfile();
});

const submitProfile = () => {
  console.log('會員資料送出:', profile.value);
};

const submitInvoice = () => {
  console.log('發票資料送出:', invoice.value);
};
</script>

<style scoped lang="scss">
.member-profile {
  &__title {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 2rem 0 1rem;
  }

  &__form {
    margin-bottom: 2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  &__field {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      font-weight: 500;
    }

    input,
    select {
      padding: 0.5rem;
      font-size: 0.95rem;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }

  &__address {
    display: flex;
    gap: 0.5rem;

    select {
      flex: 1;
    }
  }

  &__btn {
    padding: 0.6rem 1.5rem;
    background-color: #a53b25;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-size: 0.95rem;
    cursor: pointer;

    &:hover {
      background-color: #902e1c;
    }
  }

  &__actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-start;
  }

  &__divider {
    margin: 3rem 0;
    border: none;
    height: 1px;
    background-color: #ccc;
  }
}
</style>
