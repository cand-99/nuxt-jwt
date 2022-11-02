import { getUserByUsername } from "~~/server/database/Repositories/userRepository"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "~~/server/service/jwt"
import { createRefreshToken } from "~~/server/database/Repositories/refreshTokenRepository"
export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const { username, password } = body
  
  if (!username || !password) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid' }))
  }

  const user = await getUserByUsername(username)
  
  if (!user) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Username invalid' }))
  }
  
  const doesThePasswordMatch = await bcrypt.compare(password, user.password)
  if (!doesThePasswordMatch) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Username or password is invalid' }))
  }

  const { accessToken, refreshToken } = generateTokens(user)

  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  sendRefreshToken(event, refreshToken)

  return { accessToken, user }

})
