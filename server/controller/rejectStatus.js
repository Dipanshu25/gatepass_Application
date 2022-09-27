import { pool } from "../index.js";
import Express from "express";
export const addReject = async (req, res) => {
  const { requesttype } = req.body;

  pool.query(
    `update activity set status='rejected' where requesttype='${requesttype}'`,
    (err, results) => {
      if (err) {
        res.status(409).json("Some Error occured");

        console.log(results.rows);
      } else res.send("changed");
    }
  );
};
