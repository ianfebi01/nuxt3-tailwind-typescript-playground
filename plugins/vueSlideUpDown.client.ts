import SlideUpDown from "vue3-slide-up-down ";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("slide-up-down", SlideUpDown);
});
