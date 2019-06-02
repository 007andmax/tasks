import { combineReducers } from "redux";
import itemsReducer from "./items";
import adminReducer from "./admin";
import { routerReducer } from "react-router-redux";
var reducers = combineReducers({
    itemsState: itemsReducer,
    adminState: adminReducer,
    routing: routerReducer,
});

export default reducers;