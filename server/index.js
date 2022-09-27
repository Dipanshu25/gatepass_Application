import express from "express";
import bodyParser from "body-parser";

import cors from "cors";

import post from "./routes/postRequest.js";
import poste from "./routes/postroutes1.js";
import get from "./routes/getRequest.js";
import getR from "./routes/getRecieve.js";
import postS from "./routes/postStatus.js";
import dotenv from "dotenv";
import getD from "./routes/getDisplay.js";
import postR from "./routes/getReject.js";
import postA from "./routes/getApprove.js";
import postRe from "./routes/getRejectStatus.js";
import postPen from "./routes/getPending.js";
import postAl from "./routes/getAll.js";
import postApp from "./routes/getChangeApproval.js";
import postN from "./routes/postNew.js";
const app = express();
dotenv.config();
import PG from "pg";
const Pool = PG.Pool;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT;
app.use("/default", (req, res) => {
  res.send("Hello World");
});
app.use("/request", post);
app.use("/new", postN);
app.use("/raised", poste);
app.use("/listRequest", get);
app.use("/listRecieved", getR);
app.use("/display", getD);
app.use("/status", postS);
app.use("/reject", postR);
app.use("/approve", postA);
app.use("/rejected", postRe);
app.use("/pending", postPen);
app.use("/all", postAl);
app.use("/statusApproved", postApp);
export const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
