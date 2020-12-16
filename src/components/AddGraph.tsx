import React, { useEffect } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addChart } from "../actions";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import axios, { AxiosResponse } from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    color: "white",
  },
  label: {
    color: "#3e5197",
  },
}));

const AddGraph = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedSocket, setSelectedSocket] = useState("none");
  const [availSockets, setAvailSockets] = useState([]);

  const getSockets = async () => {
    axios.get(`http://192.168.1.47:4001`).then((res: AxiosResponse) => {
      setAvailSockets(res.data);
    });
  };

  useEffect(() => {
    getSockets();
  }, []);

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.label} id="selSocketLabel">
          Available Sockets
        </InputLabel>
        <Select
          className={classes.label}
          labelId="selSocketLabel"
          id="selSocketSelect"
          value={selectedSocket}
          onChange={(e: any) => {
            setSelectedSocket(e.target.value);
          }}
          label="Socket"
        >
          <MenuItem className={classes.label} value="none">
            Not Selected
          </MenuItem>

          {availSockets.length === 0 && (
            <MenuItem className={classes.label} value="none">
              None Available
            </MenuItem>
          )}

          {availSockets.length > 0 &&
            availSockets.map((socket: any, key: number) => (
              <MenuItem
                key={key}
                className={classes.label}
                value={socket.socketName}
                title={`${socket.interval} ms`}
              >
                {socket.socketName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {selectedSocket === "none" ? (
        <Button
          disabled
          style={{ margin: 0.5 + "rem", padding: 0.9 + "rem" }}
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => {
            dispatch(
              addChart({
                title: selectedSocket,
                isActive: true,
              })
            );
          }}
        >
          Add Chart
        </Button>
      ) : (
        <Button
          style={{ margin: 0.5 + "rem", padding: 0.9 + "rem" }}
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => {
            dispatch(
              addChart({
                title: selectedSocket,
                isActive: true,
              })
            );
          }}
        >
          Add Chart
        </Button>
      )}
    </>
  );
};

export default AddGraph;
