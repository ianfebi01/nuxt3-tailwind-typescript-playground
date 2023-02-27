<script lang="ts" setup>
import { login } from "@/utils/fields";
import { Fields } from "@/utils/Interface";
import { useVuelidate, ValidationRuleWithoutParams } from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  numeric,
  sameAs,
} from "@vuelidate/validators";

const fields = ref<Fields[]>(login);
const form: any = reactive({});

fields.value.forEach((item: any) => {
  form[item?.valueName] = item.defaultValue;
});

// interface
interface RulesFace {
  required?: ValidationRuleWithoutParams<string>;
  email?: ValidationRuleWithoutParams<string>;
  minLength?: any;
  numeric?: ValidationRuleWithoutParams<number>;
  sameAs?: any;
}
// Validations
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
</script>
<template>
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
      <button class="bg-[#5C7AE5] py-2 px-4 text-white rounded-[4px]">
        Login
      </button>
    </div>
  </div>
</template>
