<script lang="ts" setup>
// state

// define emit
const emit = defineEmits(["change", "update:modelValue"]);

// define props
interface Props {
  modelValue: boolean;
  title: string;
  autoHeight: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: "Enter Title",
  autoHeight: false,
});

// v-model
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// function
</script>
<template>
  <Transition>
    <div
      v-if="value"
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-[rgba(0,0,0,0.5)]"
    >
      <div class="relative w-full h-full flex items-center justify-center">
        <!-- content -->
        <div
          :class="`relative flex flex-col gap-2 w-full max-w-[706px] ${
            autoHeight ? '' : 'h-full'
          } max-h-[604px] bg-white rounded-lg shadow py-6 px-5`"
        >
          <MoleculesMHeaderModal v-model="value" :title="title" />

          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.upload-wrapper {
  @apply w-[706px] h-[604px] bg-white fixed top-1/2 mt-[-302px] ml-[-353px] left-1/2 z-20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-6 px-5 flex flex-col gap-4;
}
</style>
s
