import { createAction } from "@reduxjs/toolkit";

const toggleSocket = createAction("toggleSocket");
const createNew = createAction("createNew");
const addChart = createAction("addChart");
const addToInventory = createAction("addToInventory");
const addSocketData = createAction("addSocketData");
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
