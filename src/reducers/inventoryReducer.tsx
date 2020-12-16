import { createReducer } from "@reduxjs/toolkit";
import { addToInventory } from "../actions";

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const initialState: any[] = [];

const inventoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(addToInventory, (state, action) => {
    let newItem;
    if (typeof action.payload !== "undefined") {
      newItem = {
        stockName: action.payload.stockName,
        price: action.payload.price,
        qty: action.payload.qty,
      };
    }
    state.push(newItem);
  });
});

export { inventoryReducer };
