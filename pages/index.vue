<script lang="ts" setup>
import { Fields } from "~~/utils/Interface";
import { authStore } from "~~/store/auth";
import { register } from "~~/utils/fields";
import { useVuelidate, ValidationRuleWithoutParams } from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  numeric,
  sameAs,
} from "@vuelidate/validators";

// Store
const auth = authStore();

// Page Meta
definePageMeta({
  layout: "default",
});

// interface
interface RulesFace {
  required?: ValidationRuleWithoutParams<string>;
  email?: ValidationRuleWithoutParams<string>;
  minLength?: any;
  numeric?: ValidationRuleWithoutParams<number>;
  sameAs?: any;
}
interface Loading {
  loadingSubmit: boolean;
}

// State
const fields = ref<Fields[]>(register);
const form: any = reactive({});
fields.value.forEach((item: any) => {
  form[item?.valueName] = item.defaultValue;
});

// Validation
const rules = computed(() => {
  let rule: RulesFace = {};
  const tempForm: any = {};

  fields.value.forEach((item: any) => {
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

// Register

// State Register
const location = ref<any>({});
const loading = ref<Loading>({
  loadingSubmit: false,
});

const handleRegisterSubmit = async () => {
  loading.value.loadingSubmit = true;
  form.latlong = `${location.value.latitude},${location.value.longitude}`;
  form.country = "ID";
  form.device_token = "slkdakdmaw12";
  form.device_type = 2;
  loading.value.loadingSubmit = true;
  // const res = await auth.register(form);
  // if (res) {
  //   loading.value.loadingSubmit = false;
  // } else {
  //   loading.value.loadingSubmit = false;
  // }
};

const successCallback = (position: any) => {
  location.value = position.coords;
};

const errorCallback = (error: any) => {
  console.log(error);
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
});
</script>

<template>
  <div
    class="h-full border border-gray-300 shadow-gray-300 rounded-lg shadow-sm mb-4 p-6 flex gap-2 flex-col"
  >
    <form class="flex gap-2 flex-col" @submit.prevent>
      <h1 class="text-gray-900 font-normal text-3xl">Register</h1>
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
      <button
        v-if="!loading.loadingSubmit"
        type="submit"
        class="p-2.5 border rounded-lg dark:bg-blue-600 dark:text-white"
        @click="handleRegisterSubmit"
      >
        Register
      </button>
      <button
        v-else
        type="submit"
        class="p-2.5 border rounded-lg dark:bg-blue-600 dark:text-white"
        disabled
      >
        <svg
          aria-hidden="true"
          role="status"
          class="inline w-4 h-4 mr-3 text-white animate-spin"
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
        Loading...
      </button>
      <Transition>
        <p
          v-if="auth.errorMessage"
          class="text-center transition-all ease-in-out duration-300 mt-1 text-xs font-normal text-red-600 dark:text-red-500"
        >
          {{ auth.errorMessage }}
        </p>
        <p
          v-else-if="auth.successMessage"
          class="text-center transition-all ease-in-out duration-300 mt-1 text-xs font-normal text-green-500"
        >
          {{ auth.successMessage }}
        </p>
      </Transition>
    </form>
    <RegisterRemove class="mt-4" />
    <RegisterOtp class="mt-4" />
  </div>
</template>

<style lang="scss"></style>
