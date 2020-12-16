import { createReducer } from "@reduxjs/toolkit";
import { addSocketData, toggleSocket, addChart } from "../actions";
import moment from "moment";
// Sweet mother of no destructuring.. I will change the server to spit out better data later :)
const initialState: any[] = [];

const socketReducer = createReducer(initialState, (builder) => {
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
    const { index, time, data } = action.payload;
    const sock = state[index];
    const { yOpen, yLow, yHigh, yClose } = data;

    if (sock.data.length === 0) {
      sock.data = [
        {
          data: [
            {
              x: moment(time).format(),
              y: [yOpen, yLow, yHigh, yClose],
            },
          ],
        },
      ];
    } else {
      //ITS BROKEN JIM but it does actually present proper data.. Fix later + proper types
      sock.data[index].data.push({
        x: moment(time).format(),
        y: [yOpen, yLow, yHigh, yClose],
      });

      if (sock.data[index].data.length > 25) {
        sock.data[index].data.shift();
      }
    }
  });

  builder.addCase(toggleSocket, (state, action) => {
    const sock = state[action.payload];

    sock.isActive = !sock.isActive;
  });
});

export { socketReducer };
