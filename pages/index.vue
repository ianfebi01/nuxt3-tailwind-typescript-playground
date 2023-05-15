<script lang="ts" setup>
import { Fields, Form } from "~~/utils/Interface";

// interface
interface Response {
  chipertext?: string;
  originaltext?: string;
}
// state
const form = reactive<Form>({});

// AES
const field: Fields = {
  valueName: "aes",
  fieldType: "textField",
  defaultValue: "",
  type: "text",
  label: "Aes Chiper",
  placeholder: "Aku Ganteng",
};

const aes = ref<Response>({});

const handleClickAes = async () => {
  const res = await $fetch("/api/crypto", {
    method: "post",
    body: JSON.stringify(form.aes),
  });
  aes.value = res as Response;
};

// RSA
const field2: Fields = {
  valueName: "rsa",
  fieldType: "textField",
  defaultValue: "",
  type: "text",
  label: "RSA Chiper",
  placeholder: "Aku Ganteng",
};

const rsa = ref<Response>({});

const handleClickRsa = async () => {
  const res = await $fetch("/api/crypto/rsa", {
    method: "post",
    body: JSON.stringify(form.rsa),
  });
  rsa.value = res as Response;
};
</script>
<template>
  <LayoutContentBordered class="gap-8">
    <div>
      <AtomsATitleList title="Aes Encryption" font-size="22px" font-weight="bold" />
      <form @submit.prevent>
        <div class="flex flex-col gap-4">
          <InputDynamicField v-model="form[`${field.valueName}`]" error-messages="" :item="field" />
          <AtomsAButton type="submit" bg="blue-500" @click="handleClickAes">
            Aes
          </AtomsAButton>
          <Transition>
            <div v-if="aes.chipertext" class="bg-blue-100 p-4 border border-none rounded-[8px] flex flex-col gap-2">
              <div class="flex flex-col">
                <AtomsATitleList title="Chiper Text" font-weight="bold" />
                <AtomsASubtitleList :title="aes.chipertext" font-weight="bold" />
              </div>
              <div class="flex flex-col">
                <AtomsATitleList title="Original Text" font-weight="bold" />
                <AtomsASubtitleList :title="aes.originaltext" font-weight="bold" />
              </div>
            </div>
          </Transition>
        </div>
      </form>
    </div>
    <!-- RSA -->
    <div class="overflow-hidden">
      <AtomsATitleList title="RSA Encryption" font-size="22px" font-weight="bold" />
      <form @submit.prevent>
        <div class="flex flex-col gap-4">
          <InputDynamicField v-model="form[`${field2.valueName}`]" error-messages="" :item="field2" />
          <AtomsAButton bg="blue-500" type="submit" @click="handleClickRsa">
            Rsa
          </AtomsAButton>
          <Transition>
            <div v-if="rsa.chipertext" class="bg-blue-100 p-4 border border-none rounded-[8px] flex flex-col gap-2">
              <div class="flex flex-col">
                <AtomsATitleList title="Chiper Text" font-weight="bold" />
                <AtomsASubtitleList :title="rsa.chipertext" font-weight="bold" class="break-words" />
              </div>
              <div class="flex flex-col">
                <AtomsATitleList title="Original Text" font-weight="bold" />
                <AtomsASubtitleList :title="rsa.originaltext" font-weight="bold" />
              </div>
            </div>
          </Transition>
        </div>
      </form>
    </div>
  </LayoutContentBordered>
</template>
