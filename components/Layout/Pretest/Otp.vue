<script lang="ts" setup>
const digitCount = 4;
const otpValue = ref<number>();

interface Digits {
  [key: string]: number | null;
}
const digits = reactive<Digits>({});

const otpCont = useTemplateRefsList<HTMLInputElement>();

const gg = ref<number[] | null[]>([]);

interface EventKey extends Event {
  key: string;
}

const handleKeyDown = function (event: EventKey, index: number) {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[`field${index}`] = null;

    gg.value.splice(index, 1);
    otpValue.value = +gg.value.join("");

    if (index != 0) {
      otpCont.value[index - 1].focus();
    }
    return;
  }
  if (new RegExp("^([0-9])$").test(event.key)) {
    digits[`field${index}`] = Number(event.key);

    Object.keys(digits).forEach(function (key: string, index: number) {
      gg.value[index] = digits[key];
    });
    otpValue.value = +gg.value.join("");

    if (index != digitCount - 1) {
      otpCont.value[index + 1].focus();
    }
    if (index === digitCount - 1) {
      otpCont.value[index].blur();
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
      <!-- <div class="flex gap-4 mb-2"> -->
      <div class="flex gap-4 mb-2">
        <input
          type="text"
          :class="` w-full text-center border rounded-[4px] border-gray-600 ${
            digits[i] !== null && ' border-blue-500 text-blue-500'
          }'
        }`"
          v-for="(item, i) in 4"
          :key="`item + ${i}`"
          :ref="otpCont.set"
          v-model="digits[`field${i}`]"
          :autofocus="i === 0"
          :placeholder="String(i + 1)"
          maxlength="1"
          @keydown="handleKeyDown($event, i)"
        />
        <button
          class="bg-blue-500 px-6 py-3 text-[12px] text-white border rounded-[4px] border-none hover:bg-blue-600 transition-all duration-300 ease-in-out"
        >
          Verify
        </button>
      </div>
      <!-- </div> -->
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
