import React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChart } from "../actions";
const AddGraph = () => {
  const dispatch = useDispatch();
  const [selectedSocket, setSelectedSocket] = useState("SocketRandom");
  const socketData = useSelector((state) => state.socketReducer);

  return (
    <>
      <select
        value={selectedSocket}
        onChange={(e) => {
          setSelectedSocket(e.target.value);
        }}
      >
        <option value="SocketRandom">SocketRandom</option>
        <option value="SocketRandom2">SocketRandom2</option>
      </select>
      <button
        onClick={() => {
          const titem = {
            title: selectedSocket,
            isActive: true,
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
