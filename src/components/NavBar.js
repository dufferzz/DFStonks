import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  header: {
    color: "#a4a3ad",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    // width: "100%",
  },
}));
export default function NavBar({ toggleDrawer }) {
  const classes = useStyles();

  return (
    <AppBar style={{ background: "#1f1c30" }} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="primary"
          aria-label="open drawer"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.header}>Dr Stonks' RNG-O-Meter</div>
      </Toolbar>
    </AppBar>
  );
}
