import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addChart } from "../actions";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "white",
  },
  label: {
    color: "#3e5197",
  },
}));

const AddGraph = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedSocket, setSelectedSocket] = useState("SocketRandom");

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.label} id="selSocketLabel">
          Socket
        </InputLabel>
        <Select
          className={classes.label}
          labelId="selSocketLabel"
          id="selSocketSelect"
          value={selectedSocket}
          onChange={(e) => {
            setSelectedSocket(e.target.value);
          }}
          label="Socket"
        >
          <MenuItem className={classes.label} value={"SocketRandom"}>
            DFZ Inc
          </MenuItem>
          <MenuItem className={classes.label} value={"SocketRandom2"}>
            Bitcoin Corp
          </MenuItem>
        </Select>
      </FormControl>

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
    </>
  );
};

export default AddGraph;
