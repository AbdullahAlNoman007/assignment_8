import config from "../../config"
import prisma from "../../utility/prismaClient"
import { User } from "./user.interface"
import bcrypt from 'bcrypt'

const createUserIntoDB = async (payload: User) => {

    const hashPassword = await bcrypt.hash(payload.password, Number(config.hash_salt_round as string))

    const user = {
        name: payload.name,
        email: payload.email,
        password: hashPassword,
        bloodType: payload.bloodType,
        location: payload.location
    }

    const result = await prisma.$transaction(async (tx) => {
        const createUser = await tx.user.create({
            data: user,
            select: {
                id: true,
                name: true,
                email: true,
                bloodType: true,
                location: true,
                availability: true,
                createdAt: true,
                updatedAt: true
            }
        })

        const userProfile = {
            userId: createUser.id,
            bio: payload.bio,
            age: payload.age,
            lastDonationDate: payload.lastDonationDate
        }

        const createUserProfile = await tx.userProfile.create({
            data: userProfile
        })

        return {
            ...createUser,
            userProfile: createUserProfile
        }
    })

    return result
}

const get = async () => {
    const result = await prisma.user.findUnique({
        where: {
            email: "noman@mail.com"
        },
        select: {
            id: true,
            name: true,
            email: true,
            bloodType: true,
            location: true,
            availability: true,
            createdAt: true,
            updatedAt: true,
            userProfile: true,
        }
    })
    return result
}

export const userService = {
    createUserIntoDB,
    get
}