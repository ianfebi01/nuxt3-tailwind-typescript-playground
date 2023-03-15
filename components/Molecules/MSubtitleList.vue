<script lang="ts" setup>
import moment from "moment";

// define Props
interface Props {
  description: string | undefined;
  location: string | undefined;
  date: string | undefined;
}
const props = defineProps<Props>();

// function
const formatDate = (date: string | undefined): string => {
  return moment(date).format("DD MMM YYYY");
};
</script>
<template>
  <div class="flex gap-2 justify-center">
    <AtomsASubtitleList :title="props.description" />
    <Icon
      name="carbon:dot-mark"
      class="text-[12px] font-normal text-gray-300 translate-y-[3px]"
      size="10px"
    />
    <AtomsASubtitleList :title="props.location" />
    <Icon
      name="carbon:dot-mark"
      class="text-[12px] font-normal text-gray-300 translate-y-[3px]"
      size="10px"
    />
    <AtomsASubtitleList
      :title="formatDate(date)"
      font-weight="bold"
      color="blue-500"
    />
  </div>
</template>
