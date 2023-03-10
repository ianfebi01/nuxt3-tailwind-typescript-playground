import { defineStore } from "pinia";

interface Message {
  successMessage: Ref<string>;
  errorMessage: Ref<string>;
}
export const messageStore = defineStore("message", (): Message => {
  const successMessage = ref<string>("");
  const errorMessage = ref<string>("");
  return {
    successMessage,
    errorMessage,
  };
});
