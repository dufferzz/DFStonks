import { createReducer } from "@reduxjs/toolkit";
import { addSocketData, toggleSocket, addChart } from "../actions";

// Sweet mother of no destructuring.. I will change the server to spit out better data later :)

const socketReducer = createReducer([], (builder) => {
  builder.addCase(addChart, (state, action) => {
    const newItem = {
      stockName: action.payload.title,
      isActive: true,
      dataLimit: 25,
      display: "candlestick",
      data: [],
    };
    state.push(newItem);
  });

  builder.addCase(addSocketData, (state, action) => {
    const sock = state[action.payload.index];

    if (state[action.payload.index]) {
      sock.data.push({
        x: action.payload.data.time,
        y: action.payload.data.currentPrice,
        stockName: action.payload.data.stock,
        unitsPurchased: action.payload.data.unitsPurchased,
        unitsSold: action.payload.data.unitsSold,
        yLow: action.payload.data.yLow,
        yHigh: action.payload.data.yHigh,
        yOpen: action.payload.data.yOpen,
        yClose: action.payload.data.yClose,
      });
      if (sock.data.length > sock.dataLimit) sock.data.shift();
    } else {
      state.push({
        stockName: action.payload.data.stock,
        isActive: true,
        dataLimit: 25,
        display: "candlestick",
        data: [
          {
            x: action.payload.data.time,
            y: action.payload.data.currentPrice,
            stockName: action.payload.data.stock,
            unitsPurchased: action.payload.data.unitsPurchased,
            unitsSold: action.payload.data.unitsSold,
            yLow: action.payload.data.yLow,
            yHigh: action.payload.data.yHigh,
            yOpen: action.payload.data.yOpen,
            yClose: action.payload.data.yClose,
          },
        ],
      });
    }
  });

  builder.addCase(toggleSocket, (state, action) => {
    state.isActive = !state.isActive;
  });
});

export { socketReducer };
