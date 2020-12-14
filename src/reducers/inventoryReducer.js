import { createReducer } from "@reduxjs/toolkit";
import { addToInventory } from "../actions";

const initialState = [];

const inventoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(addToInventory, (state, action) => {
    const newItem = {
      stockName: action.payload.stockName,
      price: action.payload.price,
      qty: action.payload.qty,
    };
    state.push(newItem);
  });
});

export { inventoryReducer };
