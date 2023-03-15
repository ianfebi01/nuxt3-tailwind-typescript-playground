<script lang="ts" setup>
import { UserPicture } from "~~/utils/Interface";

// define props
interface Props {
  data: UserPicture[];
}
const props = defineProps<Props>();

// state
const modalUploadImage = ref<boolean>(false);
const handleOpenModalUpload = () => {
  modalUploadImage.value = !modalUploadImage.value;
};

const handleUpload = async (e: File) => {
  const payload: FormData = new FormData();
  let blob: Blob | null;
  if (!e) {
    return;
  }
  payload.append(
    "image",
    new Blob([new Uint8Array(await e.arrayBuffer())], {
      type: e?.type,
    })
  );
  await useUploadProfile(payload);
  modalUploadImage.value = !modalUploadImage.value;
};
</script>

<template>
  <PretestLayoutProfileHeader
    title="Gallery Information"
    subtitle="Information about your Gallery"
    icon="mdi:plus"
    @iconClick="() => handleOpenModalUpload()"
  />
  <div
    class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2"
  >
    <div v-for="(item, i) in props.data" :key="i" class="aspect-[3/4]">
      <img
        :src="item.picture.url"
        alt="Gambar monyet"
        class="image border rounded-[6px] border-none"
      />
    </div>
  </div>
  <!-- <pre>{{ paginationData }}</pre> -->

  <OrganismsOModalUpload
    v-model="modalUploadImage"
    :modal="modalUploadImage"
    @change="handleUpload($event)"
  />
</template>
