<template>
  <MCard>
    <form class="form">
      <div class="flex m-b-16">
        <p class="form__text form__text--title">自動化傳輸設定</p>
      </div>

      <div class="flex flex-wrap">
        <div class="w-100 w-md-100 p-6">
          <label class="flex items-center">
            <input type="checkbox" v-model="isSftpTransfer" />
            <span class="ml-2">使用 SFTP 自動化檔案傳輸</span>
          </label>
        </div>

        <div class="w-100 w-md-100 p-6" v-if="isSftpTransfer">
          <p class="form__text">是否使用客製化</p>
          <label
            ><input type="radio" value="0" v-model="sftpCustomize" />
            公版</label
          >
          <label class="ml-4"
            ><input type="radio" value="1" v-model="sftpCustomize" />
            客製化</label
          >
        </div>

        <div class="w-100 w-md-100 p-6" v-if="isSftpTransfer">
          <p class="form__text">加密方式</p>
          <label
            ><input type="radio" value="ZIP" v-model="encryptType" /> ZIP</label
          >
          <label class="ml-4"
            ><input type="radio" value="PGP" disabled /> PGP</label
          >
        </div>

        <div class="w-100 w-md-100 p-6" v-if="isSftpTransfer">
          <label class="flex items-center">
            <input type="checkbox" v-model="isHasOkFile" />
            <span class="ml-2">是否需有 OK 檔</span>
          </label>
          <div class="flex flex-column flex-1 mt-2">
            <p class="form__text">OK 檔副檔名</p>
            <input
              v-model="okFileSubname"
              class="minput"
              placeholder="請輸入副檔名"
            />
          </div>
        </div>
      </div>
    </form>
  </MCard>
</template>

<script setup lang="ts">
import { useFormContext } from 'vee-validate';

const { defineField } = useFormContext();
const [isSftpTransfer] = defineField('customerAutotransfer.isSftpTransfer');
const [sftpCustomize] = defineField('customerAutotransfer.sftpCustomize');
const [encryptType] = defineField('customerAutotransfer.encryptType');
const [isHasOkFile] = defineField('customerAutotransfer.isHasOkFile');
const [okFileSubname] = defineField('customerAutotransfer.okFileSubname');
</script>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}
.ml-4 {
  margin-left: 1rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
</style>
