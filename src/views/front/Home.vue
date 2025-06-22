<template>
  <HomeBlessing />
  <Service />
  <Service2 />
</template>

<script setup>
import HomeBlessing from '@/components/front/HomeBlessing.vue';
import Header from '@/components/front/Header.vue';
import Footer from '@/components/front/Footer.vue';
import Service from '@/components/front/Service.vue';
import Service2 from '@/components/front/Service2.vue';
</script>

<style lang="scss" scoped>
.home {
  &__card {
    width: 100%;
    padding: 2rem 1rem;

    &--default {
      background-color: #c2aeaa;
    }

    &--red {
      background: linear-gradient(41.51deg, #e0664d 24.05%, #a53b25 60.53%);

      color: #fff;
    }

    &--cloud {
      background-image: url('@/assets/bg-cloud.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #f5f2ee;
    }
  }
}
</style>
