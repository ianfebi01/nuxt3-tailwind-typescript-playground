import { defineStore } from "pinia";
import axios from "axios";

interface UserData {
  id: string;
}

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
