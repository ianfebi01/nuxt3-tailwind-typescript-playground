<script lang="ts" setup>
import { todolistStore } from "~~/store/todolist";
import { List } from "~~/utils/Interface";

//  define Props
interface Props {
  datas: List[];
}

const props = defineProps<Props>();

// define emit
const emit = defineEmits(["changeStatus"]);

// function

const changeStatus = (val: number, i: number) => {
  emit("changeStatus", { val, i });
};
</script>
<template>
  <ul>
    <template v-if="datas.length">
      <li
        v-for="(item, i) in props.datas"
        :key="i"
        class="flex items-center gap-4 hover:bg-slate-100 p-2 border border-none rounded-[8px] transition-color duration-300 ease"
      >
        <MoleculesMChecked
          :status="item.done"
          @changeStatus="changeStatus($event, i)"
        />
        <div class="flex flex-col">
          <AtomsATitleList :title="item.name" />
          <MoleculesMSubtitleList
            :description="item.description"
            :location="item.location"
            :date="item.date"
          />
        </div>
      </li>
    </template>
    <template v-else>
      <div class="flex items-center justify-center">
        <img src="@/statics/img/Empty.svg" alt="" />
      </div>
    </template>
  </ul>
</template>
