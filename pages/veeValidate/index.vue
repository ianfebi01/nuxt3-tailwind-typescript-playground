<script lang="ts" setup>
import { Field, ErrorMessage, Form as VeeForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  privy_id: yup
    .string()
    .required("Nama tidak boleh kosong")
    .min(6, "Minimal panjang karakter 6")
    .max(6, "Maksimal panjang karakter 6")
    .matches(/^[a-zA-Z0-9_]*$/, "Format Privy Id salah"),
});

const onSubmit = (values: Record<string, unknown>) => {
  alert(values.privy_id.toUpperCase());
};
</script>

<template>
  <div>
    <vee-form
      :validation-schema="schema"
      @submit="onSubmit"
      class="flex flex-col gap-2"
    >
      <div>
        <label for="privy_id">Privy Id</label>
        <Field
          id="privy_id"
          name="privy_id"
          placeholder="IAN643"
          class="z-20 transition-all ease-in-out duration-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:focus:border-gray-400 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-gray-600 outline-none"
        />

        <ErrorMessage name="privy_id" class="text-10 text-red-600" />
      </div>
      <AtomsAButton type="submit" class="d-none" color="blue-600" bg="blue-200"
        >Validate</AtomsAButton
      >
    </vee-form>
  </div>
</template>
