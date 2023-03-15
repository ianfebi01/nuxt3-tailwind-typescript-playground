<script lang="ts" setup>
// define props
interface Props {
  title: string | undefined;
  color: string | undefined;
  fontWeight: string | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  color: "gray-500",
  fontWeight: "normal",
});

const textClass: ComputedRef<string> = computed(
  () => `text-[12px] font-${props.fontWeight} text-${props.color}`
);
</script>

<template>
  <span :class="textClass">{{ props.title }}</span>
</template>
