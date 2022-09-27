import Express from "express";
import { pool } from "../index.js";

export const createUser = async (req, res) => {
  const { username, email, userrole, password } = req.body;

  pool.query(
    `insert into userrole(email,username,password,userrole)values('${email}','${username}','${password}','${userrole}')`,
    (err, results) => {
      if (err) {
        console.log(results.rows);
      } else {
        res.send("USER CREATED");
      }
    }
  );
};
