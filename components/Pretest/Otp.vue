<script lang="ts" setup>
import { authStore } from "~~/store/auth";
import { OtpMatch } from "~~/utils/Interface";

const emit = defineEmits(["otp", "tab"]);

// define store
const auth = authStore();
auth.userData = { id: "76060b40-38dd-4a50-838d-1da0ff41936e" };

// state otp
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

const form = reactive<OtpMatch>({});

// handle Otp

const loading = ref<boolean>(false);

const handleOtpMatch = async () => {
  loading.value = true;
  form.user_id = auth.userData.id;
  form.otp_code = otpValue.value;

  const res = await useOtpMatch(form);
  if (res) {
    emit("otp", false);
    emit("tab", "login");
  }
  loading.value = false;
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
      <form @submit.prevent="handleOtpMatch">
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
            type="submit"
            class="bg-blue-500 px-6 py-3 text-[12px] text-white border rounded-[4px] border-none hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            <svg
              v-if="loading"
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            <span v-else> Verify </span>
          </button>
        </div>
      </form>
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
