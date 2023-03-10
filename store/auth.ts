import { defineStore } from "pinia";
import axios from "axios";

interface UserPicture {
  id: string;
  picture: {
    url: string;
  };
}

interface UserData {
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
