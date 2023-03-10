import { CookieRef } from "nuxt/dist/app/composables";
import { authStore } from "~~/store/auth";
import { messageStore } from "~~/store/message";
import { OtpMatch, Login, Register } from "~~/utils/Interface";

// define Store
const auth = authStore();
const message = messageStore();

export const useRegister = async (payload: Register) => {
  message.errorMessage = "";
  message.successMessage = "";
  return $fetch(`/api-web/api/v1/register`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((res: any) => {
      return true;
    })
    .catch((err) => {
      console.log("Error: " + err.data.error.errors[0]);
      if (!err.data.error.errors[0].message) {
        message.errorMessage = err.data.error.errors[0];
      } else {
        message.errorMessage = err.data.error.errors[0]?.message;
      }
      return false;
    });
};
export const useLogin = async (payload: Login) => {
  message.errorMessage = "";
  message.successMessage = "";
  return $fetch(`/api-web/api/v1/oauth/sign_in`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((res: any) => {
      const accessToken = useCookie("accessToken");
      accessToken.value = res.data?.user?.access_token;
      return true;
    })
    .catch((err) => {
      console.log("Error: " + err.data.error.errors[0]);
      if (!err.data.error.errors[0].message) {
        message.errorMessage = err.data.error.errors[0];
      } else {
        message.errorMessage = err.data.error.errors[0]?.message;
      }
      return false;
    });
};
export const useOtpMatch = async (payload: OtpMatch) => {
  message.errorMessage = "";
  message.successMessage = "";
  return $fetch(`/api-web/api/v1/register/otp/match`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((res: any) => {
      const accessToken = useCookie("accessToken");
      accessToken.value = res.data?.user?.access_token;

      message.successMessage =
        "Thanks for being our member, please login to continue";
      return true;
    })
    .catch((err) => {
      console.log("Error: " + err.data.error.errors[0]);
      if (!err.data.error.errors[0].message) {
        message.errorMessage = err.data.error.errors[0];
      } else {
        message.errorMessage = err.data.error.errors[0]?.message;
      }
      return false;
    });
};
export const useGetCredentials = async () => {
  message.errorMessage = "";
  message.successMessage = "";

  const accessToken: CookieRef<string> = useCookie("accessToken");
  return $fetch(
    `/api-web/api/v1/oauth/credentials?${new URLSearchParams({
      access_token: accessToken.value,
    })}`,
    {
      method: "get",
    }
  )
    .then((res: any) => {
      auth.userData = res.data.user;
      return true;
    })
    .catch((err) => {
      console.log("Error: " + err.data.error.errors[0]);
      if (!err.data.error.errors[0].message) {
        message.errorMessage = err.data.error.errors[0];
      } else {
        message.errorMessage = err.data.error.errors[0]?.message;
      }
      return false;
    });
};
