<template>
  <MCard>
    <form class="form" @submit.prevent="onSubmit">
      <div class="flex m-b-16">
        <p class="form__text form__text--title">客戶基本資料</p>
      </div>

      <!-- 查詢條件區塊 -->
      <div class="flex flex-wrap">
        <div class="w-50 w-md-100 p-6">
          <p class="form__text form__text--red">地區</p>
          <div class="flex flex-column flex-1">
            <select
              v-model="region"
              class="mselect"
              :class="{ 'error-border': errors.region }"
            >
              <option value="">全部</option>
              <option
                v-for="item in regionOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <span class="error-text" v-if="errors.region">{{
              errors.region
            }}</span>
          </div>
        </div>

        <div class="w-50 w-md-100 p-6">
          <p class="form__text">客戶別</p>
          <div class="flex flex-column flex-1">
            <select
              v-model="customerType"
              class="mselect"
              :class="{ 'error-border': errors.customerType }"
            >
              <option value="">全部</option>
              <option value="B">一般</option>
              <option value="C">VIP</option>
            </select>
            <span class="error-text" v-if="errors.customerType">{{
              errors.customerType
            }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-50 w-md-100 p-6">
          <p class="form__text form__text--red">公司名稱</p>
          <div class="flex flex-1">
            <div class="flex flex-column flex-1">
              <select
                v-model="customerId"
                class="mselect"
                :class="{ 'error-border': errors.customerId }"
              >
                <option value="">全部</option>
                <option
                  v-for="item in customerIdOptions"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
              <span class="error-text" v-if="errors.customerId">{{
                errors.customerId
              }}</span>
            </div>
            <div class="flex items-center p-x-12" @click="searchCompanyId">
              <i class="fas fa-search m-r-2"></i>
            </div>
          </div>
        </div>

        <div class="w-50 w-md-100 p-6">
          <p class="form__text">網銀客戶</p>
          <div class="flex flex-column flex-1">
            <select v-model="ssoUser" class="mselect">
              <option value="">請選擇</option>
              <option value="Y">是</option>
              <option value="N">否</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 詳細資料 -->
      <div class="flex flex-wrap">
        <div class="w-50 w-md-100 p-6">
          <p class="form__text form__text--red">使用者代號</p>
          <div class="flex flex-column flex-1">
            <input
              v-model="code"
              class="minput"
              :class="{ 'error-border': errors.code }"
            />
            <span class="error-text" v-if="errors.code">{{ errors.code }}</span>
          </div>
        </div>

        <div class="w-50 w-md-100 p-6">
          <p class="form__text form__text--red">使用者名稱</p>
          <div class="flex flex-column flex-1">
            <input
              v-model="name"
              class="minput"
              :class="{ 'error-border': errors.name }"
            />
            <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-50 w-md-100 p-6">
          <p class="form__text form__text--red">用戶A碼（新）</p>
          <div class="flex flex-column flex-1">
            <input
              v-model="pwdA"
              class="minput"
              :class="{ 'error-border': errors.postcode }"
            />
            <span class="error-text" v-if="errors.postcode">{{
              errors.postcode
            }}</span>
          </div>
        </div>

        <div class="w-50 w-md-100 p-6">
          <p class="form__text form__text--red">聯絡電話</p>
          <div class="flex flex-column flex-1">
            <input
              v-model="telephone"
              class="minput"
              :class="{ 'error-border': errors.address }"
            />
            <span class="error-text" v-if="errors.address">{{
              errors.address
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-50 w-md-100 p-6">
          <p class="form__text form__text--red">用戶A碼（確認）</p>
          <div class="flex flex-column flex-1">
            <input
              v-model="pwdA"
              class="minput"
              :class="{ 'error-border': errors.postcode }"
            />
            <span class="error-text" v-if="errors.postcode">{{
              errors.postcode
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-100 p-6">
          <p class="form__text form__text--red">E-MAIL</p>
          <div class="flex flex-column flex-1">
            <textarea v-model="email" class="mtextarea"></textarea>
            <p>備註：若需設定多組 E-Mail，請以「;」區隔</p>
          </div>
        </div>
      </div>

      <!-- 備註區 -->
      <div class="flex flex-wrap">
        <div class="w-100 p-6">
          <p class="form__text">1. 使用者代號長度為 6~12 位。</p>
          <p class="form__text">2. 使用者代號採英數字混合。</p>
          <p class="form__text">3. A 碼長度為 6~12 位，英數字混合。</p>
        </div>
      </div>
    </form>
  </MCard>

  <div class="m-t-12">
    <MCard>
      <div class="flex flex-wrap">
        <div class="w-33 w-md-100 p-6">
          <p class="form__text">申請功能別： 新增</p>
          <div class="flex flex-column flex-1">{{ featureType }}</div>
        </div>
      </div>
    </MCard>
  </div>
</template>

<script setup lang="ts">
import MCard from '@/components/common/MCard.vue';
import { ref, onMounted } from 'vue';
import { useFormContext } from 'vee-validate';
import {
  getRegionOptions,
  getCustomerIdOptions,
} from '@/services/B01002Service';

// 狀態
const regionOptions = ref<any[]>([]);
const customerIdOptions = ref<any[]>([]);

// 表單綁定欄位
const { defineField, errors } = useFormContext();
const [region] = defineField('region');
const [customerType] = defineField('customerType');
const [customerId] = defineField('customerId');
const [ssoUser] = defineField('ssoUser');
const [code] = defineField('code');
const [name] = defineField('name');
const [pwdA] = defineField('pwdA');
const [telephone] = defineField('telephone');
const [email] = defineField('email');
const [featureType] = defineField('featureType');

// 載入初始資料
const fetchInitialData = async () => {
  try {
    const [regionRes, customerIdRes] = await Promise.all([
      getRegionOptions(),
      getCustomerIdOptions(),
    ]);
    regionOptions.value = regionRes.data || [];
    customerIdOptions.value = customerIdRes.data || [];
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

onMounted(fetchInitialData);

// 事件
const searchCompanyId = () => {
  console.log('查詢公司名稱:', customerId.value);
};

const onSubmit = () => {
  console.log('送出資料');
};
</script>
