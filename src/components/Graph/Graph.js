import React, { useEffect, useContext } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  FlexibleWidthXYPlot,
} from "react-vis";
import Candlestick from "./Candlestick";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { addSocketData } from "../../actions";

import SocketContext from "../../socket";
import TopBar from "./TopBar";

const GraphPadding = styled.div`
  padding: 0.3rem;
  @media only screen and (max-width: 1025px) {
    padding: 0;
  }
`;

const GraphContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);

  @media (max-width: 1025px) {
    padding: 0;
    margin: 0;
    width: 98%;
  }
`;

const GraphTitle = styled.div`
  font-size: 2rem;
  margin: 0;
  padding: 0;
`;

export default function Graph({ data, stockName }) {
  const socket = useContext(SocketContext);
  const socketData = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();

  let currentValue = {
    stockName,
    y: null,
    x: null,
  };

  let prevValue = currentValue;

  if (socketData.chart1) {
    // console.log(socketData.chart1);

    currentValue = socketData.chart1.slice(-1)[0];
    prevValue = socketData.chart1.slice(-2)[0];
  }
  useEffect(() => {
    const openSocket = () => {
      console.log("socket opening:", stockName);
      socket.on(stockName, (data) => {
        dispatch(addSocketData(data));
      });
    };

    const stopSocket = () => {
      console.log("socket is stopping:", stockName);
      socket.off(stockName);
    };
    openSocket();
    return () => {
      stopSocket();
    };
  }, [socketData.isActive, dispatch, stockName, socket]);

  return (
    <div>
      <GraphTitle>{currentValue?.stockName}</GraphTitle>
      <GraphContainer>
        <TopBar currentValue={currentValue} prevValue={prevValue} />
        <GraphPadding>
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
        </GraphPadding>
      </GraphContainer>
    </div>
  );
}
