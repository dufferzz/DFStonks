import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Graphs from "./pages/Graphs";

import SocketContext, { socket } from "./socket";

import NavBar from "./components/NavBar";
import SideDrawer from "./components/SideDrawer";
import Container from "./components/styledComponents/Container";
import ContentContainer from "./components/styledComponents/ContentContainer";

import styled from "styled-components";

import { ThemeStore } from "./theme/ThemeStore";
import Theme from "./theme/Theme";

const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
`;

function App() {
  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  const toggleDrawer = (anchor: string, open: boolean) => (event: {
    type: string;
    key: string;
  }) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return (
    <SocketContext.Provider value={socket}>
      <ThemeStore>
        <Router>
          <AppContainer>
            <NavBar toggleDrawer={toggleDrawer} />
            <SideDrawer state={drawerState} toggleDrawer={toggleDrawer} />
            <Container>
              <ContentContainer>
                <Switch>
                  <Route exact path="/">
                    <Graphs />
                  </Route>
                </Switch>
              </ContentContainer>
            </Container>
          </AppContainer>
        </Router>
      </ThemeStore>
    </SocketContext.Provider>
  );
}

export default App;
