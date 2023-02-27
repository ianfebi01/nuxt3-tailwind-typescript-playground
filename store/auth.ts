import { defineStore } from "pinia";
import axios from "axios";

interface ErrorMessage {
  remove?: {
    statusMessage?: string;
    statusCode?: string;
    data?: string[];
  };
  register?: { statusMessage?: string; statusCode?: string; data?: string[] };
}
interface SuccessMessage {
  remove?: {
    data: any;
  };
  register?: {
    data: any;
  };
}

export const authStore = defineStore({
  id: "auth",
  state: () => {
    return {
      accessToken: null,
      errorMessage: "" as string,
      successMessage: "" as string,
    };
  },
  getters: {},
  actions: {
    // register(payload: any) {
    //   return axios
    //     .post(`/api/register`, payload)
    //     .then((res) => {
    //       console.log(res);
    //       if (res?.data.error) {
    //         this.errorMessage.register = res?.data?.error;
    //       } else {
    //         this.successMessage.register = res?.data?.user;
    //       }
    //       return true;
    //     })
    //     .catch((err) => {
    //       console.log("Error: " + err.response.data);
    //       this.errorMessage.register = err.response.data;
    //       return false;
    //     });
    // },
    // registerRemove(payload: any) {
    //   return axios
    //     .post(`/api/register/remove`, payload)
    //     .then((res) => {
    //       console.log(res?.data);
    //       if (res?.data.error) {
    //         this.errorMessage.remove = res?.data?.error;
    //       } else {
    //         this.successMessage.remove = res?.data;
    //       }
    //       return true;
    //     })
    //     .catch((err) => {
    //       console.log("Error: " + err.response.data);
    //       return false;
    //     });
    // },
    register2(payload: any) {
      return axios
        .post(`/api-web/api/v1/register`, payload)
        .then((res) => {
          console.log(res);

          return true;
        })
        .catch((err) => {
          console.log("Error: " + err.response.data.error.errors[0]);
          this.errorMessage = err.response.data.error.errors[0];
          return false;
        });
    },
    registerRemove2(payload: any) {
      return axios
        .post(`/api/register/remove`, payload)
        .then((res) => {
          console.log(res?.data);

          this.successMessage = res?.data;

          return true;
        })
        .catch((err) => {
          console.log("Error: " + err.response.data);
          return false;
        });
    },
  },
});
