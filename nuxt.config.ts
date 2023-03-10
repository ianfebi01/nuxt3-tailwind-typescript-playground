// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxt-alt/proxy",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  css: ["@/assets/main.scss"],

  typescript: {
    strict: true,
    typeCheck: true,
  },
  ssr: true,
  app: {
    head: {
      title: "Playground",
      titleTemplate: "%s | ianfebi01",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      baseAPI: process.env.NUXT_BASE_API,
    },
  },
  proxy: {
    enableProxy: true,
    proxies: {
      "^/api-web/.*": {
        target: process.env.NUXT_BASE_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\-web/, ""),
      },
    },
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@use "@/assets/main.scss" as *;',
        },
      },
    },
  },
});
