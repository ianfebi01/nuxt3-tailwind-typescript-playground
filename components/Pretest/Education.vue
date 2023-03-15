<script lang="ts" setup>
import { Fields, Form, RulesFace, TempForm } from "@/utils/Interface";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  numeric,
  sameAs,
} from "@vuelidate/validators";

import { authStore } from "~~/store/auth";
import { messageStore } from "~~/store/message";

// define props
interface Props {
  fieldsData: Fields[];
}
const props = defineProps<Props>();

// interface
interface Loading {
  upload: boolean;
  update: boolean;
}

// State
const fields = ref<Fields[]>(props.fieldsData);
const form: Form = reactive({});
const loading = reactive<Loading>({
  upload: false,
  update: false,
});

// Mounted
onMounted(() => {
  setDefaultFormValue(props.fieldsData);
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

// function
const setDefaultFormValue = async (fieldsData: Fields[]): Promise<void> => {
  fieldsData.forEach((item: Fields) => {
    form[item?.valueName] = item.defaultValue;
  });
};

const handleSubmit = async () => {
  loading.update = true;
  await usePostEducation(form);
  loading.update = false;
};
</script>
<template>
  <PretestLayoutProfileHeader
    title="Education Information"
    subtitle="Information about your education"
    icon="mdi:plus"
  />

  <div class="flex flex-col">
    <div class="flex flex-col gap-2">
      <InputDynamicField
        v-model="form[item.valueName]"
        v-for="(item, i) in fields"
        :key="i"
        :item="item"
        :error-messages="
          v$[item.valueName].$invalid && v$[item.valueName].$dirty
            ? v$[item.valueName].$errors[0].$message
            : ''
        "
      />
      <div class="w-full flex gap-2 mt-4">
        <button class="btn-secondary px-4">Discard</button>
        <button
          class="btn-primary px-4"
          :disabled="v$.$invalid"
          @click="() => handleSubmit()"
        >
          <AtomsALoader v-if="loading.update" />
          <span v-else> Add Education </span>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
