<script lang="ts" setup>
import { authStore } from "~~/store/auth";
import { Fields, UserPicture } from "~~/utils/Interface";
import { profileField, careerFields, educationFields } from "@/utils/fields";

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
  [key: string]: string | number | string[] | Object | null | Career;
}
interface Career {
  position?: string;
  company_name?: string;
  starting_from?: string;
  ending_in?: string;
}
// State
const tab = ref<string>("information");
const userData = ref<UserData>({});
const informationFieldsData = ref<Fields[]>([]);
const careerFieldsData = ref<Fields[]>([]);
const educationFieldsData = ref<Fields[]>([]);
const galleryData = ref<UserPicture[]>([]);

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
  // Information
  informationFieldsData.value = await setValue(profileField, "information");
  careerFieldsData.value = await setValue(careerFields, "career");
  educationFieldsData.value = await setValue(educationFields, "education");
  galleryData.value = userData.value["user_pictures"] as UserPicture[];
  loading.profile = false;
};

// Function
const setValue = async (data: Fields[], label: string): Promise<Fields[]> => {
  const tmp = await data.map((item) => ({
    ...item,
    defaultValue: defaultValue(label, item),
  }));
  return tmp;
};

const defaultValue = (label: string, item: Fields) => {
  if (label === "information") {
    return Object.keys(userData.value).includes(item.valueName)
      ? userData.value[`${item.valueName}`] === "male"
        ? 0
        : userData.value[`${item.valueName}`] === "female"
        ? 1
        : userData.value[`${item.valueName}`]
        ? userData.value[`${item.valueName}`]
        : ""
      : "";
  } else if (label === "career") {
    const keys: UserData = userData.value["career"] as UserData;
    return Object.keys(keys).includes(item.valueName)
      ? keys[`${item.valueName}`] === "male"
        ? 0
        : keys[`${item.valueName}`] === "female"
        ? 1
        : keys[`${item.valueName}`]
        ? keys[`${item.valueName}`]
        : ""
      : "";
  } else if (label === "education") {
    const keys: UserData = userData.value["education"] as UserData;
    return Object.keys(keys).includes(item.valueName)
      ? keys[`${item.valueName}`] === "male"
        ? 0
        : keys[`${item.valueName}`] === "female"
        ? 1
        : keys[`${item.valueName}`]
        ? keys[`${item.valueName}`]
        : ""
      : "";
  }
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
        <PretestLayoutTab
          :tab-data="tabData"
          :tab="tab"
          @tab="handleTab($event)"
        />

        <div class="w-full flex flex-col gap-8 items-stretch grow-[1]">
          <div
            class="w-full border border-gray-700 p-6 rounded-[8px] flex flex-col gap-2 h-full"
          >
            <div v-if="loading.profile" class="loading-wrapper">
              <AtomsALoader color="blue-500" />
            </div>
            <Transition>
              <PretestInformation
                v-if="tab === 'information' && informationFieldsData.length"
                :fields-data="informationFieldsData"
                class="transition-all duration-1000 ease-in-out"
                @tab="handleTab($event)"
              />
            </Transition>
            <Transition>
              <PretestCareer
                v-if="tab === 'career' && careerFieldsData.length"
                :fields-data="careerFieldsData"
                class="transition-all duration-1000 ease-in-out"
                @tab="handleTab($event)"
              />
            </Transition>
            <Transition>
              <PretestEducation
                v-if="tab === 'education' && educationFieldsData.length"
                :fields-data="educationFieldsData"
                class="transition-all duration-1000 ease-in-out"
                @tab="handleTab($event)"
              />
            </Transition>
            <Transition>
              <PretestGallery
                v-if="tab === 'gallery' && galleryData.length"
                :data="galleryData"
                class="transition-all duration-1000 ease-in-out"
                @tab="handleTab($event)"
              />
            </Transition>
          </div>
        </div>
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
    @apply w-full bg-white px-6 py-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border rounded-[16px] flex flex-col border-none min-h-full;
  }
}
.loading-wrapper {
  @apply w-full h-full flex items-center justify-center;
}
</style>
