import express from "express";
// import { retrieveCheck } from "../../src/requests.js";

import createRequest from "../controller/userRequest.js";

const router = express.Router();

router.post("/", createRequest);

export default router;
