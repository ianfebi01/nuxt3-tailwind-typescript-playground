import { defineStore } from "pinia";
import { List } from "~~/utils/Interface";

export const todolistStore = defineStore("todolist", () => {
  const list = ref<List[]>([]);

  return {
    list,
  };
});
