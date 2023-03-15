<script lang="ts" setup>
import { login } from "@/utils/fields";
import {
  Coords,
  Fields,
  Form,
  Position,
  RulesFace,
  TempForm,
} from "@/utils/Interface";
import { useVuelidate, ValidationRuleWithoutParams } from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  numeric,
  sameAs,
} from "@vuelidate/validators";
import DeviceDetector, { DeviceDetectorResult } from "device-detector-js";
import { authStore } from "~~/store/auth";

// define device detector
const deviceDetector = new DeviceDetector();

// define Store
const auth = authStore();

// define router
const router = useRouter();

const fields = ref<Fields[]>(login);
const form: Form = reactive({});

fields.value.forEach((item: Fields) => {
  form[item?.valueName] = item.defaultValue;
});

// Validations
const rules = computed(() => {
  let rule: RulesFace = {};
  const tempForm: TempForm<RulesFace> = {};

  fields.value.forEach((item: Fields) => {
    rule = {};
    const { validations, valueName } = item;
    if (validations?.required === true) rule.required = required;
    if (validations?.email) rule.email = email;
    if (validations?.minLength) {
      rule.minLength = minLength(validations.minLength);
    }
    if (validations?.numeric) {
      rule.numeric = numeric;
    }
    if (validations?.sameAs) {
      rule.sameAs = sameAs(form[validations?.sameAs]);
    }
    tempForm[valueName] = rule;
  });
  return tempForm;
});

const v$ = useVuelidate(rules, form, { $autoDirty: true });

// Location
const location = ref<Coords>({});

const successCallback = (position: Position<Coords>) => {
  location.value = position.coords as Coords;
};

const errorCallback = (error: any) => {
  console.log(error);
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
});

// loading state login
const loading = ref<boolean>(false);

// function
const handleLogin = async () => {
  loading.value = true;
  const userAgent = navigator.userAgent;
  const device: DeviceDetectorResult = deviceDetector.parse(userAgent);

  form.device_type =
    device?.device?.type === "desktop"
      ? 2
      : device?.device?.type === "smartphone" && device.device.brand === "Apple"
      ? 0
      : 1;
  form.latlong = `${location.value.latitude},${location.value.longitude}`;
  form.device_token = "slkdakdmaw12";

  const res = await useLogin(form);
  if (res) {
    await useGetCredentials();
    router.push("profile");
  }

  loading.value = false;
};
</script>
<template>
  <form @submit.prevent="handleLogin">
    <div class="w-full flex flex-col gap-8 mt-10">
      <div
        class="w-full border border-gray-700 p-6 rounded-[8px] flex flex-col gap-2"
      >
        <p class="text-[18px] font-[500]">Login Account</p>
        <div v-for="(item, i) in fields" :key="i">
          <InputDynamicField
            v-model="form[item.valueName]"
            :item="item"
            :error-messages="
              v$[item.valueName].$invalid && v$[item.valueName].$dirty
                ? v$[item.valueName].$errors[0].$message
                : ''
            "
          />
        </div>
      </div>
      <div class="flex gap-2">
        <button
          class="py-2 px-4 border text-gray-600 rounded-[4px] border-gray-600"
        >
          Reset
        </button>
        <button
          type="submit"
          class="bg-[#5C7AE5] py-2 px-4 text-white rounded-[4px]"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</template>
