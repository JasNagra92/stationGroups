// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-quasar-ui"],
  quasar: {
    plugins: ["Notify", "Dialog"],
    iconSet: "fontawesome-v6",
  },
});
