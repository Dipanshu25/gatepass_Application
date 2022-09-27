import React from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Button } from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import Switch from "@material-ui/core/Switch";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    width: "100%",
    zIndex: 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    top: 0,
    backgroundColor: "grey",
  },
  menuButton: {
    marginRight: 0,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  dialogContent: {
    padding: 0,
  },
  headerToolbar: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("670")]: {
      minHeight: "64px",
    },
  },
  firstDiv: {
    width: "60%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondDiv: {
    width: "100%",
    display: "flex",
    fontSize: "larger",
    justifyContent: "flex-end",
    [theme.breakpoints.down("670")]: {
      display: "none",
    },
  },
  menuPopper: {
    [theme.breakpoints.up("670")]: {
      display: "none",
    },
  },
  dialog: {
    [theme.breakpoints.down("500")]: {
      zIndex: "0 ! important",
      paddingTop: "10px",
    },
  },
  dialogTitle: {
    [theme.breakpoints.down("1327")]: {
      padding: "10px 24px",
    },
  },
  dialogActions: {
    [theme.breakpoints.down("1327")]: {
      padding: "6px",
    },
  },
  loggedInDiv: {
    display: "flex",
    width: "30%",
    justifyContent: "flex-end",
  },
  newButton: {
    margin: "1opx",
  },
}));

export default function AppHeader(props) {
  const classes = useStyles();
  let history = useHistory();
  const { open, isLoggedIn, setIsLoggedIn, time, formValues } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("388"));
  const fullScreen = useMediaQuery(theme.breakpoints.down("500"));
  const anchorRef = React.useRef();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const { email, password } = formValues;
  const [anchorEl, setAnchorEl] = React.useState();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    history.push("/");
  };

  const handleRoute = (e) => {
    history.push(e);
  };

  React.useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.headerToolbar}>
        <div className={classes.firstDiv}>
          {!matches ? (
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              className={classes.title}
            >
              DIGICRED
            </Typography>
          ) : (
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              className={classes.title}
            >
              DIGICRED
            </Typography>
          )}
        </div>
        {isLoggedIn ? (
          <div className={classes.secondDiv}>
            <div ref={anchorRef}>
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                USER
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseProfile}
              >
                <StyledMenuItem onClick={() => handleRoute("/profile")}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={email} />
                </StyledMenuItem>
                {email !== "superadmin123@digi.com" ? (
                  <StyledMenuItem onClick={() => handleRoute("/raise")}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Raise Request" />
                  </StyledMenuItem>
                ) : (
                  <StyledMenuItem onClick={() => handleRoute("/add")}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Add user" />
                  </StyledMenuItem>
                )}

                <StyledMenuItem>
                  <ListItemIcon>
                    <AccessTimeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={time} />
                </StyledMenuItem>
                <StyledMenuItem onClick={handleLogOut}>
                  <ListItemIcon>
                    <InboxIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </StyledMenuItem>
              </StyledMenu>
            </div>
          </div>
        ) : (
          <div className={classes.loggedInDiv}>
            <Button color="inherit" size="medium">
              {" "}
              Sign Up
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
