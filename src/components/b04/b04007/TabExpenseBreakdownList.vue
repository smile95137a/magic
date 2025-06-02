<script setup lang="ts">
import { computed } from 'vue';
import { Field, useFormContext, useFieldArray } from 'vee-validate';
import * as yup from 'yup';

// 取得表單上下文
const { errors } = useFormContext();

// 管理費用明細陣列
const { fields, push, remove } = useFieldArray<any>('details');

// 合計金額
const totalAmount = computed(() =>
  fields.value.reduce((sum, item) => {
    const amount = parseFloat(item.value.pay_amount || '0');
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0)
);

// 新增一筆費用明細
const addDetail = () => {
  push({
    pay_select: '',
    pay_detail: '',
    pay_desc: '',
    pay_amount: '',
  });
};

// 移除一筆費用明細
const removeDetail = (index: number) => {
  remove(index);
};
</script>

<template>
  <div class="flex flex-wrap w-100 p-6">
    <div class="flex justify-between items-center w-full m-b-4">
      <h2 class="form__text">費用明細列表</h2>
      <button type="button" class="mbtn" @click="addDetail">增加</button>
    </div>

    <table class="dataTable">
      <thead>
        <tr>
          <th width="5%" class="left">序號</th>
          <th>費用明細</th>
          <th>費用明細說明</th>
          <th>費用金額</th>
          <th class="right">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in fields"
          :key="item.key"
          :class="index % 2 === 0 ? 'dataTableOdd' : 'dataTableEven'"
        >
          <td class="leftline">{{ index + 1 }}</td>

          <td>
            <Field
              :name="`details[${index}].pay_detail`"
              class="minput"
              maxlength="30"
              placeholder="請輸入費用明細"
            />
            <div class="error-text">
              {{ (errors.details?.[index] as any)?.pay_detail }}
            </div>
          </td>

          <td>
            <Field
              :name="`details[${index}].pay_desc`"
              class="minput"
              maxlength="30"
              placeholder="說明"
            />
            <div class="error-text">
              {{ (errors.details?.[index] as any)?.pay_desc }}
            </div>
          </td>

          <td>
            <Field
              :name="`details[${index}].pay_amount`"
              class="minput"
              maxlength="10"
              placeholder="金額"
            />
            <div class="error-text">
              {{ (errors.details?.[index] as any)?.pay_amount }}
            </div>
          </td>

          <td align="center">
            <button
              class="mbtn mbtn-outline"
              type="button"
              @click="removeDetail(index)"
            >
              移除
            </button>
          </td>
        </tr>

        <tr class="dataTableEven dataTableSelected">
          <td class="leftline">&nbsp;</td>
          <td>合計</td>
          <td>&nbsp;</td>
          <td>{{ totalAmount.toLocaleString() }}</td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
