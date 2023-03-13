import { CookieRef } from "nuxt/dist/app/composables";
import { authStore } from "~~/store/auth";
import { messageStore } from "~~/store/message";
interface UserPicture {
  id: string;
  picture: {
    url: string;
  };
}

interface UserData {
  data: {
    user: {
      id?: string;
      name?: string;
      level?: number;
      age?: number | null;
      birthday?: string | null;
      gender?: string | null;
      zodiac?: string | null;
      hometown?: string | null;
      bio?: string | null;
      latlong?: string | null;
      education?: {
        school_name: string | null;
        graduation_time: string | null;
      };
      career?: {
        company_name: string | null;
        starting_from: string | null;
        ending_in: string | null;
      };
      user_pictures?: UserPicture[];
      user_picture?: UserPicture;
      cover_picture?: {
        url?: string | null;
      };
    };
  };
}

const auth = authStore();
const message = messageStore();

export const usePostProfile = async (payload: any) => {
  message.errorMessage = "";
  message.successMessage = "";
  const accessToken: CookieRef<string> = useCookie("accessToken");
  return $fetch<UserData>(`/api-web/api/v1/profile`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + accessToken.value,
    }),
    body: JSON.stringify(payload),
  })
    .then((res) => {
      auth.userData = res?.data?.user;
      message.successMessage = "Success update profile";
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

// Career
interface Career {
  position?: string;
  company_name?: string;
  starting_from?: string;
  ending_in?: string;
}
export const usePostCareer = async (payload: Career) => {
  message.errorMessage = "";
  message.successMessage = "";
  const accessToken: CookieRef<string> = useCookie("accessToken");
  return $fetch<UserData>(`/api-web/api/v1/profile/career`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + accessToken.value,
    }),
    body: JSON.stringify(payload),
  })
    .then((res) => {
      auth.userData = res?.data?.user;
      message.successMessage = "Success add career";
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
