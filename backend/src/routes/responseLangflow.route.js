import Router  from "express";
import { getResponseFromLangflow } from "./../controllers/response.controller.js";

const router = Router();

router.route("/getResponse").post(getResponseFromLangflow);

export default router;