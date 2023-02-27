<script setup>
const digitCount = 4;
const otpValue = ref("");
const digits = reactive([]);
const default2 = "";
if (default2 && default2.length === digitCount) {
  for (let i = 0; i < digitCount; i++) {
    digits[i] = default2.charAt(i);
  }
} else {
  for (let i = 0; i < digitCount; i++) {
    digits[i] = null;
  }
}
const otpCont = ref(null);

const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem == undefined) {
      return false;
    }
  }
  return true;
};
const handleKeyDown = function (event, index) {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;

    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }
    return;
  }
  if (new RegExp("^([0-9])$").test(event.key)) {
    digits[index] = event.key;
    if (index != digitCount - 1) {
      otpCont.value.children[index + 1].focus();
    }
    if (isDigitsFull()) {
      otpValue.value = digits.join("");
    }
  }
};
</script>

<template>
  <div class="w-full flex flex-col gap-8 mt-10">
    <div
      class="w-full border border-gray-700 p-6 rounded-[8px] flex flex-col gap-2"
    >
      <div class="mb-4">
        <p class="text-[18px] font-[500]">OTP Verification</p>
        <p class="text-[12px] font-normal text-gray-300">
          Insert OTP code sent to your phone
        </p>
      </div>
      <div ref="otpCont" class="flex gap-4 mb-2">
        <input
          type="text"
          :class="` text-center border rounded-[4px] border-gray-600 ${
            digits[i] !== null && ' border-blue-500 text-blue-500'
          }'
          }`"
          v-for="(item, i) in digits"
          :key="item + i"
          v-model="digits[i]"
          :autofocus="i === 0"
          :placeholder="i + 1"
          maxlength="1"
          @keydown="handleKeyDown($event, i)"
        />
        <button
          class="bg-blue-500 px-6 py-3 text-[12px] text-white border rounded-[4px] border-none hover:bg-blue-600 transition-all duration-300 ease-in-out"
        >
          Verify
        </button>
      </div>
    </div>
    <div
      class="text-blue-500 flex gap-2 items-center cursor-pointer hover:text-blue-600 transition-all duration-300"
    >
      <icon name="bi:arrow-counterclockwise" />
      <span>Resend OTP Code</span>
    </div>
  </div>
</template>

<style scoped></style>
