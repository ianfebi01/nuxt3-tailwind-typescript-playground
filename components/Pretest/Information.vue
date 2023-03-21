<script lang="ts" setup>
import { profileField } from "@/utils/fields";
import { Fields, Form, RulesFace, TempForm } from "@/utils/Interface";
import { useVuelidate, ValidationRuleWithoutParams } from "@vuelidate/core";
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

// define Store
const auth = authStore();
const message = messageStore();

// State
const fields = ref<Fields[]>(props.fieldsData);
const form: Form = reactive({});

const imgRef = useTemplateRefsList<HTMLInputElement>();
const image = ref<string>();
const imageFile = ref<File>();

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

// loading state
interface Loading {
  upload: boolean;
  update: boolean;
}
const loading = reactive<Loading>({
  upload: false,
  update: false,
});

// function
const setDefaultFormValue = async (fieldsData: Fields[]): Promise<void> => {
  fieldsData.forEach((item: Fields) => {
    form[item?.valueName] = item.defaultValue;
  });
};

const handleClickUpload = () => {
  imgRef.value[0].click();
};

const handleUpdateUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files?.length) {
    return;
  }
  image.value = URL.createObjectURL(files[0]);
  imageFile.value = files[0];
};

const upload = async () => {
  loading.upload = true;

  const payload: FormData = new FormData();
  let blob: Blob | null;
  if (!imageFile.value) {
    return;
  }
  payload.append(
    "image",
    new Blob([new Uint8Array(await imageFile.value.arrayBuffer())], {
      type: imageFile.value?.type,
    })
  );
  const res = await useUploadProfile(payload);
  if (res) await useSetProfileDefault(res as string);
  loading.upload = false;
};

const handleSubmit = async () => {
  loading.update = true;
  await usePostProfile(form);
  loading.update = false;
};

const isImageFileAvaible = (value: File | null | undefined) => {
  if (value) {
    return "text-white h-[44px] border rounded-[4px] border-none text-[14px] cursor-pointer bg-blue-500";
  } else {
    return "text-white h-[44px] border rounded-[4px] border-none text-[14px] bg-blue-200";
  }
};
</script>
<template>
  <PretestLayoutProfileHeader
    subtitle="Your personal information"
    icon="ph:pencil-simple-line"
    title="Information"
  />
  <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
    <div class="flex flex-col gap-2">
      <p class="text-[16px] font-[500] py-2">Information Detail</p>
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
        <button class="btn-secondary w-full">Discard</button>
        <button class="btn-primary w-full" @click="() => handleSubmit()">
          <AtomsALoader v-if="loading.update" />
          <span v-else> Update </span>
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-[16px] font-[500] py-2">Profile Picture</p>
      <div class="w-max-[224px] h-max-[224px]">
        <img
          v-if="!image"
          :src="
            auth.userData.user_picture
              ? auth.userData?.user_picture?.picture?.url?.toString()
              : 'https://res.cloudinary.com/djyp9rr7s/image/upload/v1671439956/Pngtree_no_image_vector_illustration_isolated_4979075_ncvayj.png'
          "
          alt="Profile Picture"
          class="image aspect-square"
          @click="handleClickUpload"
        />
        <img
          v-else
          :src="image"
          alt="Profile Picture"
          class="image aspect-square"
        />
      </div>
      <input
        type="file"
        :ref="imgRef.set"
        class="hidden"
        accept="image/*"
        @change="handleUpdateUpload"
      />
      <button
        :class="isImageFileAvaible(imageFile)"
        :disabled="!imageFile"
        @click="() => upload()"
      >
        <svg
          v-if="loading.upload"
          aria-hidden="true"
          role="status"
          class="inline w-4 h-4 text-white animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        <span v-else> Upload Media </span>
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
