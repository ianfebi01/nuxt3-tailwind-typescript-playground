<template>
  <div class="container px-6 py-10 flex gap-2 cursor-pointer overflow-auto">
    <div v-for="(item, i) in datas" :key="i" class="flex flex-col flex-1 gap-2">
      <div
        v-for="(gase, j) in item"
        :key="j"
        class="relative overflow-hidden flex items-center"
      >
        <img class="" :src="gase.image" alt="" />

        <div
          class="absolute top-0 left-0 w-full h-full bg-[#161616] flex items-center justify-center opacity-0 transition duration-500 hover:opacity-[0.5]"
        >
          <span class="text-base-white">{{ gase.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { posts } from "@/dumy/masonry";

// Page Meta
definePageMeta({
  layout: "default",
});

// Masonry
const previousScreenSize = ref<number>(0);
const screen: Ref<string> = ref("lg");

const datas: ComputedRef = computed(() => {
  let col =
    screen.value == "xs"
      ? 1
      : screen.value == "sm"
      ? 2
      : screen.value == "md"
      ? 3
      : screen.value == "lg"
      ? 4
      : 5;

  return divideArray(col, posts);
});

onMounted(() => {
  previousScreenSize.value = window.innerWidth;
  window.addEventListener("resize", onResize);
});

const divideArray = (length: number, array: object[]) => {
  const newArray = [...array];
  const divideRes = Math.floor(newArray.length / length);
  let results = [];

  for (let i = 0; i < length; i++) {
    results.push(newArray.splice(0, divideRes));
  }

  for (let i = 0; i < newArray.length; i++) {
    results[i].push(newArray[i]);
  }

  results = results.filter((itm) => itm.length);

  return results;
};

const onResize = () => {
  if (window.innerWidth < 600 && previousScreenSize.value >= 600) {
    screen.value = "xs";
  } else if (
    window.innerWidth >= 600 &&
    window.innerWidth < 1000 &&
    (previousScreenSize.value < 600 || previousScreenSize.value >= 1000)
  ) {
    screen.value = "sm";
  } else if (window.innerWidth >= 1000 && previousScreenSize.value < 1000) {
    screen.value = "md";
  } else if (window.innerWidth > 1000) {
    screen.value = "lg";
  }
  previousScreenSize.value = window.innerWidth;
};
</script>
