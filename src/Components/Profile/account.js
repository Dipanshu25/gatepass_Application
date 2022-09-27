import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountProfile from "./accountProfile.js";
import AccountProfileDetails from "./accountProfileDetails.js";
import "./profilePage.css";
import React, { useState } from "react";
const Account = () => {
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    country: "",
  });

  return (
    <>
      <Container maxWidth="lg" className="container">
        <Typography sx={{ mb: 3 }} variant="h3" className="headText">
          Account
        </Typography>
        <Grid container spacing={5}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile values={values} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails setValues={setValues} values={values} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Account;
