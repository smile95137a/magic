<script setup>
import { inject, onMounted } from 'vue';

const props = defineProps({
  name: String,
});

const activeTab = inject('activeTab');
const setActiveTab = inject('setActiveTab');

onMounted(() => {
  if (!activeTab.value) {
    setActiveTab(props.name);
  }
});
</script>

<template>
  <div v-if="activeTab === name">
    <slot></slot>
  </div>
</template>
