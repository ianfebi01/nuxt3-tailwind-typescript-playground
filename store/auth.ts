import { defineStore } from "pinia";
import axios from "axios";
import { UserData } from "~~/utils/Interface";

export const authStore = defineStore({
  id: "auth",
  state: () => {
    return {
      accessToken: null,
      errorMessage: "" as string,
      successMessage: "" as string,
      userData: {} as UserData,
    };
  },
  getters: {},
  actions: {},
});
