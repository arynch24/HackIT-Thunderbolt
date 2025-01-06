import { asyncHandler } from "./../utils/asyncHandler.js";
import { fetchLangflowResponse } from "../utils/fetchFromLangflow.js";


const getResponseFromLangflow = asyncHandler ( async (req, res) => {
    try {
        const { msg } = req.body;
        if (!msg) {
            res.status(401).send("No message was given");
        }
        const msg2 = await fetchLangflowResponse(msg);

        console.log(msg2);
        res.send(msg2);
    } catch (error) {
        throw new Error(error);
    }
});

export {
    getResponseFromLangflow
};