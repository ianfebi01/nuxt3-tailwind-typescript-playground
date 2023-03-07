<script lang="ts" setup>
import { authStore } from "~~/store/auth";

const auth = authStore();

const { errorMessage, successMessage } = auth;
</script>
<template>
  <div class="flex w-full min-h-screen font-poppins">
    <div
      class="w-0 md:w-[80%] bg-[#F3F5F9] flex items-center justify-center overflow-hidden"
    >
      <div class="max-w-[368px] mb-[30vh] p-4">
        <img src="@/statics/img/Logo.svg" alt="Logo Privy" class="mb-10" />
        <div class="ml-10">
          <p class="text-2xl font-[600] mb-5">Welcome to Privysign</p>
          <p class="text-sm font-normal">
            Is a personal data platform, you can update your information about
            yourself, customize your profile and change a lot of things
          </p>
        </div>
        <Transition>
          <div
            v-if="auth.successMessage"
            class="mt-6 flex gap-4 justify-center items-center text-[12px] bg-white p-2 border rounded-[8px] border-transparent"
          >
            <icon
              name="bi:check-circle-fill"
              class="text-green-400"
              size="25px"
            />
            {{ auth.successMessage }}
            <icon
              name="bi:x"
              size="30px"
              class="transition-all duration-300 hover:bg-gray-50 p-0 border rounded-[8px] border-none"
              style="cursor: pointer"
              @click="auth.successMessage = ''"
            />
          </div>
        </Transition>
        <Transition>
          <div
            v-if="auth.errorMessage"
            class="mt-6 flex gap-4 justify-center items-center text-[12px] bg-white p-2 border rounded-[8px] border-transparent"
          >
            <icon
              name="bi:exclamation-circle-fill"
              class="text-red-400"
              size="25px"
            />
            {{ auth.errorMessage }}
            <icon
              name="bi:x"
              size="30px"
              class="transition-all duration-300 hover:bg-gray-50 p-0 border rounded-[8px] border-none"
              style="cursor: pointer"
              @click="auth.errorMessage = ''"
            />
          </div>
        </Transition>
      </div>
    </div>
    <div class="w-full py-20 px-20 flex flex-col items-center">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/abstracts/mixins.scss" as m;

.font-poppins {
  @include m.fonts("Poppins");
}
</style>
