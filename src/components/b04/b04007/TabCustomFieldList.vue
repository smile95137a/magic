<template>
  <MCard>
    <div class="flex flex-wrap w-100 p-6">
      <div class="flex justify-between items-center w-full m-b-4">
        <h2 class="form__text">自訂欄位列表</h2>
        <button type="button" class="mbtn" @click="addCustomField">增加</button>
      </div>

      <table class="dataTable w-full">
        <thead>
          <tr>
            <th class="left">自訂欄位序號</th>
            <th>自訂欄位名稱</th>
            <th>自訂欄位值</th>
            <th class="right">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in customFields"
            :key="item.key"
            :class="index % 2 === 0 ? 'dataTableOdd' : 'dataTableEven'"
          >
            <td>
              <select v-model="item.value.detailNo" class="mselect">
                <option v-for="n in 10" :key="n" :value="n">
                  自訂義欄位{{ n }}
                </option>
              </select>
            </td>
            <td>
              <input
                type="text"
                v-model="item.value.specFieldName"
                maxlength="30"
                class="minput"
                placeholder="請輸入欄位名稱"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.value.specField"
                maxlength="30"
                class="minput"
                placeholder="請輸入欄位值"
              />
            </td>
            <td align="center">
              <button
                class="mbtn mbtn-outline"
                type="button"
                @click="removeCustomField(index)"
              >
                移除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </MCard>
</template>

<script setup lang="ts">
import { useFieldArray, useFormContext } from 'vee-validate';
import MCard from '@/components/common/MCard.vue';

const {
  fields: customFields,
  push,
  remove,
} = useFieldArray<any>('customFields');

const addCustomField = () => {
  push({
    detailNo: customFields.value.length + 1,
    specFieldName: '',
    specField: '',
  });
};

const removeCustomField = (index: number) => {
  remove(index);
};
</script>
