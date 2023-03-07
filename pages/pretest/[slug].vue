<script lang="ts" setup>
import moment from "moment";

// define route
const route = useRoute();
const router = useRouter();

// meta
definePageMeta({
  layout: "pretest",
  middleware: ["auth"],
});

// state

const otp = ref<boolean>(false);

// function
const handleTab = (val: string) => {
  router.push(val);
};
</script>
<template>
  <div class="w-full">
    <span>{{ "Today " + moment(new Date()).format("MMM DD, YYYY") }}</span>
    <template v-if="route.params.slug != 'otp'">
      <LayoutTab :tab="route.params.slug.toString()" @tab="handleTab($event)" />
      <LayoutPretestLogin v-if="route.params.slug === 'login'" />
      <LayoutPretestRegister
        v-else-if="route.params.slug === 'register'"
        @tab="handleTab($event)"
      />
    </template>
    <LayoutPretestOtp
      v-else-if="route.params.slug === 'otp'"
      @tab="handleTab($event)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
