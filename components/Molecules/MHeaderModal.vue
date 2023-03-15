<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);

// define props
interface Props {
  modelValue: boolean;
  title: string;
}
const props = defineProps<Props>();

// v-model
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <div class="flex justify-between">
    <AtomsATitleList
      :title="title"
      font-size="24px"
      color="gray-800"
      font-weight="semibold"
    />
    <icon name="mdi:close" class="cursor-pointer" @click="value = false" />
  </div>
</template>
