import express from "express";
import { pool } from "../index.js";
// import { activity } from "./activity.js";
// import { check } from "./check.js";
// import { status } from "./status.js";

export const createRequest = async (req, res) => {
  let { email, password } = req.body;

  pool.query(
    `SELECT * from userrole WHERE password='${password}' and email='${email}'`,
    (err, results) => {
      if (err) {
        res.status(409).json("Some Error occured");
      } else if (results.rows.length === 0) {
        res.send("User doesnt exist!");
      } else res.send("User login Successfully!");
    }
  );

  //   pool.query(
  //     `INSERT INTO users(username, user_id, department,user_role)
  //   VALUES ('${username}', ${user_id}, 'Client','guest')`,
  //     (err, results) => {
  //       if (err) {

  //         const out = check({ username, user_id, user_activity });
  //         if (out !== 0) {
  //           status({ username, user_id, user_activity });
  //           res.status(409).json("User saved Successfully!");
  //         }
  //       } else {
  //         const response = activity({ username, user_id, user_activity });
  //         if (response == "SOME ERROR") {
  //           res.status(409).json("Some Error occured");
  //         } else res.status(409).json("User saved Successfully!");
  //       }
  //     }
  //   );
};
export default createRequest;
//INSERT INTO activity_log (username,user_id,approver) SELECT ‘paine’, 02980086, u.user_role FROM users u WHERE u.department =‘HUMAN RESOURCE’;//
