// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

        runtimeConfig: {
            jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
            jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET
        }
})
