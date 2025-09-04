<template>
  <div class="product-form">
    <h2 class="form__title">{{ isEdit ? '編輯商品' : '新增商品' }}</h2>
    <form @submit.prevent="onSubmit" class="form">
      <!-- 商品名稱 -->
      <div class="form__group">
        <label class="form__label">商品名稱</label>
        <input v-model="name" class="form__input" />
        <span class="form__error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <!-- 所屬分類 -->
      <div class="form__group">
        <label class="form__label">所屬分類</label>
        <select v-model="categoryId" class="form__input">
          <option disabled value="">請選擇分類</option>
          <option v-for="cat in categoryOptions" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <span class="form__error" v-if="errors.categoryId">{{
          errors.categoryId
        }}</span>
      </div>

      <!-- 副標題 -->
      <div class="form__group">
        <label class="form__label">副標題</label>
        <input v-model="subtitle" class="form__input" />
      </div>

      <!-- 描述 -->
      <div class="form__group">
        <label class="form__label">描述</label>
        <input v-model="description" class="form__input" />
      </div>

      <!-- 備註 -->
      <div class="form__group">
        <label class="form__label">備註</label>
        <input v-model="remark" class="form__input" />
      </div>

      <!-- 原價 -->
      <div class="form__group">
        <label class="form__label">原價</label>
        <input type="number" v-model="originalPrice" class="form__input" />
      </div>

      <!-- 特價 -->
      <div class="form__group">
        <label class="form__label">特價</label>
        <input type="number" v-model="specialPrice" class="form__input" />
      </div>

      <!-- 主圖上傳 -->
      <div class="form__group">
        <label class="form__label">主圖</label>
        <input type="file" @change="handleImageUpload" />
        <img
          v-if="mainImageUrl"
          :src="getImageUrl(mainImageUrl)"
          class="form__preview"
        />
      </div>

      <!-- 圖集上傳 -->
      <div class="form__group">
        <label class="form__label">其他圖</label>
        <input type="file" multiple @change="handleGalleryUpload" />
        <div class="form__gallery-preview">
          <div
            v-for="(img, index) in galleryImages"
            :key="index"
            class="form__gallery-image"
          >
            <img :src="getImageUrl(img.url)" />
            <button
              type="button"
              class="form__remove-button"
              @click="removeGalleryImage(index)"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- 商品內容 -->
      <div class="form__group">
        <label class="form__label">商品內容</label>
        <ckeditor
          :editor="editor"
          v-model="detailHtml"
          :config="editorConfig"
          class="custom-editor"
        />
      </div>

      <!-- 上架狀態 -->
      <div class="form__group">
        <label class="form__label">上架狀態</label>
        <select v-model="status" class="form__input">
          <option :value="true">上架</option>
          <option :value="false">下架</option>
        </select>
      </div>

      <div class="form__actions">
        <button
          type="button"
          class="form__button form__button--secondary"
          @click="goBack"
        >
          取消
        </button>
        <button type="submit" class="form__button form__button--primary">
          儲存
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import {
  createProductDraft,
  editProduct,
  fetchProductDetail,
  uploadProductImage,
  discardProduct,
} from '@/services/admin/adminProductServices';
import { withLoading } from '@/utils/loadingUtils';
import { fetchCategoryList } from '@/services/admin/adminCategoryServices';
import { getImageUrl } from '@/utils/ImageUtils';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string | undefined;
const isEdit = !!id;

const productId = ref<number>();
const categoryOptions = ref<any[]>([]);
const mainImageUrl = ref('');

// ===== 驗證 =====
const schema = object({
  name: string().required('商品名稱為必填'),
  categoryId: string().required('分類為必選'),
});

const { handleSubmit, defineField, setValues, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    categoryId: '',
    subtitle: '',
    description: '',
    remark: '',
    originalPrice: 0,
    specialPrice: 0,
    mainImage: '',
    galleryImages: [] as Array<{ url: string }>,
    detailHtml: '',
    status: true,
  },
});

const [name] = defineField('name');
const [categoryId] = defineField('categoryId');
const [subtitle] = defineField('subtitle');
const [description] = defineField('description');
const [remark] = defineField('remark');
const [originalPrice] = defineField('originalPrice');
const [specialPrice] = defineField('specialPrice');
const [mainImage] = defineField('mainImage');
const [detailHtml] = defineField('detailHtml');
const [status] = defineField('status');
const [galleryImages] = defineField('galleryImages');

// ===== 送出/丟棄草稿 控制 =====
const hasSubmitted = ref(false);

/** 僅在「新增草稿且尚未送出」時丟棄 */
const discardIfDraft = async () => {
  if (!isEdit && productId.value && !hasSubmitted.value) {
    try {
      await withLoading(() => discardProduct({ productId: productId.value }));
    } catch (err) {
      console.error('[discardIfDraft] discard failed', err);
    }
  }
};

// ===== 圖集圖片上傳 =====
const handleGalleryUpload = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const files = input.files;
  if (!files || !productId.value) return;

  for (const file of Array.from(files)) {
    try {
      const res = await uploadProductImage({
        file,
        productId: productId.value,
        type: 'gallery',
      });

      if (res.success && res.data?.url) {
        const nextSort = (galleryImages.value?.length || 0) + 1;

        galleryImages.value.push({
          id: res.data.id ?? undefined,
          url: res.data.url,
          sort: nextSort,
          description: res.data.description ?? null,
        } as any);
      } else {
        console.error('[handleGalleryUpload] upload failed:', res);
      }
    } catch (err) {
      console.error('[handleGalleryUpload] error:', err);
    }
  }

  input.value = '';
};

// 移除圖集圖片（僅前端陣列移除；若要同步刪檔可呼叫 deleteProductImage）
const removeGalleryImage = (index: number) => {
  galleryImages.value.splice(index, 1);
};

// ===== 返回（取消） =====
const goBack = async () => {
  await discardIfDraft();
  router.push('/admin/mall/items');
};

// ===== 主圖上傳 =====
const handleImageUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file || !productId.value) return;

  const res = await uploadProductImage({
    file,
    productId: productId.value,
    type: 'main',
  });

  if (res.success) {
    mainImage.value = res.data.url;
    mainImageUrl.value = res.data.url;
  }
};

// ===== 送出 =====
const onSubmit = handleSubmit(async (formValues) => {
  if (!productId.value) return;

  await withLoading(() =>
    editProduct({
      productId: productId.value,
      ...formValues,
    })
  );

  hasSubmitted.value = true; // ✅ 送出成功後不再丟棄
  goBack();
});

// ===== 初始化 =====
onMounted(async () => {
  // 載入分類選項
  try {
    const res = await fetchCategoryList();
    if (res.success && Array.isArray(res.data)) {
      categoryOptions.value = res.data;
    }
  } catch (error) {
    console.error('分類載入失敗', error);
  }

  if (isEdit && id) {
    const res = await fetchProductDetail(Number(id));
    if (res.success && res.data) {
      productId.value = res.data.id;
      setValues({
        name: res.data.name,
        categoryId: res.data.categoryId,
        subtitle: res.data.subtitle,
        description: res.data.description,
        remark: res.data.remark,
        originalPrice: res.data.originalPrice,
        specialPrice: res.data.specialPrice,
        mainImage: res.data.mainImageUrl,
        detailHtml: res.data.detailHtml,
        status: res.data.status,
        galleryImages: res.data.galleryImages ?? [],
      });
      mainImageUrl.value = res.data.mainImageUrl || '';
    }
  } else {
    const res = await createProductDraft();
    if (res.success) {
      productId.value = res.data.productId;
    }
  }
});

// 主圖雙向
watch(mainImage, (val) => {
  mainImageUrl.value = val;
});

// ===== 路由離開守衛（切換頁面時自動丟棄） =====
onBeforeRouteLeave(async (_to, _from, next) => {
  await discardIfDraft();
  next();
});

// ===== 視窗關閉/重新整理提示（可選）=====
// 讀 cookie 小工具
function getCookie(name: string): string | null {
  const m = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return m ? decodeURIComponent(m[1]) : null;
}

const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
  if (!isEdit && productId.value && !hasSubmitted.value) {
    // 顯示離開提示（可留可去）
    e.preventDefault();
    e.returnValue = '';

    const body = JSON.stringify({ productId: productId.value });

    // 取 CSRF（若後端用 CookieCsrfTokenRepository，預設 cookie 名可能是 XSRF-TOKEN 或 X-CSRF-TOKEN）
    const csrf = getCookie('XSRF-TOKEN') || getCookie('X-CSRF-TOKEN');

    // 取 JWT（依你專案實際儲存位置）
    const accessToken =
      localStorage.getItem('admin_token') ||
      sessionStorage.getItem('admin_token');

    // 優先使用 fetch keepalive（可帶 header）
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (csrf) headers['X-XSRF-TOKEN'] = csrf; // Spring Security 預設讀這個 header
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

      // keepalive 允許請求在頁面卸載後繼續
      fetch('/admin/product/discard', {
        method: 'POST',
        headers,
        body,
        keepalive: true,
        credentials: 'include', // 若用 session/cookie 驗證需要
        // mode: 'same-origin' // 視情況加（同源時可省略）
      });
    } catch {
      // Fallback: sendBeacon（無法帶 header，只有在你放寬 CSRF 或改白名單時才會成功）
      try {
        const payload = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon('/admin/product/discard', payload);
      } catch (err) {
        console.error('[beforeunload] beacon failed', err);
      }
    }
  }
};

window.addEventListener('beforeunload', beforeUnloadHandler);
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeUnloadHandler);
});

// ===== CKEditor =====
const editor = ClassicEditor as any;

// 自定義 CKEditor 配置，啟用圖片大小調整功能
const editorConfig = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'imageUpload',
    '|',
    'imageResize',
  ],
  language: 'zh-tw',
  image: {
    toolbar: ['imageStyle:full', 'imageStyle:side', 'imageResize'],
    resizeOptions: [
      { name: 'resizeImage:original', label: '原始大小', value: null },
      { name: 'resizeImage:50', label: '50%', value: '50' },
      { name: 'resizeImage:75', label: '75%', value: '75' },
    ],
    resizeUnit: '%' as '%' | 'px',
  },
  extraPlugins: [CustomUploadAdapterPlugin],
};

function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new MyCustomUploadAdapter(loader);
  };
}

class MyCustomUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(async (file: File) => {
      try {
        if (!productId.value) throw new Error('尚未取得商品 ID');
        const res = await withLoading(() =>
          uploadProductImage({
            file,
            productId: productId.value,
            type: 'description',
          })
        );

        if (res.success && res.data?.url) {
          const url = getImageUrl(res.data.url);
          return { default: url };
        } else {
          console.error('圖片上傳失敗', res);
          throw new Error('圖片上傳失敗，請稍後再試');
        }
      } catch (err) {
        console.error('圖片上傳錯誤', err);
        throw err;
      }
    });
  }

  abort() {
    console.log('圖片上傳被中止');
  }
}
</script>

<style scoped lang="scss">
.form__preview {
  margin-top: 1rem;
  max-height: 120px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.form__gallery-preview {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 1rem;
}
.form__gallery-image {
  position: relative;
  width: 120px;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .form__remove-button {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
