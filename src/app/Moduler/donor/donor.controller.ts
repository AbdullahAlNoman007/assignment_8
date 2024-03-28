import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { donorService } from "./donor.service";
import pick from "../../utility/pick";
import { donorFilterFields, donorPaginationFields } from "./donor.const";

const getDonor = catchAsync(async (req, res) => {
    console.log(req.url);
    console.log(req.query);


    const filter = pick(req.query, donorFilterFields);
    const options = pick(req.query, donorPaginationFields);

    const result = await donorService.getDonor(filter, options);

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Donors successfully found",
        meta: result.meta,
        data: result.data
    })
})

const createDonorRequest = catchAsync(async (req, res) => {

    const result = await donorService.createDonorRequest(req.user, req.body)

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Request successfully made",
        data: result
    })
})

export const donorController = {
    getDonor,
    createDonorRequest
}