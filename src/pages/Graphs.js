import React from "react";
import Graph from "../components/Graph/Graph";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";
import { addToInventory } from "../actions";

const Graphs = () => {
  const socketData = useSelector((state) => state.socketReducer);
  const inventoryState = useSelector((state) => state.inventoryReducer.arr);

  const dispatch = useDispatch();

  const currentValue = socketData.chart1.slice(-1)[0];

  const StockInv = () => {
    return (
      <table className="tablee">
        <thead>
          <tr>
            <td>Item Name</td>
            <td>Buy Price</td>
            <td>Qty</td>
          </tr>
        </thead>
        <tbody>
          {inventoryState.map((item, key) => (
            <tr key={key}>
              <td>{item?.stockName}</td>
              <td>{item?.price}</td>
              <td>{item?.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const buyAStock = () => {
    const item = {
      stockName: currentValue.stockName,
      price: currentValue.y,
      qty: 1,
    };
    dispatch(addToInventory(item));
  };

  const BuyDFZStock = () => <button onClick={buyAStock}>Buy DFZ Stock</button>;

  return (
    <div>
      <h1>Dr Stonks' RNG-O-Meter</h1>
      <div className="card">
        <Graph data={socketData.chart1} stockName="SocketRandom" />

        <BuyDFZStock />
        <StockInv />
      </div>
    </div>
  );
};

export default Graphs;
