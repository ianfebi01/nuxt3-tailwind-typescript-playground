<script lang="ts" setup>
import { messageStore } from "~~/store/message";

const message = messageStore();

const { errorMessage, successMessage } = message;
</script>
<template>
  <div class="flex w-full min-h-screen font-poppins">
    <div
      class="w-0 md:w-[80%] bg-[#F3F5F9] flex items-center justify-center overflow-hidden"
    >
      <div class="max-w-[368px] p-4 md:fixed md:top-[30vh]">
        <img src="@/statics/img/Logo.svg" alt="Logo Privy" class="mb-10" />
        <div class="ml-10">
          <p class="text-2xl font-[600] mb-5">Welcome to Privysign</p>
          <p class="text-sm font-normal">
            Is a personal data platform, you can update your information about
            yourself, customize your profile and change a lot of things
          </p>
        </div>
        <Transition>
          <div v-if="message.successMessage" class="snackbar-success">
            <icon
              name="bi:check-circle-fill"
              class="text-green-400"
              size="25px"
            />
            {{ message.successMessage }}
            <icon
              name="bi:x"
              size="30px"
              class="transition-all duration-300 hover:bg-gray-50 p-0 border rounded-[8px] border-none last:ml-auto"
              style="cursor: pointer"
              @click="message.successMessage = ''"
            />
          </div>
        </Transition>
        <Transition>
          <div
            v-if="message.errorMessage"
            class="snackbar-error"
          >
            <icon
              name="bi:exclamation-circle-fill"
              class="text-red-400"
              size="25px"
            />
            {{ message.errorMessage }}
            <icon
              name="bi:x"
              size="30px"
              class="transition-all duration-300 hover:bg-gray-50 p-0 border rounded-[8px] border-none last:ml-auto"
              style="cursor: pointer"
              @click="message.errorMessage = ''"
            />
          </div>
        </Transition>
      </div>
    </div>
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.snackbar {
  &-success {
    @apply mt-6 flex gap-4 justify-center items-center text-[12px] bg-white p-2 border rounded-[8px] border-transparent;
  }
  &-error {
    @apply mt-6 flex gap-4 justify-center items-center text-[12px] bg-white p-2 border rounded-[8px] border-transparent;
  }
}
</style>
