import { removeRefreshToken } from "~~/server/database/Repositories/refreshTokenRepository"
import { sendRefreshToken } from "~~/server/service/jwt"

export default defineEventHandler(async (event) => {
    try {
        const cookies = useCookies(event)
        const refreshToken = cookies.refresh_token
        await removeRefreshToken(refreshToken)
    } catch (error) { }

    sendRefreshToken(event.res, null)

    return { message: 'Done' }
})