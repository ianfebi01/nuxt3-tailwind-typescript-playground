import { CookieRef } from "nuxt/dist/app/composables";
import { authStore } from "~~/store/auth";
import { OtpMatch, Login, Register } from "~~/utils/Interface";

// define Store
const auth = authStore();

export const useRegister = async (payload: Register) => {
  auth.errorMessage = "";
  auth.successMessage = "";
  return $fetch(`/api-web/api/v1/register`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((res: any) => {
      console.log(res?.data);
      return true;
    })
    .catch((err) => {
      console.log("Error: " + err.data.error.errors[0]);
      if (!err.data.error.errors[0].message) {
        auth.errorMessage = err.data.error.errors[0];
      } else {
        auth.errorMessage = err.data.error.errors[0]?.message;
      }
      return false;
    });
};
export const useLogin = async (payload: Login) => {
  auth.errorMessage = "";
  auth.successMessage = "";
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
        auth.errorMessage = err.data.error.errors[0];
      } else {
        auth.errorMessage = err.data.error.errors[0]?.message;
      }
      return false;
    });
};
export const useOtpMatch = async (payload: OtpMatch) => {
  auth.errorMessage = "";
  auth.successMessage = "";
  return $fetch(`/api-web/api/v1/register/otp/match`, {
    method: "post",
    body: JSON.stringify(payload),
  })
    .then((res: any) => {
      const accessToken = useCookie("accessToken");
      accessToken.value = res.data?.user?.access_token;

      auth.successMessage =
        "Thanks for being our member, please login to continue";
      return true;
    })
    .catch((err) => {
      console.log("Error: " + err.data.error.errors[0]);
      if (!err.data.error.errors[0].message) {
        auth.errorMessage = err.data.error.errors[0];
      } else {
        auth.errorMessage = err.data.error.errors[0]?.message;
      }
      return false;
    });
};
export const useGetCredentials = async () => {
  auth.errorMessage = "";
  auth.successMessage = "";

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
      return true;
    })
    .catch((err) => {
      console.log("Error: " + err.data.error.errors[0]);
      if (!err.data.error.errors[0].message) {
        auth.errorMessage = err.data.error.errors[0];
      } else {
        auth.errorMessage = err.data.error.errors[0]?.message;
      }
      return false;
    });
};
