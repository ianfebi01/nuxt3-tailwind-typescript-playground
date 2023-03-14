import { CookieRef } from "nuxt/dist/app/composables";
import { authStore } from "~~/store/auth";
import { messageStore } from "~~/store/message";
import { UserPicture } from "~~/utils/Interface";

interface ResUploadProfile {
  data: {
    user_picture: UserPicture;
  };
}

const message = messageStore();
const auth = authStore();

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
      auth.userData.user_pictures?.push(res?.data?.user_picture);
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
    .then((res): boolean => {
      message.successMessage = "Success set profile image";
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
