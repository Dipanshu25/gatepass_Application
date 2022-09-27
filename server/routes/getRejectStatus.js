import express from "express";

import { reject } from "../controller/showReject.js";
const router = express.Router();

router.post("/", reject);
export default router;
