import React, { useEffect, useState } from "react";
import Graph from "../components/Graph/Graph";
import socketIOClient from "socket.io-client";
import "./Home.css";
const ENDPOINT = "http://192.168.1.47:4001";

const Usage = () => {
  const [getData, setGetData] = useState(true);
  const [getData2, setGetData2] = useState(true);

  const currentDate = new Date();
  const [response, setResponse] = useState(() => [
    { x: currentDate.getTime(), y: 0, stockName: "" },
  ]);
  const [response2, setResponse2] = useState(() => [
    { x: currentDate.getTime(), y: 0, stockName: "" },
  ]);
  const currentValue = response.slice(-1)[0];
  const currentValue2 = response.slice(-1)[0];

  useEffect(() => {
    if (response.length > 50) {
      response.shift();
    }
  }, [response]);
  useEffect(() => {
    if (response2.length > 50) {
      response2.shift();
    }
  }, [response2]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    if (getData) {
      socket.on("SocketRandom", (data) => {
        //console.log(data);
        setResponse((r) => [
          ...r,
          {
            x: data.time,
            y: data.currentPrice,
            stockName: data.stock,
            yLow: data.yLow,
            yHigh: data.yHigh,
            yOpen: data.yOpen,
            yClose: data.yClose,
          },
        ]);
      });
      socket.on("SocketRandom2", (data) => {
        //console.log(data);
        setResponse2((r) => [
          ...r,
          {
            x: data.time,
            y: data.currentPrice,
            stockName: data.stock,
            yLow: data.yLow,
            yHigh: data.yHigh,
            yOpen: data.yOpen,
            yClose: data.yClose,
          },
        ]);
      });
    } else {
      return () => {
        socket.off("SocketRandom");
        socket.off("SocketRandom2");
      };
    }
  }, [getData]);

  const [stockInventory, setStockInventory] = useState([]);

  const StockInv = () => {
    return (
      <div>
        <table className="tablee">
          <thead>
            <tr>
              <td>Item Name</td>
              <td>Buy Price</td>
              <td>Qty</td>
            </tr>
          </thead>
          <tbody>
            {stockInventory.map((item, key) => (
              <>
                <tr key={key}>
                  <td>{item?.stock}</td>
                  <td>{item?.price}</td>
                  <td>{item?.qty}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const buyAStock = () => {
    console.log(stockInventory);
    if (typeof stockInventory[0]?.qty == "number") {
      setStockInventory([
        {
          stock: currentValue.stockName,
          price: stockInventory[0].price + currentValue.y,
          qty: stockInventory[0].qty + 1,
        },
      ]);
    } else {
      setStockInventory([
        { stock: currentValue.stockName, price: currentValue.y, qty: 1 },
      ]);
    }
  };

  const BuyDFZStock = () => {
    return (
      <>
        <button
          onClick={() => {
            buyAStock();
          }}
        >
          Buy DFZ Stock
        </button>
      </>
    );
  };

  return (
    <div>
      <h1>Dr Stonks' RNG-O-Meter</h1>
      <div className="card">
        <Graph response={response} getData={getData} setGetData={setGetData} />
        <BuyDFZStock />
        <StockInv />
      </div>
      <div className="card">
        <Graph
          response={response2}
          getData={getData2}
          setGetData={setGetData2}
        />
      </div>
    </div>
  );
};

export default Usage;
