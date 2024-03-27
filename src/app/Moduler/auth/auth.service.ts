import httpStatus from "http-status"
import AppError from "../../Error/AppError"
import prisma from "../../utility/prismaClient"
import { Tlogin } from "./auth.interface"
import bcrypt from 'bcrypt'
import config from "../../config"
import { jwtDecode } from "jwt-decode"
import { TdecodedData } from "../../interface"
import token from "../../utility/Token"

const loginInDB = async (payload: Tlogin) => {
    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: 'ACTIVE'
        }
    })

    const isPasswordMatched = bcrypt.compareSync(payload.password, isUserExists.password)
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match")
    }

    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role
    }

    const accessToken = token(jwtPayload, config.jwt.jwt_access_token as string, config.jwt.jwt_access_expires_in as string)

    const refreshToken = token(jwtPayload, config.jwt.jwt_refresh_token as string, config.jwt.jwt_refresh_expires_in as string)

    return {
        accessToken,
        refreshToken,
        needPasswordChange: isUserExists.needPasswordChange
    };


}

export const authService = {
    loginInDB
}