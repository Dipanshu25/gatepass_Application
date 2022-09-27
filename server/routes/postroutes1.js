import express from "express";
// import { retrieveCheck } from "../../src/requests.js";

import raise from "../controller/raiseRequest.js";
const router = express.Router();

router.post("/", raise);

export default router;
