<script lang="ts" setup>
interface Props {
  title: string;
  subtitle: string;
  icon: string;
}

// define Props
const props = defineProps<Props>();
</script>
<template>
  <div class="flex">
    <div>
      <p class="text-[16px] font-[500]">{{ title }}</p>
      <p class="text-[12px] font-normal">{{ subtitle }}</p>
    </div>
    <Icon :name="icon" class="last:ml-auto text-blue-600 cursor-pointer" />
  </div>
</template>
