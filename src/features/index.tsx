// import { authReducer } from "./authReducer";
import authSlice from "./authData";
import socketSlice from "./SocketData";
import inventorySlice from "./InventoryData";
import { combineReducers } from "redux";
const r = {
  authSlice: authSlice,
  socketSlice: socketSlice,
  inventorySlice: inventorySlice,
};

const combinedReducers = combineReducers(r);

export default combinedReducers;
export type RootState = ReturnType<typeof combinedReducers>;
