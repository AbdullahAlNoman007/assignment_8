import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { userService } from "./user.service";


const createUser = catchAsync(async (req, res) => {


    const result = await userService.createUserIntoDB()

    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User is Created',
        data: result
    })
})



export const userController = {
    createUser
}