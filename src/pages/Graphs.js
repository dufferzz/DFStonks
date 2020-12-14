import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Graph from "../components/Graph/Graph";
import AddGraph from "../components/AddGraph";
import BuyAStock from "../components/BuyAStock";
import StockInv from "../components/StockInv";

import Card from "../components/styledComponents/Card";

const GraphCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  // grid-template-columns: auto;
  grid-gap: 1rem;
  grid-template-rows: auto;

  @media (max-width: 1025px) {
    grid-template-columns: 1fr;
    // grid-template-columns: auto;
    grid-gap: 1rem;
    grid-template-rows: auto;
  }
`;

const GraphCard = styled.div`
  background-color: #1f1c30;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 0 1rem 1rem 1rem;
  min-width: 28vw;
  max-width: 90vw;

  @media (max-width: 1025px) {
    width: 90vw;
  }
`;

const Graphs = () => {
  const socketData = useSelector((state) => state.socketReducer);
  const chartData = useSelector((state) => state.chartReducer);

  return (
    <div>
      <Card
        style={{
          width: "fit-content",
          margin: "auto",
          marginBottom: 1 + "rem",
          padding: 0.5 + "rem",
        }}
      >
        <AddGraph />
      </Card>

      <GraphCards>
        {socketData.map((item, key) => (
          <GraphCard key={key}>
            <Graph index={key} data={item.data} stockName={item.stockName} />
            <BuyAStock index={key} />
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
