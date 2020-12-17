import React, { useState, useContext } from "react";
import Card from "./styledComponents/Card";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { createSocket } from "../slices/SocketData";
// import { addChart } from "../actions";
import SocketContext from "../socket";
const mapDispatch = { createSocket };

const AddSocket = () => {
  const [newChartName, setNewChartName] = useState("");
  const [newChartInterval, setNewChartInterval] = useState(1000);

  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  const AdddNewChart = async (): Promise<void> => {
    socket.emit();
    // dispatch(
    createSocket({
      title: newChartName,
      isActive: true,
    });
    // );
    const newSocket = {
      socketName: newChartName,
      interval: newChartInterval,
    };
    await axios
      .post("https://socket.dufferz.net/create", newSocket)
      .then((res) => {
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
          setNewChartInterval(parseInt(e.target.value));
        }}
        type="number"
      ></input>

      {newChartName !== "" ? (
        <Button
          style={{ margin: 0.5 + "rem", padding: 0.9 + "rem" }}
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => {
            AdddNewChart();
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
            AdddNewChart();
          }}
        >
          Create Socket
        </Button>
      )}
    </Card>
  );
};

export default connect(null, mapDispatch)(AddSocket);
