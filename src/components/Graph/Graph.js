import React, { useEffect } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  FlexibleWidthXYPlot,
} from "react-vis";
import Candlestick from "./Candlestick";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";

import { toggleSocket, addSocketData } from "../../actions";
import socketIOClient from "socket.io-client";

import calcDiff from "../../utils/calcDiff";

const ENDPOINT = "http://192.168.1.47:4001";

export default function Graph({ data, stockName }) {
  const socketData = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();

  const currentValue = data.slice(-1)[0];
  const prevValue = data.slice(-2)[0];

  const toggleGraph = () => {
    console.log("Toggling graph..");
    dispatch(toggleSocket());
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    if (socketData.isActive) {
      socket.on(stockName, (data) => {
        dispatch(addSocketData(data));
      });
    } else {
      return () => {
        socket.off(stockName);
      };
    }
  }, [socketData.isActive, dispatch, stockName]);

  const Toggler = () => (
    <div className="ToggleGraph">
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
    </div>
  );

  const CurrentState = () => {
    const difference = calcDiff(currentValue.y, prevValue.y).toFixed(2);
    return (
      <>
        <div className="TLBox">
          <div className="TLCornerBox1">{currentValue.y}</div>

          {currentValue.y > prevValue.y ? (
            <div className="TLCornerBoxHigh">+{difference}%</div>
          ) : (
            <div className="TLCornerBoxLow">-{difference}%</div>
          )}
        </div>
      </>
    );
  };
  return (
    <>
      <h2>{currentValue.stockName}</h2>
      <div className="graphContainer">
        <div className="topBar">
          <CurrentState />
          <Toggler />
        </div>
        <div className="graph">
          <FlexibleWidthXYPlot
            height={300}
            xType="time"
            style={{ color: "rgba(255,255,255,0.2)" }}
            color="#2a326b"
          >
            <Candlestick data={data} />
            <HorizontalGridLines style={{ stroke: "rgba(255,255,255,0.2)" }} />
            <VerticalGridLines style={{ stroke: "rgba(255,255,255,0.2)" }} />
            <XAxis type="time" title="Server Time" />
            <YAxis title="Price (NOK)" />
          </FlexibleWidthXYPlot>
        </div>
      </div>
    </>
  );
}
