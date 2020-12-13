import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import Graph from "../components/Graph/Graph";

import AddGraph from "../components/AddGraph";
import BuyAStock from "../components/BuyAStock";
import StockInv from "../components/StockInv";

const Graphs = () => {
  const socketData = useSelector((state) => state.socketReducer);
  const chartData = useSelector((state) => state.chartReducer);

  return (
    <div>
      <h1>Dr Stonks' RNG-O-Meter</h1>
      <AddGraph />
      <div className="homeCards">
        {chartData.map((item, key) => {
          return (
            <div className="card" key={key}>
              <Graph data={socketData[item.title]} stockName="SocketRandom" />
            </div>
          );
        })}
      </div>
      <div className="card">
        <StockInv />
        <BuyAStock />
      </div>
    </div>
  );
};

export default Graphs;
