import React, { useEffect, useState } from "react";
import Graph from "../components/Graph/Graph";
import socketIOClient from "socket.io-client";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";
import { getDataa, addToInventory } from "../actions";

const ENDPOINT = "http://192.168.1.47:4001";

const Graphs = () => {
  const socketData = useSelector((state) => state.socketReducer.arr);
  const inventoryState = useSelector((state) => state.inventoryReducer.arr);

  const dispatch = useDispatch();

  const [getData, setGetData] = useState(true);

  const currentValue = socketData.slice(-1)[0];

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    if (getData) {
      socket.on("SocketRandom", (data) => {
        dispatch(getDataa(data));
      });
    } else {
      return () => {
        socket.off("SocketRandom");
      };
    }
  }, [getData, dispatch]);

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
        <Graph data={socketData} getData={getData} setGetData={setGetData} />
        <BuyDFZStock />
        <StockInv />
      </div>
    </div>
  );
};

export default Graphs;
