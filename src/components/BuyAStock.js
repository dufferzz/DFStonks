import React from "react";
import Button from "@material-ui/core/Button";
import { addToInventory } from "../actions";
import { useSelector, useDispatch } from "react-redux";

const BuyAStock = () => {
  const socketData = useSelector((state) => state.socketReducer);

  const dispatch = useDispatch();

  const currentValue = socketData.chart1.slice(-1)[0];

  const buyAStock = () => {
    const item = {
      stockName: currentValue.stockName,
      price: currentValue.y,
      qty: 1,
    };
    dispatch(addToInventory(item));
  };

  return (
    <Button
      style={{ margin: 1 + "rem" }}
      variant="outlined"
      color="primary"
      onClick={buyAStock}
    >
      Buy DFZ Stock
    </Button>
  );
};

export default BuyAStock;
