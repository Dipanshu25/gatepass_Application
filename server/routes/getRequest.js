import express from "express";
import { addRequest } from "../controller/addRequest.js";

const router = express.Router();

router.post("/", addRequest);

export default router;
