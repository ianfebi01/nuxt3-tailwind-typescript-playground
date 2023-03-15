<script lang="ts" setup>
// define props
interface Props {
  title: string | undefined;
  color: string | undefined;
  fontWeight: string | undefined;
  fontSize: string | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  color: "gray-800",
  fontWeight: "semibold",
  fontSize: "16px",
});

const textClass: ComputedRef<string> = computed(
  () => `text-[${props.fontSize}] font-${props.fontWeight} text-${props.color}`
);
</script>

<template>
  <span :class="textClass">{{ props.title }}</span>
</template>
