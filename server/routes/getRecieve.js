import express from "express";
import { addCheck } from "../controller/addRecieve.js";

const router = express.Router();

router.post("/", addCheck);

export default router;
