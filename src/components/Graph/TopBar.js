import React from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import { toggleSocket } from "../../actions";
import calcDiff from "../../utils/calcDiff";

import styled from "styled-components";

const TLBox = styled.div`
  display: flex;
`;
const GraphTopBar = styled.div`
  position: relative;
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0;
  margin: 0;
`;

const TLCornerBox1 = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 0.5rem;
  z-index: 1000;
  min-width: 3em;
  border: 2px solid rgba(0, 0, 0, 0.7);
`;
const TLCornerBoxLow = styled.div`
  text-align: center;

  background-color: rgba(255, 0, 0, 0.5);
  min-width: 5em;
  border-radius: 5px;
  padding: 0.5rem;
  z-index: 1000;
  border: 2px solid rgba(255, 0, 0, 0.7);
`;
const TLCornerBoxHigh = styled.div`
  min-width: 5em;
  color: black;

  background-color: rgba(0, 255, 0, 0.5);
  border-radius: 5px;
  padding: 0.5rem;
  z-index: 1000;
  border: 2px solid rgba(0, 255, 0, 0.7);
`;

const ToggleGraph = styled.div`
  right: 0;
  position: absolute;
  display: inline-block;
`;

const TopBar = ({ currentValue, prevValue }) => {
  const socketData = useSelector((state) => state.socketReducer);

  const dispatch = useDispatch();

  const toggleGraph = () => {
    console.log("Toggling graph..");
    dispatch(toggleSocket());
  };

  const Toggler = () => (
    <ToggleGraph>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={socketData.isActive}
              onChange={toggleGraph}
              name="checkedA"
              inputProps={{ "aria-label": "primary checkbox" }}
              color="primary"
            />
          }
          label="Live Data"
        />
      </FormGroup>
    </ToggleGraph>
  );

  const CurrentState = () => {
    const difference = calcDiff(currentValue.y, prevValue.y).toFixed(2);
    return (
      <>
        <TLBox>
          <TLCornerBox1>{currentValue.y}</TLCornerBox1>

          {currentValue.y > prevValue.y ? (
            <TLCornerBoxHigh>+{difference}%</TLCornerBoxHigh>
          ) : (
            <TLCornerBoxLow>-{difference}%</TLCornerBoxLow>
          )}
        </TLBox>
      </>
    );
  };

  return (
    <GraphTopBar>
      <Toggler />
      <CurrentState />
    </GraphTopBar>
  );
};

export default TopBar;
