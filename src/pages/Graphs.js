import React from "react";
import "./Home.css";

import GraphComp from "../components/GraphComp";
import AddGraph from "../components/AddGraph";
import BuyAStock from "../components/BuyAStock";
import StockInv from "../components/StockInv";

const Graphs = () => {
  return (
    <div>
      <h1>Dr Stonks' RNG-O-Meter</h1>
      <AddGraph />
      <div className="homeCards">
        <GraphComp />
      </div>
      <div className="card">
        <StockInv />
        <BuyAStock />
      </div>
    </div>
  );
};

export default Graphs;
