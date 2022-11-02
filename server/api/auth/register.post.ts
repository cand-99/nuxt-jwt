import { IUser } from "~~/types/IUser"
import bcrypt from "bcrypt"
import { createUser } from "~~/server/database/Repositories/userRepository"
import { generateTokens, sendRefreshToken } from "~~/server/service/jwt"
import { createRefreshToken } from "~~/server/database/Repositories/refreshTokenRepository"
export default defineEventHandler(async(event) => {
  const body = await useBody(event)
  const { name, password, username } = body

  if(!name|| !password || !username){
    return sendError(event, createError({statusCode: 400, statusMessage: 'Invalid Registration'}))
  }

  const encryptedPassword: string = await bcrypt.hash(password, 10)

  const userData: IUser = {
    name: name,
    username: username,
    password: encryptedPassword
  }

  const user = await createUser(userData)
  
  const { accessToken, refreshToken } = generateTokens(user)

  await createRefreshToken({
    token: refreshToken,
    userId: user.id
})

  sendRefreshToken(event, refreshToken)

  return {accessToken, user}
})
