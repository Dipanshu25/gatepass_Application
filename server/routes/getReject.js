import Express from "express";
import { addReject } from "../controller/rejectStatus.js";

const router = Express.Router();
router.post("/", addReject);
export default router;
