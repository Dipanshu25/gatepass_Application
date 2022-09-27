import Express from "express";
import { pool } from "../index.js";

export const addRequest = async (req, res) => {
  const { email } = req.body;

  pool.query(
    `SELECT * FROM activity where useremail='${email}' `,
    (err, results) => {
      if (err) {
        console.log(results.rows);
      } else {
        res.send(results.rows);
      }
    }
  );
};
