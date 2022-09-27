import express from "express";

import { createUser } from "../controller/addUser.js";

const router = express.Router();

router.post("/", createUser);

export default router;
