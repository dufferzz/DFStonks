import { createReducer } from "@reduxjs/toolkit";
import { addSocketData, toggleSocket } from "../actions";
const currentDate = new Date();

const initialState = {
  isActive: true,
  chart1: [
    {
      x: currentDate.getTime(),
      y: 0,
      stockName: "",
      yLow: 0,
      yHigh: 0,
      yOpen: 0,
      yClose: 0,
    },
  ],
};

const socketReducer = createReducer(initialState, (builder) => {
  builder.addCase(addSocketData, (state, action) => {
    state.chart1.push({
      x: action.payload.time,
      y: action.payload.currentPrice,
      stockName: action.payload.stock,
      unitsPurchased: action.payload.unitsPurchased,
      unitsSold: action.payload.unitsSold,
      yLow: action.payload.yLow,
      yHigh: action.payload.yHigh,
      yOpen: action.payload.yOpen,
      yClose: action.payload.yClose,
    });
    if (state.chart1.length > 25) state.chart1.shift();
  });
  builder.addCase(toggleSocket, (state, action) => {
    state.isActive = !state.isActive;
  });
});

export { socketReducer };
