import { createReducer } from "@reduxjs/toolkit";
import { addChart } from "../actions";

const initialState = [];

const chartReducer = createReducer(initialState, (builder) => {
  builder.addCase(addChart, (state, action) => {
    const newItem = {
      title: action.payload.title,
      isActive: true,
      data: action.payload.data,
    };
    state.push(newItem);
  });
});

export { chartReducer };
