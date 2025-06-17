<template>
  <Header />
  <HomeBlessing />
  <Service />
  <Service2 />

  <Footer />
</template>

<script setup>
import HomeBlessing from '@/components/HomeBlessing.vue';
import Header from '@/components/Header.vue';
import Title from '@/components/common/Title.vue';
import Footer from '@/components/Footer.vue';
import GodList from '@/components/GodList.vue';
import Service from '@/components/Service.vue';
import Service2 from '@/components/Service2.vue';
import Worship from '@/components/Worship.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
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
