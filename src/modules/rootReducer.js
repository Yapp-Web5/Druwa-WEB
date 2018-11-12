import { combineReducers } from "redux";
import createroom from "./createroom";
import GenerateRoom from "./GenerateRoom";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  roomReducer,
  userReducer,
  createroom,
  GenerateRoom,
});

export default reducers;
