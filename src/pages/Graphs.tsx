import React, { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Graph from "../components/Graph/Graph";
import AddGraph from "../components/AddGraph";
import BuyAStock from "../components/BuyAStock";
import StockInv from "../components/StockInv";
import AddSocket from "../components/AddSocket";

import ErrorBoundary from "./ErrorBoundary";

import Card from "../components/styledComponents/Card";

const GraphCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  // grid-template-columns: auto;
  grid-gap: 1rem;
  grid-template-rows: auto;

  @media (max-width: 1025px) {
    grid-template-columns: 1fr;
    // grid-template-columns: auto;
    grid-gap: 0.5rem;
    grid-template-rows: auto;
  }
`;

const GraphCard = styled.div`
  background-color: "${(props) => props.theme}";
  // border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 0 1rem 1rem 1rem;
  width: 43vw;

  @media (max-width: 1025px) {
    width: 95vw;
    // max-width: 95vw;
    padding: 0;
  }
`;

const Graphs = React.memo(() => {
  const socketData = useSelector((state: any) => state.socketSlice);

  return (
    <div>
      {/* <AddSocket /> */}
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

      <ErrorBoundary>
        <GraphCards>
          {socketData.map((item: any, key: number) => (
            <GraphCard key={key}>
              <Graph index={key} stockName={item.stockName} />

              <BuyAStock item={item} />
            </GraphCard>
          ))}
        </GraphCards>
        <Card style={{ marginTop: 0.8 + "rem" }}>
          <StockInv />
        </Card>
      </ErrorBoundary>
    </div>
  );
});

export default Graphs;
