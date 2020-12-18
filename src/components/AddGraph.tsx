import React, { useEffect } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { createSocket } from "../slices/SocketData";
import axios, { AxiosResponse } from "axios";
const mapDispatch = { createSocket };

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
  const [httpError, setHttpError] = useState(false);

  const getSockets = async () => {
    try {
      await axios
        .get(`https://socket.dufferz.net`)
        .then((res: AxiosResponse) => {
          setAvailSockets(res.data);
          setHttpError(false);
        });
    } catch (error) {
      setHttpError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getSockets();
  }, []);

  return (
    <>
      {httpError && (
        <h5>
          Unable to get sockets!
          <Button
            style={{ margin: 0.5 + "rem", padding: 0.9 + "rem" }}
            variant="outlined"
            color="primary"
            onClick={() => {
              getSockets();
            }}
          >
            Retry..
          </Button>
        </h5>
      )}
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
              createSocket({
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
              createSocket({
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

export default connect(null, mapDispatch)(AddGraph);
