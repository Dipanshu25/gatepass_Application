import Express from "express";
import { pool } from "../index.js";

export const approve = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (email === "manager123@digi.com") {
    pool.query(
      `select * from activity where (approver in(select username from userrole where email='${email}') or useremail='${email}') and status='approved'`,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else res.send(results.rows);
      }
    );
  } else if (email === "superadmin123@digi.com") {
    pool.query(
      `select * from activity where approver in(select username from userrole where email='${email}') and status='approved'`,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else res.send(results.rows);
      }
    );
  } else if (email === "security123@digi.com") {
    pool.query(
      `select * from activity where status='approved'`,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else res.send(results.rows);
      }
    );
  } else {
    pool.query(
      `select * from activity where useremail='${email}' and status='approved'`,
      (err, results) => {
        if (err) {
          console.log(results.rows);
        } else res.send(results.rows);
      }
    );
  }
};
