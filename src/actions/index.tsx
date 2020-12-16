import { createAction } from "@reduxjs/toolkit";

const toggleSocket = createAction<any>("toggleSocket");
const createNew = createAction("createNew");
const addChart = createAction<any>("addChart");
const addToInventory = createAction<any>("addToInventory");
const addSocketData = createAction<any>("addSocketData");
const doLogin = createAction("doLogin");
const doLogout = createAction("doLogout");

export {
  doLogin,
  doLogout,
  addSocketData,
  addToInventory,
  toggleSocket,
  addChart,
  createNew,
};
