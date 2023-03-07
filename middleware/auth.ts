import { CookieRef } from "nuxt/dist/app/composables";

export default defineNuxtRouteMiddleware((to) => {
  const accessToken: CookieRef<string> = useCookie("accessToken");
  const profilePage = to.fullPath.includes("profile");

  if (accessToken.value) {
    if (profilePage === false) {
      return navigateTo("/pretest/profile");
    }
  } else {
    if (profilePage) {
      return navigateTo("/pretest/login");
    }
    return;
  }
});
