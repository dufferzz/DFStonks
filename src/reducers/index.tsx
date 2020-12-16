import { authReducer } from "./authReducer";
import { inventoryReducer } from "./inventoryReducer";
import { socketReducer } from "./socketReducer";
import { combineReducers } from "redux";
const r = {
  authReducer: authReducer,
  socketReducer: socketReducer,
  inventoryReducer: inventoryReducer,
};

const combinedReducers = combineReducers(r);

export default combinedReducers;
export type RootState = ReturnType<typeof combinedReducers>;
