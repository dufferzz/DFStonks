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
        dataLimit: 150,
        display: "candlestick",
        series: [{ data: [] }],
      });
    },

    toggleSocket(state: any, action: any) {
      const index = action.payload;
      //   console.log(action.payload);
      state[index].isActive = !state[index].isActive;
    },

    addSocketData(state: any, action: any) {
      let { index, data } = action.payload;
      // let time = dayjs(data.time).format();
      const indexedState = state[index];
      const { yOpen, yLow, yHigh, yClose } = data;

      indexedState.series[0].data.push({
        time: data.time,
        open: yOpen,
        high: yHigh,
        low: yLow,
        close: yClose,
      });

      if (indexedState.series[0].data.length > indexedState.dataLimit)
        indexedState.series[0].data.shift();
    },
  },
});

export const {
  createSocket,
  addSocketData,
  toggleSocket,
} = socketSlice.actions;

export default socketSlice.reducer;
