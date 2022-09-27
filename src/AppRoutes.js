import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
// import UploadWrapper from "./Components/Upload/uploadWrap.js";
import ListComp from "./Components/List/listComponent.js";

import Account from "./Components/Profile/account.js";
import RequestComponent from "./Components/Request/request.js";
import TableComp from "./Components/TableComp/FetchTable.js";
import AddComponent from "./Components/New/user.js";

const useStyles = makeStyles((theme) => ({
  mainApp: {
    width: "100%",
    overflow: "auto",
    height: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("740")]: {
      width: "100%",
    },
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={classes.footer}
    >
      {"Copyright © "}
      <Link color="black" to="#">
        DIGICRED
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function AppRoutes(props) {
  const classes = useStyles();
  const { open, handleDrawerClose, formValues } = props;
  // const [dataset, setDataset] = React.useState([]);
  // const [tableData, setTableData] = React.useState([]);
  const { email } = formValues;
  return (
    <main className={classes.mainApp} onClick={handleDrawerClose}>
      <Switch>
        {email === "manager123@digi.com" ||
        email === "superadmin123@digi.com" ? (
          <Route
            exact
            path="/"
            component={() => <ListComp formValues={formValues} />}
          />
        ) : (
          <Route
            exact
            path="/"
            component={() => <TableComp formValues={formValues} />}
          />
        )}

        <Route
          exact
          path="/raise"
          component={() => <RequestComponent formValues={formValues} />}
        />
        <Route exact path="/add" component={() => <AddComponent />} />

        {/* <Route
          path="/recieved"
          component={() => <ListComp formValues={formValues} />}
        /> */}
        <Route
          path="/tableView"
          component={() => <TableComp formValues={formValues} />}
        />
        <Route path="/profile" component={() => <Account />} />
      </Switch>
      <Copyright />
    </main>
  );
}
