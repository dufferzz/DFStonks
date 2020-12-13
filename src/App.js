import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Graphs from "./pages/Graphs";

import "./App.css";
import NavBar from "./components/NavBar";
import SideDrawer from "./components/SideDrawer";

function App() {
  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return (
    <Router>
      <div className="App">
        <NavBar toggleDrawer={toggleDrawer} />
        <SideDrawer state={drawerState} toggleDrawer={toggleDrawer} />
        <div className="container">
          <div className="contentContainer">
            <Switch>
              <Route exact path="/">
                <Graphs />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
