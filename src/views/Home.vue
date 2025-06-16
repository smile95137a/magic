<template>
  <Header />

  <section class="home__card home__card--cloud">1</section>
  <section class="home__card home__card--red"><Worship /></section>
  <section class="home__card home__card--red"><Service /></section>
  <section class="home__card home__card--default"><Service2 /></section>
  <section class="home__card home__card--default">
    <GodList />
  </section>
  <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue';
import Title from '@/components/common/Title.vue';
import Footer from '@/components/Footer.vue';
import GodList from '@/components/GodList.vue';
import Service from '@/components/Service.vue';
import Service2 from '@/components/Service2.vue';
import Worship from '@/components/Worship.vue';
</script>

<style lang="scss" scoped>
.home {
  &__card {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;

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
