import express from "express";

import { approve } from "../controller/showApprove.js";
const router = express.Router();

router.post("/", approve);
export default router;
