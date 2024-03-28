import { Prisma } from "@prisma/client"
import { TdecodedData, Tpagination } from "../../interface"
import prisma from "../../utility/prismaClient"
import { TdonationRequest, TgetDonor } from "./donor.interface"
import { donorSearchFields } from "./donor.const"
import calculatePagination from "../../utility/pagination"

const getDonor = async (params: TgetDonor, options: Tpagination) => {

    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options)
    const { searchTerm, ...rest } = params
    let andCondition: Prisma.UserWhereInput[] = []

    if (searchTerm) {
        andCondition.push({
            OR: donorSearchFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(rest).length > 0) {
        if (Object.keys(rest).includes('availability')) {
            const value = Boolean(rest['availability'] === "false" ? '' : rest['availability'])
            andCondition.push({
                OR: [
                    {
                        availability: { equals: value }
                    }
                ]
            })
        }
    }
    //console.dir(andCondition, { depth: 'infinity' });



    const whereCondition: Prisma.UserWhereInput = { AND: andCondition }

    const data = await prisma.user.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
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

    const total = await prisma.user.count();

    const meta = {
        total,
        page,
        limit
    }
    return { meta, data }
}

const createDonorRequest = async (decoded: TdecodedData, payload: TdonationRequest) => {

    await prisma.user.findUniqueOrThrow({
        where: {
            id: payload.donorId
        }
    })

    const data = {
        requesterId: decoded.userId,
        ...payload
    }
    const result = await prisma.request.create({
        data: data,
        select: {
            id: true,
            donorId: true,
            phoneNumber: true,
            dateOfDonation: true,
            hospitalName: true,
            hospitalAddress: true,
            reason: true,
            requestStatus: true,
            createdAt: true,
            updatedAt: true,
            donor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true,
                    createdAt: true,
                    updatedAt: true,
                    password: false,
                    userProfile: true
                }
            }
        }
    })

    return result

}

export const donorService = {
    getDonor,
    createDonorRequest
}