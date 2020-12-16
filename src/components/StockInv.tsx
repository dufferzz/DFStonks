import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers";

const Table = styled.table`
  width: 100%;
  margin: auto;
  text-align: center;
  border-collapse: collapse;
  min-height: 30vh;
  min-width: 30vw;
`;
const THead = styled.thead`
  background-color: rgba(0, 0, 0, 0.3);
`;

const StockInv = () => {
  const inventoryState = useSelector(
    (state: RootState) => state.inventoryReducer
  );

  return (
    <Table>
      <THead>
        <tr>
          <td>Item Name</td>
          <td>Buy Price</td>
          <td>Qty</td>
        </tr>
      </THead>
      <tbody>
        {inventoryState.length === 0 && (
          <tr>
            <td colSpan={3}>#NoStonks</td>
          </tr>
        )}
        {inventoryState.map((item: any, key: number) => (
          <tr key={key}>
            <td>{item?.stockName}</td>
            <td>{item?.price}</td>
            <td>{item?.qty}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StockInv;
