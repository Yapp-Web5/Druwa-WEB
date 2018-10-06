import { combineReducers } from "redux";
import createroom from "./createroom";
import GenerateRoom from "./GenerateRoom";

const reducers = combineReducers({
  createroom,
  GenerateRoom,
});

export default reducers;
