import {combineReducers} from "redux";
import {reducer as userReducer} from "./userReducer";

export const reducer = combineReducers({user: userReducer});
