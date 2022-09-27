import Express from "express";
import { addStatus } from "../controller/changeStatus.js";

const router = Express.Router();
router.post("/", addStatus);
export default router;
