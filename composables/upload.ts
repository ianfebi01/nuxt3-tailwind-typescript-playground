import { CookieRef } from "nuxt/dist/app/composables";
import { messageStore } from "~~/store/message";

interface ResUploadProfile {
  data: {
    user_picture: {
      id: string;
      picture: {
        url: string;
      };
    };
  };
}

const message = messageStore();

export const useUploadProfile = async (
  payload: FormData
): Promise<string | boolean> => {
  message.errorMessage = "";
  message.successMessage = "";
  const accessToken: CookieRef<string> = useCookie("accessToken");
  return $fetch<ResUploadProfile>(`/api-web/api/v1/uploads/profile`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + accessToken.value,
      //   "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: payload,
  })
    .then((res) => {
      message.successMessage = "Success upload image";
      return res?.data?.user_picture?.id;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
export const useSetProfileDefault = async (payload: string) => {
  message.errorMessage = "";
  message.successMessage = "";
  const accessToken: CookieRef<string> = useCookie("accessToken");
  return $fetch(`/api-web/api/v1/uploads/profile/default`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + accessToken.value,
      //   "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: JSON.stringify({ id: payload }),
  })
    .then((res: any): boolean => {
      message.successMessage = "Success set profile image";
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
