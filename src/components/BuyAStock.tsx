import React from "react";
import Button from "@material-ui/core/Button";
// import { addToInventory } from "../actions";
import { addToInventory } from "../features/InventoryData";
import { useDispatch } from "react-redux";

const BuyAStock = (props: { item: any }) => {
  const { item } = props;
  const dispatch = useDispatch();

  const buyAStock = () => {
    console.log(item);
    dispatch(
      addToInventory({
        stockName: item.stockName,
        price: item.series[0].data.slice(-1)[0].close,
        qty: 1,
      })
    );
  };

  return (
    <Button
      style={{ margin: 0.5 + "rem" }}
      variant="outlined"
      color="primary"
      onClick={buyAStock}
    >
      Buy {item.stockName} Stock
    </Button>
  );
};

export default BuyAStock;
