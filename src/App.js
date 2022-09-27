import React, { useState } from "react";
import AppHeader from "./Components/Header/AppHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";

import AppRoutes from "./AppRoutes.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100vh",
  },
  rootLogin: {
    display: "flex",
    width: "100%",
    height: "100%",
    background: "#f3f3f3",
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //const { theme } = useContext(ThemeContext);
  const [time, setTime] = React.useState(null);
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppHeader
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        time={time}
        formValues={formValues}
      />
      {isLoggedIn ? (
        <AppRoutes
          open={open}
          handleDrawerClose={handleDrawerClose}
          formValues={formValues}
        />
      ) : (
        <div className={classes.rootLogin}>
          <LoginPage
            setIsLoggedIn={setIsLoggedIn}
            setTime={setTime}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </div>
      )}
    </div>
  );
}

export default App;
