import express from "express";

import { approvalView } from "../controller/changeApp.js";
const router = express.Router();

router.post("/", approvalView);
export default router;
