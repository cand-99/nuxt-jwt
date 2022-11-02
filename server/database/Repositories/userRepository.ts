import prisma from "../client"
import { IUser } from "~~/types/IUser"


export async function createUser(data: IUser) {
    const user = await prisma.user.create({
        data: {
            username: data.username,
            name: data.name,
            password: data.password,
        },
    })

    return user
}

export async function getUserByUsername(username: string) {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}