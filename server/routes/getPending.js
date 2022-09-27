import express from "express";

import { pending } from "../controller/showPending.js";
const router = express.Router();

router.post("/", pending);
export default router;
