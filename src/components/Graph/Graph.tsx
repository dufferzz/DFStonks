import React, { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addSocketData } from "../../slices/SocketData";
import Chart from "kaktana-react-lightweight-charts";

import { RootState } from "../../reducers";
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
    width: 100%;
  }
`;

const GraphTitle = styled.div`
  font-size: 2rem;
  margin: 0;
  padding: 0;
`;

export const Graph = React.memo(
  (props: { index: number; stockName: string }) => {
    const { index, stockName } = props;

    const socket = useContext(SocketContext);
    const socketData = useSelector((state: RootState) => state.socketSlice);
    const dispatch = useDispatch();

    let currentValue = {
      stockName,
      y: 0,
      x: 0,
      isActive: true,
    };

    let prevValue = currentValue;

    // errrrrm
    if (typeof socketData[index].series !== "undefined") {
      if (socketData[index].series[0].data.length >= 2) {
        currentValue = socketData[index].series[0].data.slice(-1)[0];
        prevValue = socketData[index].series[0].data.slice(-2)[0];
      }
    }

    useEffect(() => {
      console.log("socket opening:", stockName, index);
      socket.on(stockName, (data: any) => {
        dispatch(addSocketData({ data, index }));
      });

      const stopSocket = () => {
        console.log("socket is stopping:", stockName);
        socket.off(stockName);
      };

      return () => {
        stopSocket();
      };
    }, [dispatch, stockName, socket, index]);

    const [options2] = useState({
      options: {
        alignLabels: true,

        timeScale: {
          fixLeftEdge: false,
          lockVisibleTimeRangeOnResize: true,
          borderVisible: false,
          borderColor: "#fff000",
          visible: true,
          timeVisible: true,
          secondsVisible: false,
        },
      },
    });

    return (
      <div>
        <GraphTitle>{stockName}</GraphTitle>
        <GraphContainer>
          <TopBar
            index={index}
            currentValue={currentValue}
            prevValue={prevValue}
            stockName={stockName}
          />

          <GraphPadding>
            {socketData[index].series[0].data.length > 0 && (
              <Chart
                darkTheme={true}
                options={options2.options}
                candlestickSeries={socketData[index].series.slice()}
                autoWidth
                height={320}
              />
            )}
          </GraphPadding>
        </GraphContainer>
      </div>
    );
  }
);

export default Graph;
