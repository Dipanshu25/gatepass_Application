import Express from "express";
import { pool } from "../index.js";
// import { activity } from "./activity.js";

export const raise = async (req, res) => {
  const { useremail, user_activity, request_type } = req.body;

  pool.query(
    `INSERT INTO activity(useremail,requestType,approver) SELECT '${useremail}' AS useremail ,'${request_type}' AS requestType ,u.username FROM userrole u WHERE userrole = '${user_activity}'`,

    (err, results) => {
      if (err) {
        res.send("Some Error occured");
        console.log(results.rows);
      } else res.send("User Request CREATED!");

      // res.status(409).json("Some Error occured");
      // console.log(results.rows);
      //   } else res.status(201).json("User saved Successfully!");
    }
  );
};
export default raise;
