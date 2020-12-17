import { createReducer } from "@reduxjs/toolkit";
import { addSocketData, toggleSocket, addChart } from "../actions";
import dayjs from "dayjs";
// Sweet mother of no destructuring.. I will change the server to spit out better data later :)
const initialState: any[] = [];

const socketReducer = createReducer(initialState, (builder) => {
  builder.addCase(addChart, (state, action) => {
    const newItem = {
      stockName: action.payload.title,
      isActive: true,
      dataLimit: 25,
      display: "candlestick",
      data: [
        {
          data: [
            {
              x: new Date().getTime(),
              y: [0, 0, 0, 0],
            },
          ],
        },
      ],
    };
    state.push(newItem);
  });

  builder.addCase(addSocketData, (state, action) => {
    let { index, time, data } = action.payload;
    time = dayjs(time).format();

    const curState = state[index];
    const { yOpen, yLow, yHigh, yClose } = data;

    if (curState.data.length === 0) {
      console.log("curState.data len 0");
      curState.data = [
        {
          data: [
            {
              x: time,
              y: [yOpen, yLow, yHigh, yClose],
            },
          ],
        },
      ];
    } else {
      if (typeof curState.data[index] !== "undefined") {
        console.log("ok reached if");
        //ITS BROKEN JIM but it does actually present proper data on first graph.. Fix later + proper types
        // memory leaks AF
        // incorrect data on graph index > 0
        curState.data[index].data.push({
          x: time,
          y: [yOpen, yLow, yHigh, yClose],
        });

        if (curState.data[index].data.length > 25) {
          curState.data[index].data.shift();
        }
      } else {
        console.log("other else");
        console.log(curState.data);
        curState.data[index].data.push({
          data: [
            {
              x: time,
              y: [yOpen, yLow, yHigh, yClose],
            },
          ],
        });
      }
    }
  });

  builder.addCase(toggleSocket, (state, action) => {
    const sock = state[action.payload];

    sock.isActive = !sock.isActive;
  });
});

export { socketReducer };
