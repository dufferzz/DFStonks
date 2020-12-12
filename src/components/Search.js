import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Search({
  sendForm,
  setSearchValue,
  setLimit,
  searchValue,
  resetForm,
  limit,
}) {
  const classes = useStyles();

  return (
    <div className="searchBox">
      <form onSubmit={sendForm}>
        <TextField
          required
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          id="outlined-basic"
          label="Search Query"
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="limit-label">Limit:</InputLabel>
          <Select
            labelId="limit-label"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            label="Limit"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>25</MenuItem>
            <MenuItem value={30}>50</MenuItem>
            <MenuItem value={75}>75</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit" size="large">
          Search
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          size="large"
          onClick={() => {
            resetForm();
          }}
        >
          Reset
        </Button>
      </form>
    </div>
  );
}
