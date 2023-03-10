<script lang="ts" setup>
import { authStore } from "~~/store/auth";
import { Fields } from "~~/utils/Interface";
import { profileField } from "@/utils/fields";

// Page meta
definePageMeta({
  layout: "pretest",
  middleware: ["auth"],
  pageTransition: {
    name: "page",
  },
});

// Mounted
onMounted(() => {
  getUserProfile();
});

// define store
const auth = authStore();

// interface
interface UserData {
  [key: string]: string | number | string[] | Object | null;
}
// State
const tab = ref<string>("information");
const fields = ref<Fields[]>([]);
const userData = ref<UserData>({});

interface Loading {
  profile: boolean;
}
const loading = reactive<Loading>({
  profile: true,
});

// Function
const handleTab = (val: string) => {
  tab.value = val;
};

const getUserProfile = async () => {
  loading.profile = true;
  await useGetCredentials();

  userData.value = auth.userData;
  fields.value = await profileField.map((item) => ({
    ...item,
    defaultValue: Object.keys(auth.userData).includes(item.valueName)
      ? userData.value[`${item.valueName}`] === "male"
        ? 0
        : userData.value[`${item.valueName}`] === "female"
        ? 1
        : userData.value[`${item.valueName}`]
        ? userData.value[`${item.valueName}`]
        : ""
      : "",
  }));
  loading.profile = false;
};

const tabData: string[] = ["information", "career", "education", "gallery"];
</script>
<template>
  <div class="w-full relative h-full">
    <img src="@/statics/img/header.png" alt="Header Image" class="header-img" />
    <div class="py-20 px-14 flex flex-col items-center z-40 h-full">
      <div class="profile-wrapper">
        <div v-if="auth.userData.name">
          <p class="font-[600] text-[32px]">
            {{ auth.userData.name }}
          </p>
          <p class="font-normal text-[12px]">
            {{ "Level " + auth.userData.level + " - #" + auth.userData.id }}
          </p>
        </div>
        <div v-else class="rounded-md w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-2 py-1">
              <div class="h-8 bg-gray-300 rounded max-w-[400px]"></div>
              <div class="h-4 bg-gray-300 rounded max-w-[200px]"></div>
            </div>
          </div>
        </div>
        <LayoutTab :tab-data="tabData" :tab="tab" @tab="handleTab($event)" />
        <div v-if="loading.profile" class="loading-wrapper">
          <LoaderBlue />
        </div>
        <Transition>
          <LayoutPretestInformation
            v-if="tab === 'information' && fields.length"
            :fields-data="fields"
            class="transition-all duration-1000 ease-in-out"
            @tab="handleTab($event)"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-img {
  position: absolute;
  max-height: 293px;
  top: 0;
  left: 0;
  z-index: -1;
}
.profile {
  &-wrapper {
    @apply w-full bg-white px-6 py-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border rounded-[16px] border-none min-h-full;
  }
}
.loading-wrapper {
  @apply w-full h-[70%] flex items-center justify-center;
}
</style>
