import { authReducer } from "./authReducer";
import { inventoryReducer } from "./inventoryReducer";
import { socketReducer } from "./socketReducer";
import { combineReducers } from "redux";
import { chartReducer } from "./chartReducer";
const r = {
  authReducer: authReducer,
  socketReducer: socketReducer,
  inventoryReducer: inventoryReducer,
  chartReducer: chartReducer,
};

const combinedReducers = combineReducers(r);

export default combinedReducers;
