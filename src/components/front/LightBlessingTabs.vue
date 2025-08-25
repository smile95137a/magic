<template>
  <div class="light-blessing__tabs">
    <div class="light-blessing__tab" @click="handleTabClick('product')">
      祈福燈產品
    </div>
    <div class="light-blessing__tab" @click="handleTabClick('my')">
      <div class="light-blessing__tab-title">我的祈福燈</div>
      <div class="light-blessing__tab-subtitle">
        每日可以回來對燈祈福,可加強效果。
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function handleTabClick(tab: 'product' | 'my') {
  const routeMap = {
    product: '/lightProduct',
    my: '/myLight',
  };
  router.push(routeMap[tab]);
}
</script>

<style scoped lang="scss">
.light-blessing__tabs {
  border: 1px solid #a53b25;
  display: flex;
  justify-content: center;
  background: #f7c56b;
  border-radius: 100px;
  overflow: hidden;
  width: 100%;
  height: 70px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.light-blessing__tab {
  padding: 0.75rem 2rem;
  font-weight: bold;
  cursor: pointer;
  color: #a53b25;
  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
  display: flex;
  flex-direction: column; /* 讓主標 + 子標上下排 */
  align-items: center;
  justify-content: center;
}

.light-blessing__tab-title {
  font-size: 1rem;
  font-weight: bold;
}

.light-blessing__tab-subtitle {
  font-size: 0.75rem;
  font-weight: normal;
  margin-top: 0.25rem;
  color: #6b2d1d; /* 深一點的文字顏色 */
}
</style>
