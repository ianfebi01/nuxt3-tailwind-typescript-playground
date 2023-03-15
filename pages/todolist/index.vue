<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { minLength, numeric, required } from "@vuelidate/validators";
import moment from "moment";
import { todolistStore } from "~~/store/todolist";
import { Fields, Form, List, RulesFace, TempForm } from "~~/utils/Interface";

// define Store
const list = todolistStore();
const listData = ref<List[]>(list.list);

// state
const changeStatus = (param: { val: number; i: number }) => {
  list.list[param.i].done = param.val;
};
const modal = ref<boolean>(false);

// dynamic form
const fields = ref<Fields[]>(listFields);
type gg = string | boolean | number;
const form: Form = reactive({});

const rules = computed(() => {
  let rule: RulesFace = {};
  const tempForm: TempForm<RulesFace> = {};

  fields.value.forEach((item: Fields) => {
    rule = {};
    const { validations, valueName } = item;
    if (validations?.required === true) rule.required = required;
    if (validations?.minLength) {
      rule.minLength = minLength(validations.minLength);
    }
    if (validations?.numeric) {
      rule.numeric = numeric;
    }
    tempForm[valueName] = rule;
  });
  return tempForm;
});
const v$ = useVuelidate(rules, form, { $autoDirty: true });

// function
const handleSubmit = async () => {
  form["done"] = 0;
  list.list.push({ ...form });
  console.log(form);
  modal.value = false;
  setDefaultFormValue(fields.value);
  console.log(form);
  v$.value.$reset();
};

const setDefaultFormValue = async (fieldsData: Fields[]): Promise<void> => {
  fieldsData.forEach((item: Fields) => {
    form[item?.valueName] = item.defaultValue;
  });
};

const handleFilter = (val: number) => {
  listData.value = list.list.filter((item: List) => item.done === val);
};
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <MoleculesMHeaderTodolist
      :date="moment(new Date()).format('MMMM YYYY')"
      @click-button="modal = !modal"
    />
    <div class="mt-6 flex flex-col">
      <span>Filter by status</span>
      <div class="flex gap-4 py-4">
        <div
          class="flex gap-2 items-center hover:bg-gray-200 h-[35px] px-4 border rounded-[4px] transition-colors duration-300 ease cursor-pointer border-gray-300"
          @click="handleFilter(1)"
        >
          <MoleculesMChecked :status="1" />
          <span>Done</span>
        </div>
        <div
          class="flex gap-2 items-center hover:bg-gray-200 h-[35px] px-4 border rounded-[4px] transition-colors duration-300 ease cursor-pointer border-gray-300"
          @click="handleFilter(0)"
        >
          <MoleculesMChecked :status="0" />
          <span>Schedule</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col grow-[1] items-stretch mt-6">
      <OrganismsOListTodolist
        :datas="listData"
        @change-status="changeStatus($event)"
      />
    </div>
  </div>
  <OrganismsOModal v-model="modal" title="Add New Task" :auto-height="true">
    <template #default>
      <div class="flex grow-[1] my-4 border-spacing-4 items-stretch">
        <div class="flex flex-col w-full gap-4">
          <InputDynamicField
            v-model="form[item?.valueName]"
            v-for="(item, i) in fields"
            :item="item"
            :error-messages="
              v$[item?.valueName].$invalid && v$[item?.valueName].$dirty
                ? v$[item?.valueName].$errors[0].$message
                : ''
            "
            :key="i + item?.valueName"
          />
        </div>
      </div>
      <div class="w-full flex justify-end gap-2">
        <AtomsAButton
          :border="true"
          bg="white"
          color="blue-600"
          @click="modal = !modal"
          >Cancel</AtomsAButton
        >
        <AtomsAButton @click="handleSubmit">Add Task</AtomsAButton>
      </div>
    </template>
  </OrganismsOModal>
</template>
