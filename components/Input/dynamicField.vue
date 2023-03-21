<script lang="ts" setup>
import { Fields } from "~~/utils/Interface";

const emit = defineEmits(["input", "blur", "update:modelValue"]);

interface Props {
  item: Fields;
  errorMessages: string;
  modelValue: string | number | string[] | undefined;
}
const props = defineProps<Props>();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const show = ref<boolean>(false);

const handleShowPassword = (val: boolean) => {
  show.value = val;
};
</script>
<template>
  <div v-if="item.fieldType === 'textField'">
    <label
      :for="item?.valueName"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
      >{{
        item?.validations?.required ? `${item?.label} *` : item?.label
      }}</label
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
        :placeholder="item?.placeholder?.toString()"
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
      :placeholder="item?.placeholder?.toString()"
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
      :for="item?.valueName"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
      >{{
        item?.validations?.required ? `${item?.label} *` : item?.label
      }}</label
    >

    <div class="relative">
      <select
        v-model="model"
        :id="item?.valueName"
        :class="`  box-border appearance-none transition-all ease-in-out duration-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 pr-8 dark:bg-white ${
          errorMessages
            ? 'dark:border-red-500 dark:focus:border-red-500 '
            : 'dark:border-gray-300 dark:focus:border-gray-400 '
        } dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-gray-600 outline-none `"
      >
        <option value="" disabled selected>{{ item?.placeholder }}</option>
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
  <div v-if="item.fieldType === 'date'">
    <label
      :for="item?.valueName"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
      >{{
        item?.validations?.required ? `${item?.label} *` : item?.label
      }}</label
    >
    <div class="relative">
      <input
        v-model="model"
        type="text"
        v-types="item?.type"
        :id="item?.valueName"
        :class="` z-20 transition-all ease-in-out duration-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 pl-8 dark:bg-white ${
          errorMessages
            ? 'dark:border-red-500 dark:focus:border-red-500 '
            : 'dark:border-gray-300 dark:focus:border-gray-400 '
        } dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-gray-600 outline-none`"
        :placeholder="item?.placeholder?.toString()"
        required
      />
      <Icon
        :class="` text-gray-900 last:ml-auto transition ease-in-out absolute left-2 top-[11.5px] `"
        name="mdi:calendar-blank-outline"
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
  <div v-if="item.fieldType === 'textarea'">
    <label
      :for="item?.valueName"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
      >{{
        item?.validations?.required ? `${item?.label} *` : item?.label
      }}</label
    >

    <textarea
      v-model="model"
      :id="item?.valueName"
      :class="`  resize-none h-[150px] z-20 transition-all ease-in-out duration-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-white ${
        errorMessages
          ? 'dark:border-red-500 dark:focus:border-red-500 '
          : 'dark:border-gray-300 dark:focus:border-gray-400 '
      } dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-gray-600 outline-none`"
      :placeholder="item?.placeholder?.toString()"
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
</template>

<style lang="scss" scoped>
.eye-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
