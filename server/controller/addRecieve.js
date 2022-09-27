import Express from "express";
import { pool } from "../index.js";

export const addCheck = async (req, res) => {
  const { email, user_activity, request_type } = req.body;

  pool.query(
    `SELECT * FROM activity where requesttype='${request_type}'AND useremail='${email}' AND approver in(select username from userrole where userrole='${user_activity}')`,
    (err, results) => {
      if (err) {
        console.log(results.rows);
      } else {
        if (results.rows.length !== 0) {
          console.log(results.rows[0].status);
          res.send(results.rows[0].status);
        } else res.send("DENIED");
      }
    }
  );
};
