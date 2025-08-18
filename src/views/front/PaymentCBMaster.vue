<template>
  <div class="payment-callback">
    <SectionBackground variant="light" />
    <div class="payment-callback__container">
      <MCard customClass="p-48 text-center">
        <h2 class="m-b-16">{{ title }}</h2>
        <p class="m-b-24">{{ message }}</p>
        <button class="payment-callback__btn" @click="goToOfficialLine">
          加入祈福文舍官方 LINE
        </button>
      </MCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import MCard from '@/components/common/MCard.vue';
import { markVirtualPaymentSuccess } from '@/services/paymentService';

const router = useRouter();

const title = ref('處理結果');
const message = ref('正在處理中...');
const queryParams = new URLSearchParams(window.location.search);

const creditResult =
  queryParams.get('result') || queryParams.get('authorization_result') || '';
const retMsgRaw = queryParams.get('ret_msg') || '';
const isGoToOrderQuery = queryParams.get('isGoToOrderQuery') === '1';
const providerOrderNo = queryParams.get('OrderID'); // 你的訂單號
const externalOrderNo = queryParams.get('e_orderno'); // 金流單號

const goToOfficialLine = () => {
  window.location.href = 'https://line.me/R/ti/p/@131gsonn';
};

onMounted(async () => {
  const isSuccess = ~~creditResult === 1;
  const decodedMsg = decodeURIComponent(retMsgRaw);

  if (isSuccess) {
    try {
      await markVirtualPaymentSuccess({
        externalOrderNo,
        providerOrderNo,
        sourceType: 'M',
      });
      title.value = '付款成功';
      message.value = '感謝您的付款，我們已收到訂單。';
    } catch (err) {
      title.value = '付款結果異常';
      message.value =
        '付款成功，但同步後端時出錯，請稍後查看訂單狀態或聯繫客服。';
    }
  } else {
    title.value = '付款失敗';
    message.value = decodedMsg
      ? `付款未成功，原因：${decodedMsg}`
      : '付款未成功，請重新操作或聯繫客服。';
  }
});
</script>

<style scoped>
.payment-callback {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.payment-callback__container {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
.payment-callback__btn {
  margin-top: 20px;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  font-weight: bold;
  background-color: #06c755; /* LINE 綠 */
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #05b14c;
  }
}
</style>
