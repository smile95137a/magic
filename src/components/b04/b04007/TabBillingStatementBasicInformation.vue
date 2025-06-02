<template>
  <MCard>
    <div class="flex m-b-16">
      <p class="form__text form__text--title">單筆繳費單製作</p>
    </div>
    <!-- 公司名稱（下拉） -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text form__text--red">公司名稱</p>
        <div class="flex flex-1">
          <div class="flex flex-column flex-1">
            <select
              v-model="companyId"
              class="mselect"
              :class="{ 'error-border': errors.companyId }"
            >
              <option value="">全部</option>
              <option
                v-for="item in companyOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <span class="error-text" v-if="errors.companyId">{{
              errors.companyId
            }}</span>
          </div>
          <div class="flex items-center p-x-12" @click="searchCompanyId">
            <i class="fas fa-search m-r-2"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 業務類別 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text form__text--red">業務類別</p>
        <select
          v-model="businessType"
          class="mselect"
          :class="{ 'error-border': errors.businessType }"
        >
          <option value="">全部</option>
          <option
            v-for="item in businessOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
        <span class="error-text" v-if="errors.businessType">{{
          errors.businessType
        }}</span>
      </div>
    </div>

    <!-- 版型 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__tex form__text--red">版型</p>
        <select
          v-model="modelUuid"
          class="mselect"
          :class="{ 'error-border': errors.modelUuid }"
        >
          <option value="">請選擇</option>
          <option
            v-for="item in styleOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
        <span class="error-text" v-if="errors.modelUuid">{{
          errors.modelUuid
        }}</span>
      </div>
    </div>

    <!-- 公司名稱（顯示文字） -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">公司名稱</p>
        <input
          v-model="companyName"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.companyName }"
        />
        <span class="error-text" v-if="errors.companyName">{{
          errors.companyName
        }}</span>
      </div>
    </div>

    <!-- 公司地址 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">公司地址</p>
        <input
          v-model="companyAddress"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.companyAddress }"
        />
        <span class="error-text" v-if="errors.companyAddress">{{
          errors.companyAddress
        }}</span>
      </div>
    </div>

    <!-- 公司電話 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">公司電話</p>
        <input
          v-model="companyTel"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.companyTel }"
        />
        <span class="error-text" v-if="errors.companyTel">{{
          errors.companyTel
        }}</span>
      </div>
    </div>

    <!-- 繳款人識別碼 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">繳款人識別碼</p>
        <input
          v-model="payCode"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.payCode }"
        />
        <span class="error-text" v-if="errors.payCode">{{
          errors.payCode
        }}</span>
      </div>
    </div>

    <!-- 繳款人姓名 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">繳款人姓名</p>
        <input
          v-model="payName"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.payName }"
        />
        <span class="error-text" v-if="errors.payName">{{
          errors.payName
        }}</span>
      </div>
    </div>

    <!-- 郵遞區號 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">繳款人郵遞區號</p>
        <input
          v-model="payPost"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.payPost }"
        />
        <span class="error-text" v-if="errors.payPost">{{
          errors.payPost
        }}</span>
      </div>
    </div>

    <!-- 地址 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">繳款人地址</p>
        <input
          v-model="payAddress"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.payAddress }"
        />
        <span class="error-text" v-if="errors.payAddress">{{
          errors.payAddress
        }}</span>
      </div>
    </div>

    <!-- 繳費期限 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">繳費期限</p>
        <input
          v-model="deadlineTime"
          type="date"
          class="minput"
          :class="{ 'error-border': errors.deadlineTime }"
        />
        <span class="error-text" v-if="errors.deadlineTime">{{
          errors.deadlineTime
        }}</span>
      </div>
    </div>

    <!-- 代收期限 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">代收期限</p>
        <input
          v-model="barcodeAgentReceiveTime"
          type="date"
          class="minput"
          :class="{ 'error-border': errors.barcodeAgentReceiveTime }"
        />
        <span class="error-text" v-if="errors.barcodeAgentReceiveTime">{{
          errors.barcodeAgentReceiveTime
        }}</span>
      </div>
    </div>

    <!-- 身份證號碼 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">身份證號碼</p>
        <input
          v-model="uniformno"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.uniformno }"
        />
        <span class="error-text" v-if="errors.uniformno">{{
          errors.uniformno
        }}</span>
      </div>
    </div>

    <!-- 自訂識別碼名稱1 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">自訂識別碼名稱1</p>
        <input v-model="specCodeName1" type="text" class="minput" readonly />
      </div>
    </div>

    <!-- 自訂識別碼名稱2 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">自訂識別碼名稱2</p>
        <input v-model="specCodeName2" type="text" class="minput" readonly />
      </div>
    </div>

    <!-- 自訂識別碼1 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">自訂識別碼1</p>
        <input
          v-model="specCodeValue1"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.specCodeValue1 }"
        />
        <span class="error-text" v-if="errors.specCodeValue1">{{
          errors.specCodeValue1
        }}</span>
      </div>
    </div>

    <!-- 自訂識別碼2 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">自訂識別碼2</p>
        <input
          v-model="specCodeValue2"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.specCodeValue2 }"
        />
        <span class="error-text" v-if="errors.specCodeValue2">{{
          errors.specCodeValue2
        }}</span>
      </div>
    </div>

    <!-- 繳款人email -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">繳款人 Email</p>
        <input
          v-model="payEmail"
          type="email"
          class="minput"
          :class="{ 'error-border': errors.payEmail }"
        />
        <span class="error-text" v-if="errors.payEmail">{{
          errors.payEmail
        }}</span>
      </div>
    </div>

    <!-- 超商代收自付手續費 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">超商代收自付手續費</p>
        <input
          v-model="storeAgentFee"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.storeAgentFee }"
        />
        <span class="error-text" v-if="errors.storeAgentFee">{{
          errors.storeAgentFee
        }}</span>
      </div>
    </div>

    <!-- 注意事項 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">注意事項</p>
        <input
          v-model="notice"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.notice }"
        />
        <span class="error-text" v-if="errors.notice">{{ errors.notice }}</span>
      </div>
    </div>

    <!-- 銀行條碼一 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">銀行條碼一</p>
        <input
          v-model="bankBarcode1"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.bankBarcode1 }"
        />
        <span class="error-text" v-if="errors.bankBarcode1">{{
          errors.bankBarcode1
        }}</span>
      </div>
    </div>

    <!-- 郵局條碼二 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">郵局條碼二</p>
        <input
          v-model="postBarcode2"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.postBarcode2 }"
        />
        <span class="error-text" v-if="errors.postBarcode2">{{
          errors.postBarcode2
        }}</span>
      </div>
    </div>

    <!-- 超商條碼二 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">超商條碼二</p>
        <input
          v-model="storeBarcode2"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.storeBarcode2 }"
        />
        <span class="error-text" v-if="errors.storeBarcode2">{{
          errors.storeBarcode2
        }}</span>
      </div>
    </div>

    <!-- 備註 -->
    <div class="flex flex-wrap">
      <div class="w-50 w-md-100 p-6">
        <p class="form__text">備註</p>
        <input
          v-model="remark"
          type="text"
          class="minput"
          :class="{ 'error-border': errors.remark }"
        />
        <span class="error-text" v-if="errors.remark">{{ errors.remark }}</span>
      </div>
    </div>
  </MCard>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useFormContext } from 'vee-validate';
import { useDialogStore, useLoadingStore } from '@/stores';
import MCard from '@/components/common/MCard.vue';
import { useBreadcrumb } from '@/hook/useBreadcrumb';

import {
  getBillerStyleOptions,
  getCompanyIdOptions,
  getFullBillerInfosOptions,
  saveB04007,
} from '@/services/B04007Service';

//
const router = useRouter();
const loadingStore = useLoadingStore();
const dialogStore = useDialogStore();

const companyOptions = ref<SelectOption[]>([]);
const businessOptions = ref<SelectOption[]>([]);
const styleOptions = ref<SelectOption[]>([]);

const loadSelectOptions = async () => {
  try {
    const [res1, res2, res3] = await Promise.all([
      getCompanyIdOptions(),
      getFullBillerInfosOptions({}),
      getFullBillerInfosOptions({}),
    ]);
    companyOptions.value = res1.data || [];
    businessOptions.value = res2.data || [];
    styleOptions.value = res3.data || [];
  } catch (error) {
    console.error('Error loading select options:', error);
  }
};

onMounted(loadSelectOptions);

// Form handling module
const { defineField, errors } = useFormContext();
// 定義欄位綁定
const [companyId] = defineField('companyId');
const [companyName] = defineField('companyName');
const [businessType] = defineField('businessType');
const [businessTypeName] = defineField('businessTypeName');
const [modelUuid] = defineField('modelUuid');
const [companyAddress] = defineField('companyAddress');
const [companyTel] = defineField('companyTel');
const [payCode] = defineField('payCode');
const [payName] = defineField('payName');
const [payPost] = defineField('payPost');
const [payAddress] = defineField('payAddress');
const [minDeadlineTime] = defineField('minDeadlineTime');
const [deadlineTime] = defineField('deadlineTime');
const [minBarcodeAgentReceiveTime] = defineField('minBarcodeAgentReceiveTime');
const [barcodeAgentReceiveTime] = defineField('barcodeAgentReceiveTime');
const [uniformno] = defineField('uniformno');
const [specCodeName1] = defineField('specCodeName1');
const [specCodeName2] = defineField('specCodeName2');
const [specCodeValue1] = defineField('specCodeValue1');
const [specCodeValue2] = defineField('specCodeValue2');
const [payEmail] = defineField('payEmail');
const [storeAgentFee] = defineField('storeAgentFee');
const [notice] = defineField('notice');
const [bankBarcode1] = defineField('bankBarcode1');
const [postBarcode2] = defineField('postBarcode2');
const [storeBarcode2] = defineField('storeBarcode2');
const [remark] = defineField('remark');

const searchCompanyId = async () => {};

watch(companyId, async (newVal) => {
  if (!newVal) {
    businessOptions.value = [];
    return;
  }

  try {
    const res = await getFullBillerInfosOptions({ companyId: newVal });
    businessOptions.value = res.data || [];
  } catch (error) {
    console.error(
      'Failed to load business options for companyId:',
      newVal,
      error
    );
    businessOptions.value = [];
  }
});
</script>
