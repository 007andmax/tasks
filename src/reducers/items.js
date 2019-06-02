
 import {ADD_TASK } from "../constants/add-task";


const initialState = {};
const itemsReducer = function(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return { action: ADD_TASK, task: action.task };
    default:
      return null;
  }
  return state;
};
export default itemsReducer;