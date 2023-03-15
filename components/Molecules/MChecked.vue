<script lang="ts" setup>
// define props
interface Props {
  status: number | undefined;
}
const props = defineProps<Props>();

// define emit
const emit = defineEmits(["changeStatus"]);

// function
const changeStatus = (val: number) => {
  emit("changeStatus", val);
};
const iconColor: ComputedRef<string> = computed(() =>
  props.status ? "text-green-500" : "text-gray-300"
);
</script>
<template>
  <Icon
    name="mdi:checkbox-marked-circle"
    :class="`transition-colors duration-300 ease-in cursor-pointer ${iconColor}`"
    @click="changeStatus(props.status === 0 ? 1 : 0)"
  />
</template>
