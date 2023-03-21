<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { minLength, numeric, required } from "@vuelidate/validators";
import moment from "moment";
import { todolistStore } from "~~/store/todolist";
import { Fields, Form, List, RulesFace, TempForm } from "~~/utils/Interface";

// define Store
const list = todolistStore();
const listData = ref<List[]>(list.list);

// Page Meta
definePageMeta({
  layout: "default",
});

// Cange Status
const changeStatus = (param: { val: number; id: number }) => {
  console.log(param);
  const index = list.list.findIndex((item) => item.id === param.id);
  if (index != -1) {
    list.list[index].done = param.val;
  } else {
    return;
  }
  // list.list[param.i].done = param.val;
};

// state
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

// Submit
const handleSubmit = async () => {
  form["done"] = 0;
  form["id"] = Math.random();
  list.list.push({ ...form });

  modal.value = false;
  setDefaultFormValue(fields.value);

  v$.value.$reset();
};

// filter
const setDefaultFormValue = async (fieldsData: Fields[]): Promise<void> => {
  fieldsData.forEach((item: Fields) => {
    form[item?.valueName] = item.defaultValue;
  });
};
const filterVal = ref<Number>();
const handleFilter = computed(() =>
  list.list.filter((item: List) => item.done === filterVal.value)
);
const filter = (val: number) => {
  filterVal.value = val;
};

const filterBgColor = (val: number): string => {
  return filterVal.value === val ? "gray-100" : "white";
};

// provide static value
provide("datas", handleFilter);
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
        <AtomsAButton
          :bg="filterBgColor(1)"
          color="gray - 800"
          font-weight="normal"
          :border="true"
          @click="filter(1)"
        >
          <div class="flex items-center gap-2">
            <MoleculesMChecked :status="1" />
            <span>Done</span>
          </div>
        </AtomsAButton>
        <AtomsAButton
          :bg="filterBgColor(0)"
          color="gray-800"
          font-weight="normal"
          :border="true"
          @click="filter(0)"
        >
          <div class="flex items-center gap-2">
            <MoleculesMChecked :status="0" />
            <span>Done</span>
          </div>
        </AtomsAButton>
      </div>
    </div>
    <div class="flex flex-col grow-[1] items-stretch mt-6">
      <OrganismsOListTodolist
        :datas="handleFilter"
        @change-status="changeStatus($event)"
      />
    </div>
    <Teleport to="body">
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
            <AtomsAButton bg="blue-600" :border="false" @click="handleSubmit"
              >Add Task</AtomsAButton
            >
          </div>
        </template>
      </OrganismsOModal>
    </Teleport>
  </div>
</template>
