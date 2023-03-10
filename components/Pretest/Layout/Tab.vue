<script lang="ts" setup>
// emit
const emit = defineEmits(["tab"]);

interface Props {
  tab: string;
  tabData: Array<string>;
}
const props = defineProps<Props>();

// state
const active: string = "text-blue-600 border-b-2 border-blue-600";
const inActive: string =
  "border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 cursor-pointer";

const handleTab = (val: string) => {
  emit("tab", val);
};

// function
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>
<template>
  <div class="w-full text-sm font-medium text-center text-gray-500 my-5">
    <ul class="flex flex-wrap w-full">
      <li
        v-for="item in tabData"
        :key="item"
        class="border-b border-gray-700 grow-[1]"
        @click="handleTab(item)"
      >
        <div
          :class="`inline-block p-4 border-b-2 ${
            tab === item ? active : inActive
          }`"
        >
          {{ capitalizeFirstLetter(item) }}
        </div>
      </li>
    </ul>
  </div>
</template>
