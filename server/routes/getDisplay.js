import express from "express";

import { display } from "../controller/displayRecieve.js";
const router = express.Router();

router.post("/", display);
export default router;
