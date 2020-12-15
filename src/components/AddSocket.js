import React, { useState, useContext } from "react";
import Card from "../components/styledComponents/Card";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addChart } from "../actions";
import SocketContext from "../socket";
const AddSocket = () => {
  const [newChartName, setNewChartName] = useState("");
  const [newChartInterval, setNewChartInterval] = useState(1000);

  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  const AdddNewChart = async () => {
    socket.emit();
    dispatch(
      addChart({
        title: newChartName,
        isActive: true,
      })
    );
    const newSocket = {
      socketName: newChartName,
      interval: newChartInterval,
    };
    await axios.post("http://localhost:4001/create", newSocket).then((res) => {
      console.log(res);
      socket.emit("createSocket");
    });
  };

  return (
    <Card
      style={{
        width: "fit-content",
        margin: "auto",
        marginBottom: 1 + "rem",
        padding: 0.5 + "rem",
      }}
    >
      <input
        value={newChartName}
        placeholder="New Socket Name"
        required={true}
        onChange={(e) => {
          setNewChartName(e.target.value);
        }}
        type="text"
      ></input>
      <input
        value={newChartInterval}
        placeholder="Broadcast Interval"
        onChange={(e) => {
          setNewChartInterval(e.target.value);
        }}
        type="number"
      ></input>

      {(newChartName !== "" || newChartInterval) !== "" ? (
        <Button
          style={{ margin: 0.5 + "rem", padding: 0.9 + "rem" }}
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => {
            AdddNewChart(newChartName, newChartInterval);
          }}
        >
          Create Socket
        </Button>
      ) : (
        <Button
          disabled
          style={{ margin: 0.5 + "rem", padding: 0.9 + "rem" }}
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => {
            AdddNewChart(newChartName, newChartInterval);
          }}
        >
          Create Socket
        </Button>
      )}
    </Card>
  );
};

export default AddSocket;
