export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },
  

  modules: [
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL
  },
  

  app: {
    head: {
      title: 'TeamOps',
      meta: [
        {
          name: 'description',
          content: 'Team project management dashboard'
        }
      ]
    }
  }
})