import Express from "express";
import { pool } from "../index.js";

export const display = async (req, res) => {
  const { email } = req.body;

  pool.query(
    `select * from activity where approver in(select username from userrole where email='${email}')`,
    (err, results) => {
      if (err) {
        console.log(results.rows);
      } else res.send(results.rows);
    }
  );
};
