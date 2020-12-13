import React from "react";
import Graph from "../components/Graph/Graph";

import { useSelector } from "react-redux";

const GraphComp = () => {
  const chartData = useSelector((state) => state.chartReducer);
  const socketData = useSelector((state) => state.socketReducer);

  return (
    <>
      {chartData.map((item, key) => {
        return (
          <div className="card" key={key}>
            <Graph data={socketData[item.title]} stockName="SocketRandom" />
          </div>
        );
      })}
      {chartData.length === 0 && "aint got no charts"}
    </>
  );
};

export default GraphComp;
