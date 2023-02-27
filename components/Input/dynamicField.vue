<script lang="ts" setup>
const emit = defineEmits(["input", "blur", "update:modelValue"]);

const props = defineProps({
  item: {
    type: Object,
    default: () => [],
  },
  errorMessages: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const vTypes = {
  beforeMount: (el: any, binding: any) => {
    // this two prevent from copy&paste non-number text, including "e".
    // need to have both together to take effect.

    const { value: type } = binding;
    el.type = ["tel", "number"].includes(type) ? "tel" : type;
    el.addEventListener("input", () => {
      return el.validity?.valid || (el.value = "");
    });

    // this prevents from typing non-number text, including "e".
    el.addEventListener("keypress", (evt: any) => {
      evt = evt || window.event;

      const charCode = evt.which ? evt.which : evt.keyCode;
      if (["tel", "number"].includes(type)) {
        if (charCode < 48 || charCode > 57) evt.preventDefault();
      } else return true;
    });
  },
};

const show = ref<boolean>(false);

const handleShowPassword = (val: boolean) => {
  show.value = val;
  console.log(val);
};
</script>
<template>
  <div v-if="item.fieldType === 'textField'">
    <label
      :for="item?.valueName"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
      >{{ item?.label }}</label
    >
    <div v-if="item.type === 'password'" style="position: relative">
      <input
        v-model="model"
        :type="show ? 'text' : item?.type"
        :id="item?.valueName"
        :class="` z-20 transition-all ease-in-out duration-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-white ${
          errorMessages
            ? 'dark:border-red-500 dark:focus:border-red-500 '
            : 'dark:border-gray-300 dark:focus:border-gray-400 '
        } dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-gray-600 outline-none`"
        :placeholder="item?.placeholder"
        required
      />
      <Icon v-if="show" name="bi:eye" class="eye-icon" @click="show = !show" />
      <Icon v-else name="bi:eye-slash" class="eye-icon" @click="show = !show" />
    </div>
    <input
      v-else
      v-model="model"
      v-types="item?.type"
      :id="item?.valueName"
      :class="` z-20 transition-all ease-in-out duration-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-white ${
        errorMessages
          ? 'dark:border-red-500 dark:focus:border-red-500 '
          : 'dark:border-gray-300 dark:focus:border-gray-400 '
      } dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-gray-600 outline-none`"
      :placeholder="item?.placeholder"
      required
    />
    <Transition>
      <p
        v-if="errorMessages"
        class="z-10 transition-all ease-in-out duration-300 mt-1 text-xs font-normal text-red-600 dark:text-red-500"
      >
        {{ errorMessages ? errorMessages : "" }}
      </p>
    </Transition>
  </div>
  <div v-if="item.fieldType === 'select'">
    <label
      for="first_name"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
      >{{ item?.label }}</label
    >

    <div class="relative">
      <select
        v-model="model"
        :id="item?.valueName"
        :class="`  box-border appearance-none transition-all ease-in-out duration-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-white ${
          errorMessages
            ? 'dark:border-red-500 dark:focus:border-red-500 '
            : 'dark:border-gray-300 dark:focus:border-gray-400 '
        } dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-gray-600 outline-none`"
      >
        <option value="" disabled selected>Select your option</option>
        <option
          v-for="select in item?.items"
          :key="select?.text"
          :value="select?.value"
        >
          {{ select?.text }}
        </option>
      </select>
      <Icon
        :class="` text-gray-900 last:ml-auto transition ease-in-out absolute right-2 top-[11.5px]`"
        name="carbon:chevron-down"
      />
    </div>
    <Transition>
      <p
        v-if="errorMessages"
        class="z-10 transition-all ease-in-out duration-300 mt-1 text-xs font-normal text-red-600 dark:text-red-500"
      >
        {{ errorMessages ? errorMessages : "" }}
      </p>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.eye-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
