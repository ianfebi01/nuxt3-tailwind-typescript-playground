<script lang="ts" setup>
import { fields as gg } from "@/utils/fields";
import { useVuelidate, ValidationRuleWithoutParams } from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  numeric,
  sameAs,
  helpers,
} from "@vuelidate/validators";

// Page Meta
definePageMeta({
  layout: "default",
});

// Fields
interface Fields {
  valueName: string;
  fieldType: string;
  defaultValue?: any;
  type?: string;
  label?: string;
  placeholder?: string | Array<string>;
  validations?: {
    required?: boolean;
    minLength?: number;
    sameAs?: string;
    numeric?: boolean;
    email?: boolean;
  };
  checkboxItem?: {
    text?: string;
    value?: string;
  }[];
  items?: {
    text: string;
    value: string;
  }[];
}

const fields = ref<Fields[]>(gg);
const form: any = reactive({});
fields.value.forEach((item: any) => {
  form[item?.valueName] = item.defaultValue;
});

interface RulesFace {
  required?: ValidationRuleWithoutParams<string>;
  email?: ValidationRuleWithoutParams<string>;
  minLength?: any;
  numeric?: ValidationRuleWithoutParams<number>;
  sameAs?: any;
}

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
  <div
    class="h-full w-full border border-gray-300 shadow-gray-300 rounded-lg shadow-sm mb-4 p-6 flex gap-2 flex-col"
  >
    <h1 class="text-gray-900 font-normal text-3xl">Dynamic Form</h1>
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

    <pre>{{ form }}</pre>
  </div>
</template>
