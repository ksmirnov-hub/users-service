import { combineReducers } from "redux";
import persons from "./persons";
import auth from "./auth";
import login from "./login";
import registration from "./registration";

const rootReducer = combineReducers({
	persons,
	auth,
	login,
	registration,
});

export default rootReducer;