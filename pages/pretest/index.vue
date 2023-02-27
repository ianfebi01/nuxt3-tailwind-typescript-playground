<script lang="ts" setup>
import moment from "moment";

// meta
definePageMeta({
  layout: "pretest",
});

// state
const tab = ref<string>("login");

// function
const handleTab = (val: string) => {
  tab.value = val;
};
const otp = ref<boolean>(true);
</script>
<template>
  <div class="w-full">
    <span>{{ "Today " + moment(new Date()).format("MMM DD, YYYY") }}</span>
    <template v-if="!otp">
      <LayoutTab :tab="tab" @tab="handleTab($event)" />
      <LayoutPretestLogin v-if="tab === 'login'" />
      <LayoutPretestRegister v-else-if="tab === 'register'" />
    </template>
    <LayoutPretestOtp v-else />
  </div>
</template>

<style lang="scss" scoped></style>
