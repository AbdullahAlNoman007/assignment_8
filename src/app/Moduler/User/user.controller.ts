import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { userService } from "./user.service";


const createUser = catchAsync(async (req, res) => {


    const result = await userService.createUserIntoDB(req.body)

    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: result
    })
})
const get = catchAsync(async (req, res) => {


    const result = await userService.get()

    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: result
    })
})



export const userController = {
    createUser,
    get
}