<template>
  <div :class="['section-bg', `section-bg--${variant}`]" :style="customStyle">
    <template v-if="variant === 'code'">
      <div class="section-bg__code">
        <span class="section-bg__code-id">{{ code }}</span>
        <div class="section-bg__images">
          <img :src="imgLeft" alt="left" />
          <img :src="imgRight" alt="right" />
        </div>
      </div>
    </template>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'divination' | 'worship' | 'light' | 'special' | 'code';
    code?: string;
    imgLeft?: string;
    imgRight?: string;
    backgroundImage?: string;
  }>(),
  {
    variant: 'divination',
    code: '',
    imgLeft: '',
    imgRight: '',
    backgroundImage: '',
  }
);

const customStyle = computed(() => {
  return props.variant === 'code' && props.backgroundImage
    ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};
});
</script>

<style scoped lang="scss">
.section-bg {
  width: 100%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  color: #fff;

  &--divination {
    background: linear-gradient(90deg, #a03c29, #b9472e);
  }

  &--worship {
    background: linear-gradient(90deg, #a64444, #bf6551);
  }

  &--light {
    background: #f9f5f0;
    color: #333;
  }

  &--special {
    background: linear-gradient(41.51deg, #e0664d 24.05%, #a53b25 60.53%);
    color: #c2aeaa;
  }

  &--code {
    position: relative;
    color: #fff;
    text-align: center;
  }

  &__code {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  &__code-id {
    font-size: 24px;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.4);
    padding: 8px 16px;
    border-radius: 6px;
  }

  &__images {
    display: flex;
    gap: 16px;

    img {
      width: 120px;
      height: auto;
      border-radius: 8px;
    }
  }
}
</style>
