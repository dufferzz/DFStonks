import { createSlice } from "@reduxjs/toolkit";
const initialState: any = [];

const inventorySlice = createSlice({
  name: "SocketData",
  initialState: initialState,
  reducers: {
    addToInventory(
      state: any,
      action: { payload: { stockName: string; price: number; qty: number } }
    ) {
      const newItem = {
        stockName: action.payload.stockName,
        price: action.payload.price,
        qty: action.payload.qty,
      };
      state.push(newItem);
    },
  },
});

export const { addToInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
