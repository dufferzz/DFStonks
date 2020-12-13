import React from "react";
import { useSelector } from "react-redux";

const StockInv = () => {
  const inventoryState = useSelector((state) => state.inventoryReducer.arr);

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

export default StockInv;
