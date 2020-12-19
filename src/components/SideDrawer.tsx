import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

export default function SideDrawer(props: {
  state: any;
  toggleDrawer: Function;
}) {
  const { state, toggleDrawer } = props;

  const list = (anchor: string) => (
    <div
      style={{
        width: 200 + "px",
        backgroundColor: "#1f1c30",
        color: "white",
        height: 100 + "%",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/">
          <ListItem>
            <ListItemText primary="Stonks Simulator" />
          </ListItem>
        </Link>
        <Link to="/inventory">
          <ListItem>
            <ListItemText primary="Stock Inventory" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Drawer open={state["left"]} onClose={toggleDrawer("left", false)}>
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
