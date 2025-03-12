import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  head: {
    title: 'test',
    meta: [
      
    ],
    link: []
  },
  pwa: {
    meta: {
      favicon: false 
    },
    icon: {
      source: false 
    }
  },
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss", 
    "@primevue/nuxt-module", 
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura, 
        options:{
            darkModeSelector:'light'
        }
      },
      ripple: true, 
    },
    autoImport: true, 
  },

  compatibilityDate: "2025-02-14", 
});