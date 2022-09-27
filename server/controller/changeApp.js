import { pool } from "../index.js";
import Express from "express";

export const approvalView = async (req, res) => {
  const { email } = req.body;
  console.log("hey", email);
  if (email === "manager123@digi.com") {
    pool.query(
      `select * from activity where (approver in(select username from userrole where email='${email}'))or useremail='manager123@digi.com' `,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else {
          console.log(results.rows);

          res.send(results.rows);
        }
      }
    );
  } else if (email === "superadmin123@digi.com") {
    pool.query(
      `select * from activity where approver in(select username from userrole where email='${email}') `,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else {
          console.log(results.rows);

          res.send(results.rows);
        }
      }
    );
  }
};
