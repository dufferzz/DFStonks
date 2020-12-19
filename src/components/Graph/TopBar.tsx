import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
// import { toggleSocket, addSocketData } from "../../actions";
import { toggleSocket, addSocketData } from "../../features/SocketData";

import calcDiff from "../../utils/calcDiff";
import { RootState } from "../../features";

import SocketContext from "../../socket";
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

const Toggler = React.memo((props: { index: number; stockName: string }) => {
  const { index, stockName } = props;
  const socketData = useSelector((state: RootState) => state.socketSlice);
  const socket = useContext(SocketContext);

  const dispatch = useDispatch();

  const toggleGraph = () => {
    dispatch(toggleSocket(index));
    console.log("Toggling graph..");
    if (socketData[index].isActive) {
      console.log("closing", stockName);
      socket.off(stockName); // This no nice, closes all sockets with same name.. need to fix
      // no point having duplicate data for the same stock.. other graph may be diff type
    } else {
      socket.on(stockName, (data: any) => {
        dispatch(addSocketData({ data, index }));
      });
      console.log("opening", stockName);
    }
  };

  return (
    <ToggleGraph>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={socketData[index].isActive}
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
});

const TopBar = React.memo(
  (props: {
    index: number;
    currentValue: any;
    prevValue: any;
    stockName: string;
  }) => {
    const { index, currentValue, prevValue, stockName } = props;
    const CurrentState = () => {
      // Nope broken af
      const difference = calcDiff(currentValue.open, prevValue.close).toFixed(
        2
      );
      return (
        <>
          <TLBox>
            <TLCornerBox1>{currentValue.open}</TLCornerBox1>

            {currentValue.open > prevValue.close ? (
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
        <Toggler index={index} stockName={stockName} />
        <CurrentState />
      </GraphTopBar>
    );
  }
);

export default TopBar;
