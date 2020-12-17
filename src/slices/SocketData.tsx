import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
const initialState: any = [];

const socketSlice = createSlice({
  name: "SocketData",
  initialState: initialState,
  reducers: {
    createSocket(state: any, action: any) {
      console.log("create socket called");
      const { title, index } = action.payload;
      state.push({
        stockName: title,
        index: index,
        isActive: true,
        dataLimit: 25,
        display: "candlestick",
        series: [{ data: [] }],
      });
    },

    toggleSocket(state: any, action: any) {
      const index = action.payload;
      console.log(action.payload);
      state[index].isActive = !state[index].isActive;
    },

    addSocketData(state: any, action: any) {
      let { index, time, data } = action.payload;
      time = dayjs(time).format();
      const indexedState = state[index];
      const { yOpen, yLow, yHigh, yClose } = data;

      if (indexedState.series.data !== "undefined") {
        indexedState.series[0].data.push({
          x: time,
          y: [yOpen, yLow, yHigh, yClose],
        });
        if (indexedState.series[0].data.length > 25)
          indexedState.series[0].data.shift();
      } else {
        indexedState.push({
          series: [{ data: [] }],
        });
      }
    },
  },
});

export const {
  createSocket,
  addSocketData,
  toggleSocket,
} = socketSlice.actions;

export default socketSlice.reducer;
