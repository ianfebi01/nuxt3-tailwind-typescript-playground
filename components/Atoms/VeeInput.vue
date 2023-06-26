<script lang="ts" setup>
import { useField } from "vee-validate";

interface Props {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}
const props = defineProps<Props>();

const { value, handleBlur, meta, errors } = useField(
  toRef(props, "name"),
  undefined
);
</script>
<template>
  <div>
    <div class="flex flex-col">
      <pre>{{ meta }}</pre>
      <label for="privy_id">{{ label }}</label>
      <input
        v-model="value"
        :id="name"
        :name="name"
        :type="type"
        :class="` z-20 transition-all ease-in-out duration-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-white ${
          errors[0]
            ? 'dark:border-red-500 dark:focus:border-red-500 '
            : 'dark:border-gray-300 dark:focus:border-gray-400 '
        } dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-gray-600 outline-none`"
        :placeholder="placeholder"
        required
        @blur="handleBlur"
      />
      <Transition>
        <div v-if="errors[0]" class="d-flex align-center gap-8">
          <span class="text-10 text-red-600">
            {{ errors[0] }}
          </span>
        </div>
      </Transition>
    </div>
  </div>
</template>
