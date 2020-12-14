import React from "react";
import { useSelector } from "react-redux";
import Graph from "../components/Graph/Graph";

import AddGraph from "../components/AddGraph";
import BuyAStock from "../components/BuyAStock";
import StockInv from "../components/StockInv";

import styled from "styled-components";

import Card from "../components/styledComponents/Card";
import GraphCard from "../components/styledComponents/GraphCard";

const GraphCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  // grid-template-columns: auto;
  grid-gap: 1rem;
  grid-template-rows: auto;
  margin: 1rem;

  @media (max-width: 1025px) {
    grid-template-columns: 1fr;
    // grid-template-columns: auto;
    grid-gap: 1rem;
    grid-template-rows: auto;
  }
`;

const Graphs = () => {
  const socketData = useSelector((state) => state.socketReducer);
  const chartData = useSelector((state) => state.chartReducer);

  return (
    <div>
      <h1>Dr Stonks' RNG-O-Meter</h1>

      <Card>
        <AddGraph />
      </Card>
      <GraphCards>
        {chartData.map((item, key) => (
          <GraphCard key={key}>
            <Graph data={socketData[item.title]} stockName="SocketRandom" />
            <BuyAStock stockName={item.title} />
          </GraphCard>
        ))}

        <Card>
          <StockInv />
        </Card>
      </GraphCards>
    </div>
  );
};

export default Graphs;
