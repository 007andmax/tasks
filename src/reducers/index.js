import { combineReducers } from "redux";
import itemsReducer from "./items";
import { routerReducer } from "react-router-redux";
var reducers = combineReducers({
    itemsState: itemsReducer,
    routing: routerReducer,
});

export default reducers;