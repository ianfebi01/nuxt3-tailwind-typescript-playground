<script lang="ts" setup>
interface Props {
  date: string;
}

const props = withDefaults(defineProps<Props>(), {
  date: "set your date",
});

// define emit
const emit = defineEmits(["clickButton"]);
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="flex flex-col">
      <span class="text-[18px] font-bold text-gray-800">To Do List</span>
      <span class="text-[12px] font-normal text-gray-500">{{
        props.date
      }}</span>
    </div>
    <AtomsAButton color="blue-600" bg="blue-200" @click="emit('clickButton')">
      <template #default>
        <Icon name="mdi:plus" class="translate-y-[-1px] mr-1 font-bold" />
        <span>New Task</span>
      </template>
    </AtomsAButton>
  </div>
</template>
