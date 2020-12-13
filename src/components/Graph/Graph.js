import React from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  makeWidthFlexible,
} from "react-vis";
import Candlestick from "./Candlestick";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function Graph({ data, getData, setGetData }) {
  const currentValue = data.slice(-1)[0];
  const prevValue = data.slice(-2)[0];

  const FlexibleXYPlot = makeWidthFlexible(XYPlot);

  const calcDiff = (a, b) => {
    return 100 * Math.abs((a - b) / ((a + b) / 2));
  };

  const toggleGraph = () => {
    console.log("Toggling graph..");
    setGetData(!getData);
  };

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
      <div className="topBar">
        <CurrentState />
        <div className="ToggleGraph">
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={getData}
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
      </div>
      <div className="graph">
        <FlexibleXYPlot animation height={300} xType="time">
          <Candlestick
            colorType="literal"
            opacityType="literal"
            stroke="#1896FD"
            data={data}
          />
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis type="time" title="Time" />
          <YAxis title="Price (NOK)" />
        </FlexibleXYPlot>
      </div>
    </>
  );
}
