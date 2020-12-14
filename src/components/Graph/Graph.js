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

export default function Graph({ index, data, stockName }) {
  const socket = useContext(SocketContext);
  const socketData = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();

  let currentValue = {
    stockName,
    y: null,
    x: null,
  };

  let prevValue = currentValue;

  if (socketData[index].data.length >= 2) {
    currentValue = socketData[index].data.slice(-1)[0];
    prevValue = socketData[index].data.slice(-2)[0];
  }

  useEffect(() => {
    console.log("socket opening:", stockName);
    socket.on(stockName, (data) => {
      dispatch(addSocketData({ data, index }));
    });

    return () => {
      console.log("socket is stopping:", stockName);
      socket.off(stockName);
    };
  }, [socketData.isActive, dispatch, stockName, socket, index]);

  return (
    <div>
      <GraphTitle>{currentValue?.stockName}</GraphTitle>
      <GraphContainer>
        <TopBar
          index={index}
          currentValue={currentValue}
          prevValue={prevValue}
        />
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
