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

// function
const handleTab = (val: string) => {
  router.push(val);
};

const tabData: string[] = ["login", "register"];
</script>
<template>
  <div class="py-20 px-20 flex flex-col items-center">
    <div class="w-full">
      <span>{{ "Today " + moment(new Date()).format("MMM DD, YYYY") }}</span>
      <template v-if="route.params.slug != 'otp'">
        <PretestLayoutTab
          :tab-data="tabData"
          :tab="route.params.slug.toString()"
          @tab="handleTab($event)"
        />
        <PretestLogin v-if="route.params.slug === 'login'" />
        <PretestRegister
          v-else-if="route.params.slug === 'register'"
          @tab="handleTab($event)"
        />
      </template>
      <PretestOtp
        v-else-if="route.params.slug === 'otp'"
        @tab="handleTab($event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
