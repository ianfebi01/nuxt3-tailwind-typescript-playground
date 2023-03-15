<script lang="ts" setup>
// state
const imgRef = useTemplateRefsList<HTMLInputElement>();
const active = ref<boolean>(false);
const imageFile = ref<File>();
const image = ref<string>();

// define emit
const emit = defineEmits(["change", "update:modelValue"]);

// define props
interface Props {
  modelValue: boolean;
}
const props = defineProps<Props>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// function
const handleClickUpload = () => {
  imgRef.value[0].click();
};

const toggleActive = () => {
  active.value = !active.value;
};

const onDrop = (e: DragEvent) => {
  active.value = false;
  const files = (e.dataTransfer as DataTransfer).files;

  if (!files?.length) {
    return;
  }
  if (!files[0].type.split("/").includes("image")) {
    return;
  }
  imageFile.value = files[0];
  image.value = URL.createObjectURL(imageFile.value);
};
const handleSelectFile = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;

  if (!files?.length) {
    return;
  }
  imageFile.value = files[0];
  image.value = URL.createObjectURL(imageFile.value);
};
const clearImage = () => {
  image.value = "";
};

const handleSubmit = () => {
  emit("change", imageFile.value);
};
</script>
<template>
  <Transition>
    <div
      v-if="value"
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-[rgba(0,0,0,0.5)]"
    >
      <div class="relative w-full h-full flex items-center justify-center">
        <!-- content -->
        <div
          class="relative flex flex-col gap-2 w-full max-w-[706px] h-full max-h-[604px] bg-white rounded-lg shadow py-6 px-5"
        >
          <div class="flex justify-between">
            <span class="font-medium text-[24px]">Upload Picture</span>
            <icon
              name="mdi:close"
              class="cursor-pointer"
              @click="value = false"
            />
          </div>
          <div
            v-if="!image"
            :class="`transition-colors duration-300 upload-box ${
              active && 'upload-box--active'
            }`"
            @dragenter.prevent="toggleActive"
            @dragleave.prevent="toggleActive"
            @dragover.prevent
            @drop.prevent="(e) => onDrop(e)"
          >
            <div
              class="h-full w-full flex flex-col items-center justify-center gap-2"
            >
              <Icon
                name="mdi:image-plus"
                :class="`transition-colors duration-300 ease text-blue-500 ${
                  active && 'text-red-400'
                }`"
                size="100px"
              />
              <span class="font-medium text-[14px]"
                >Drag & Drop your Picture here</span
              >
              <span class="text-[14px]">Or</span>
              <span
                :class="` transition-colors duration-300 font-medium text-[14px] text-blue-500 cursor-pointer hover:underline ${
                  active && 'text-red-400'
                }`"
                @click="handleClickUpload"
                >Brows File Here</span
              >
              <input
                :ref="imgRef.set"
                class="hidden"
                type="file"
                accept="image/*"
                @change="(e) => handleSelectFile(e)"
              />
            </div>
          </div>
          <div
            v-else
            class="flex grow-[1] items-stretch overflow-hidden relative"
          >
            <img
              :src="image"
              alt=""
              class="h-full max-h-[429px] w-full object-cover"
            />
            <div
              class="cursor-pointer absolute top-4 right-4 bg-gray-600 w-6 h-6 border border-none rounded-[50%] text-center text-neutral-300 hover:bg-gray-500"
              @click="clearImage"
            >
              <icon name="mdi:close" class="translate-y-[-1px]" />
            </div>
          </div>
          <div class="flex justify-between">
            <span class="text-[14px] text-gray-400"
              >Maximum file size: 5MB</span
            >
            <span class="text-[14px] text-gray-400">PNG, JPG, or GIF.</span>
          </div>
          <button
            class="h-[44px] text-blue-500 border border-blue-500"
            @click="handleSubmit"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.upload-wrapper {
  @apply w-[706px] h-[604px] bg-white fixed top-1/2 mt-[-302px] ml-[-353px] left-1/2 z-20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-6 px-5 flex flex-col gap-4;
}
.upload-box {
  @apply border border-dashed border-blue-500 flex grow-[1] border-spacing-4 items-stretch;
  &--active {
    @apply border-red-400;
  }
}
</style>
