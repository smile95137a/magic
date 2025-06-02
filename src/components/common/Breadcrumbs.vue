<template>
  <nav class="breadcrumbs">
    <ul>
      <li v-for="(item, index) in breadcrumbs.items" :key="index">
        <template v-if="index < breadcrumbs.items.length - 1">
          <RouterLink :to="item.to" class="breadcrumb-link">
            {{ item.label }}
          </RouterLink>
          <span class="separator">/</span>
        </template>
        <template v-else>
          <span class="breadcrumb-current">{{ item.label }}</span>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useBreadcrumbsStore } from '@/stores';

const breadcrumbs = useBreadcrumbsStore();
</script>

<style scoped>
.breadcrumbs {
  font-size: 14px;
  color: #4a5568;
  padding: 8px 0;
}

.breadcrumbs ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  text-decoration: none;
  color: #3182ce;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #2b6cb0;
}

.separator {
  margin: 0 8px;
  color: #a0aec0;
}

.breadcrumb-current {
  color: #2d3748;
  font-weight: 500;
}
</style>
