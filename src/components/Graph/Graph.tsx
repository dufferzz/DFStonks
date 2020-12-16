import React, { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { addSocketData } from "../../actions";
import ReactApexChart from "react-apexcharts";

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

// vvvvvvvvvvvvvv
export default function Graph(props: { index: number; stockName: string }) {
  const { index, stockName } = props;

  const socket = useContext(SocketContext);
  const socketData = useSelector((state: RootState) => state.socketReducer);
  const dispatch = useDispatch();

  let currentValue = {
    stockName,
    y: 0,
    x: 0,
    isActive: true,
  };

  let prevValue = currentValue;

  // errrrrm

  // if (socketData[index].data[index].data.length >= 2) {
  //   currentValue = socketData[index].data[index].data.slice(-1)[0];
  //   prevValue = socketData[index].data[index].data.slice(-2)[0];
  // }

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

  const [options, setOptions] = useState({
    options: {
      chart: {
        type: "candlestick",
        height: 350,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: false,
            speed: 350,
          },
        },
      },
      xaxis: {
        type: "category",
        labels: {
          formatter: function (val: Date) {
            return moment(val).format("HH:mm:ss");
          },
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
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
          {socketData[index].data.length > 0 && (
            <ReactApexChart
              options={options.options}
              series={socketData[index].data}
              type="candlestick"
              height={350}
            />
          )}
        </GraphPadding>
      </GraphContainer>
    </div>
  );
}
