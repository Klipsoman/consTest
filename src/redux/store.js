import { combineReducers, createStore } from "redux";
import { mainReducer } from "./mainReducer";

const rootReducer = combineReducers({
  main: mainReducer,
});

export const store = createStore(rootReducer);
