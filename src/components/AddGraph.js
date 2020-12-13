import React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChart } from "../actions";
const AddGraph = () => {
  const dispatch = useDispatch();
  const [selectedSocket, setSelectedSocket] = useState("chart1");
  const socketData = useSelector((state) => state.socketReducer);

  return (
    <>
      <select
        value={selectedSocket}
        onChange={(e) => {
          setSelectedSocket(e.target.value);
        }}
      >
        <option value="chart1">SocketRandom</option>
        <option value="chart2">SocketRandom2</option>
      </select>
      <button
        onClick={() => {
          const titem = {
            title: selectedSocket,
            isActive: true,
            data: socketData[selectedSocket].data,
          };
          dispatch(addChart(titem));
        }}
      >
        Add Chart
      </button>
    </>
  );
};

export default AddGraph;
