<!-- components/common/FormField.vue -->
<template>
  <div :class="columnClass">
    <p :class="['form__text', isRequired ? 'form__text--red' : '']">
      {{ label }}
    </p>
    <div class="flex flex-column flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  isRequired?: boolean;
  xs?: string;
  md?: string;
  lg?: string;
}>();

const columnClass = computed(() => {
  const classes = [];
  if (props.xs) classes.push(`w-${props.xs}`);
  if (props.md) classes.push(`w-md-${props.md}`);
  if (props.lg) classes.push(`w-lg-${props.lg}`);
  classes.push('p-6');
  return classes.join(' ');
});
</script>
