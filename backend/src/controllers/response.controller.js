import { asyncHandler } from "./../utils/asyncHandler.js";
import { fetchLangflowResponse } from "../utils/fetchFromLangflow.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getResponseFromLangflow = asyncHandler ( async (req, res) => {
    try {
        const { msg } = req.body;
        if (!msg) {
            throw new ApiError(401, "Prompt is empty");
        }

        const msg2 = await fetchLangflowResponse(msg);
        
        console.log(msg2);
        res
            .status(201)
            .json(
                new ApiResponse(201, msg2, "Succefully retrieval of message from langflow")
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong from server side", error)
    }
});

export {
    getResponseFromLangflow
};