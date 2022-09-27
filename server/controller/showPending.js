import Express from "express";
import { pool } from "../index.js";

export const pending = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (email === "superadmin123@digi.com") {
    pool.query(
      `select * from activity where approver in(select username from userrole where email='${email}') and status = 'pending'`,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else {
          res.send(results.rows);
        }
      }
    );
  } else if (email === "manager123@digi.com") {
    pool.query(
      `select * from activity where (approver in(select username from userrole where email='${email}') and status = 'pending') OR (useremail='manager123@digi.com' and status = 'pending')`,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else {
          res.send(results.rows);
        }
      }
    );
  } else if (email === "security123@digi.com") {
    pool.query(
      `select * from activity where status='pending'`,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else res.send(results.rows);
      }
    );
  } else {
    pool.query(
      `select * from activity where useremail='${email}' and status='pending'`,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else {
          res.send(results.rows);
        }
      }
    );
  }
};
